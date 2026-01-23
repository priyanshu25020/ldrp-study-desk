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
const axios = require('axios'); // Drive Proxy ke liye

const app = express();
const PORT = process.env.PORT || 3000;

// --- SERVER SETUP ---
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

const { subjects, textbooks, notes, pyqs, imp_topics, practicals, assignments } = require('./data');

// --- STATS LOGIC ---
let currentStats = { totalVisits: 1500, visitsToday: 120, onlineUsers: 0 }; // Starting dummy data

io.on("connection", (socket) => {
    currentStats.onlineUsers++;
    currentStats.totalVisits++;
    currentStats.visitsToday++;
    
    // Sabko update bhejo
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
app.use(express.static(__dirname)); // Public folder serve karne ke liye

// --- API ENDPOINTS ---
app.get('/api/subjects', (req, res) => res.json(subjects));
app.get('/api/notes', (req, res) => res.json(notes));
app.get('/api/textbooks', (req, res) => res.json(textbooks));
app.get('/api/pyqs', (req, res) => res.json(pyqs));

// 👇 YE NAYE 3 LINES YAHAN ADD KARO 👇
app.get('/api/imp_topics', (req, res) => res.json(imp_topics));
app.get('/api/practicals', (req, res) => res.json(practicals));
app.get('/api/assignments', (req, res) => res.json(assignments));
// 👆 KAAM KHATAM 👆

// --- 🚀 GOOGLE DRIVE PROXY (Ye PDF Viewer ke liye hai) ---
app.get('/api/proxy-pdf', async (req, res) => {
    try {
        const fileId = req.query.id;
        if (!fileId) return res.status(400).send("File ID required");

        const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

        // 1. Head request size janne ke liye
        const headResponse = await axios.head(driveUrl);
        const fileSize = headResponse.headers['content-length'];

        // 2. Headers set karo
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Length', fileSize);
        res.setHeader('Cache-Control', 'public, max-age=86400'); // Browser cache karega

        // 3. Stream karo (Fastest Method)
        const response = await axios({
            method: 'GET',
            url: driveUrl,
            responseType: 'stream'
        });

        response.data.pipe(res);

    } catch (error) {
        console.error("PDF Proxy Error:", error.message);
        res.status(500).send("Error loading PDF");
    }
});

// --- CHAT ENDPOINT (Gemini AI) ---
app.post("/api/chat", async (req, res) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: "API Key Missing" });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const { text } = req.body;
        const result = await model.generateContent(text);
        const reply = result.response.text();
        res.json({ candidates: [{ content: { parts: [{ text: reply }] } }] }); // Format match kiya frontend se
    } catch (err) {
        console.error("Gemini Error:", err);
        res.status(500).json({ error: "Gemini AI failed." });
    }
});

// --- EMAIL ENDPOINT ---
app.post('/api/contact', (req, res) => {
    const { name, email, inquiryType, message } = req.body;
    
    // Fast Response to User
    res.status(200).json({ success: true, message: "Request Received!" });

    // Background Email Process
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

// Serve Frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});

server.listen(PORT, () => {
    console.log(`⚡ Server running on port ${PORT}`);
});