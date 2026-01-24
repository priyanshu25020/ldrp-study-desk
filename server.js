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

// Import Data
const { subjects, textbooks, notes, pyqs, imp_topics, practicals, assignments } = require('./data');

// --- STATS LOGIC ---
let currentStats = { totalVisits: 1500, visitsToday: 120, onlineUsers: 0 };

io.on("connection", (socket) => {
    currentStats.onlineUsers++;
    currentStats.totalVisits++;
    currentStats.visitsToday++;
    
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
app.use(express.json({ limit: '10mb' })); 

// 🚨 SECURITY FIX: Files ab 'public' folder se serve hongi (Backend code hide ho jayega)
app.use(express.static(path.join(__dirname, 'public')));

// --- API ENDPOINTS ---
app.get('/api/subjects', (req, res) => res.json(subjects));
app.get('/api/notes', (req, res) => res.json(notes));
app.get('/api/textbooks', (req, res) => res.json(textbooks));
app.get('/api/pyqs', (req, res) => res.json(pyqs));
app.get('/api/imp_topics', (req, res) => res.json(imp_topics));
app.get('/api/practicals', (req, res) => res.json(practicals));
app.get('/api/assignments', (req, res) => res.json(assignments));

// --- GOOGLE DRIVE PROXY ---
app.get('/api/proxy-pdf', async (req, res) => {
    try {
        const fileId = req.query.id;
        if (!fileId || fileId.includes('PASTE')) return res.status(404).send("File ID not configured.");

        const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        
        const response = await axios({
            method: 'GET',
            url: driveUrl,
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
            }
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        response.data.pipe(res);
    } catch (error) {
        console.error("Proxy Error:", error.message);
        res.status(500).send("Error loading PDF.");
    }
});

// --- CHAT AI ---
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/chat", async (req, res) => {
    try {
        const { text, image } = req.body;
        let userContent = [];
        if (text) userContent.push({ type: "text", text: text });
        if (image) userContent.push({ type: "image_url", image_url: { url: image } });

        const modelName = image ? "llama-3.2-11b-vision-preview" : "llama-3.3-70b-versatile";

        // 🔥 STRICT LANGUAGE INSTRUCTION
        const systemPrompt = `You are a helpful study assistant. 
        STRICT RULES:
        1. If user asks in ENGLISH -> Respond ONLY in ENGLISH.
        2. If user asks in HINDI -> Respond ONLY in HINDI.
        3. If user asks in GUJARATI -> Respond ONLY in GUJARATI.
        4. Keep answers concise.`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userContent },
            ],
            model: modelName,
            temperature: 0.3,
            max_tokens: 1024,
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (err) {
        console.error("AI Error:", err.message);
        res.status(500).json({ reply: "Sorry, server is busy." });
    }
});

// --- EMAIL FIX (SSL/Port 465) ---
app.post('/api/contact', (req, res) => {
    const { name, email, inquiryType, message } = req.body;
    
    // Frontend ko turant success bhejo
    res.status(200).json({ success: true, message: "Request Received!" });

    if(process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',  // 🔥 Force Gmail Host
            port: 465,               // 🔥 Force SSL Port (Blocks bypass karta hai)
            secure: true,            // 🔥 SSL True
            auth: { 
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS 
            }
        });

        const mailOptions = {
            from: `"LDRP Desk Bot" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email, 
            subject: `🔔 New Inquiry: ${inquiryType}`,
            text: `Name: ${name}\nUser Email: ${email}\n\nMessage:\n${message}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("❌ Email Failed:", error);
            } else {
                console.log("✅ Email Sent Successfully");
            }
        });
    } else {
        console.log("⚠️ Email Credentials Missing");
    }
});

// Serve HTML (Fix for ENOENT error)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

server.listen(PORT, () => {
    console.log(`⚡ Server running on port ${PORT}`);
});