require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const helmet = require('helmet');
const http = require('http');
const compression = require('compression');
const { Server } = require("socket.io");
const { GoogleGenerativeAI } = require("@google/generative-ai");
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
        console.error("Proxy Error Details:", error.response ? error.response.status : error.message);
        res.status(500).send("Error loading PDF. Google Drive blocked the request or ID is wrong.");
    }
});

// --- CHAT AI ---
app.post("/api/chat", async (req, res) => {
    try {
        if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: "API Key Missing" });
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(req.body.text);
        
        // Format match for frontend
        res.json({ candidates: [{ content: { parts: [{ text: result.response.text() }] } }] });
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
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS 
            }
        });

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