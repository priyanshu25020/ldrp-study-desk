require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const helmet = require('helmet');
const http = require('http');
const compression = require('compression');
const { Server } = require("socket.io");
const Groq = require("groq-sdk");
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// --- SERVER SETUP ---
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

// Import ALL Data
const { subjects, textbooks, notes, pyqs, imp_topics, practicals, assignments } = require('./data');

// --- STATS LOGIC (Fixed for Frontend) ---
let currentStats = { 
    totalVisits: 1500, 
    visitsToday: 120, 
    onlineUsers: 0 
};

io.on("connection", (socket) => {
    currentStats.onlineUsers++;
    currentStats.totalVisits++;
    currentStats.visitsToday++;
    
    // FIX: Emit 'online' key instead of 'onlineUsers' to match frontend
    io.emit("updateStats", { 
        online: currentStats.onlineUsers, 
        visitsToday: currentStats.visitsToday, 
        totalVisits: currentStats.totalVisits 
    });

    socket.on("disconnect", () => {
        currentStats.onlineUsers--;
        if (currentStats.onlineUsers < 0) currentStats.onlineUsers = 0;
        
        io.emit("updateStats", { 
            online: currentStats.onlineUsers, 
            visitsToday: currentStats.visitsToday, 
            totalVisits: currentStats.totalVisits 
        });
    });
});

// --- MIDDLEWARES ---
app.use(compression());
app.use(helmet({ 
    contentSecurityPolicy: false, 
    crossOriginEmbedderPolicy: false 
}));
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); 

// --- API ENDPOINTS (Serving All Data) ---
app.get('/api/subjects', (req, res) => res.json(subjects));
app.get('/api/notes', (req, res) => res.json(notes));
app.get('/api/textbooks', (req, res) => res.json(textbooks));
app.get('/api/pyqs', (req, res) => res.json(pyqs));
app.get('/api/imp_topics', (req, res) => res.json(imp_topics));
app.get('/api/practicals', (req, res) => res.json(practicals));
app.get('/api/assignments', (req, res) => res.json(assignments));

// --- GOOGLE DRIVE PROXY (Fixed for PDF Viewer) ---
// --- GOOGLE DRIVE PROXY (Fixed with Headers) ---
app.get('/api/proxy-pdf', async (req, res) => {
    try {
        const fileId = req.query.id;
        if (!fileId || fileId.includes('PASTE')) {
            return res.status(404).send("File ID not configured.");
        }

        const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        
        // Google Drive ko fool banane ke liye Headers (Bahut Zaroori Hai)
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        };

        // 1. Stream Request directly (Head request hata diya kyunki wo fail ho raha tha)
        const response = await axios({
            method: 'GET',
            url: driveUrl,
            responseType: 'stream',
            headers: headers // <-- Headers add kiye taaki Google block na kare
        });

        // Content Type set karo
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        
        // Data bhejo
        response.data.pipe(res);

} catch (error) {
        // change this line for find real error
        console.error("Proxy Error Details:", error.message);
        if (error.response) {
            console.error("Google Drive Status:", error.response.status);
            console.error("Google Drive Data:", error.response.data);
        }
        res.status(500).send("Error loading PDF via Proxy.");
    }
});

// --- CHAT AI ---
// --- CHAT AI (Groq Llama 3) ---
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/chat", async (req, res) => {
    try {
        if (!process.env.GROQ_API_KEY) return res.status(500).json({ error: "API Key Missing" });

        const userMessage = req.body.text;

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful and intelligent study assistant for engineering students at LDRP college. Keep answers concise and helpful."
                },
                {
                    role: "user",
                    content: userMessage,
                },
            ],
            model: "llama3-8b-8192", // Free and Fast model
        });

        const botReply = completion.choices[0].message.content;

        // Frontend ke liye simple format bhej rahe hain
        res.json({ reply: botReply });

    } catch (err) {
        console.error("AI Error:", err);
        res.status(500).json({ error: "AI Error" });
    }
});

// --- EMAIL ---
app.post('/api/contact', (req, res) => {
    const { name, email, inquiryType, message } = req.body;
    
    // Fast Response
    res.status(200).json({ success: true, message: "Request Received!" });

    // Background Email Logic
    if(process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { 
            user: process.env.EMAIL_USER, // Render se aayega
            pass: process.env.EMAIL_PASS  // Render se aayega (App Password)
        }
    });
// ...


        const mailOptions = {
            from: `"LDRP Desk" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `LDRP Desk Inquiry: ${inquiryType}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log("Email Error:", error);
            else console.log("Email Sent:", info.response);
        });
    }
});

// Serve HTML for any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});

server.listen(PORT, () => {
    console.log(`⚡ Server running on port ${PORT}`);
});

console.log("Server Updated V100 - Force Fix");
// Update for live data fix
// SERVER FORCE RESTART V10