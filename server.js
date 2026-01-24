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
const fs = require('fs'); // File system check karne ke liye

const app = express();
const PORT = process.env.PORT || 3000;

// --- DEBUGGING: Check Folders on Server ---
console.log("📂 Current Directory:", __dirname);
const publicPath = path.join(__dirname, 'public');
console.log("📂 Looking for Public folder at:", publicPath);

if (fs.existsSync(publicPath)) {
    console.log("✅ Public folder FOUND!");
    console.log("📄 Files in Public:", fs.readdirSync(publicPath));
} else {
    console.error("❌ CRITICAL ERROR: Public folder NOT FOUND at", publicPath);
    // Fallback: Agar galti se 'src/public' me chala gaya ho (Render issue)
    const altPath = path.join(__dirname, 'src', 'public');
    if(fs.existsSync(altPath)) {
        console.log("⚠️ Found in src/public, fixing path...");
        app.use(express.static(altPath));
    }
}

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

// 🚨 SECURITY FIX: Files serve logic
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
        if (!fileId || fileId.includes('PASTE')) return res.status(404).send("File ID missing.");

        const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        const response = await axios({
            method: 'GET', url: driveUrl, responseType: 'stream',
            headers: { 'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36' }
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
        
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful study assistant. Answer in Hindi, English or Gujarati as asked. Keep it short." },
                { role: "user", content: userContent },
            ],
            model: modelName,
            temperature: 0.5,
            max_tokens: 1024,
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (err) {
        console.error("AI Error:", err.message);
        res.status(500).json({ reply: "Sorry, server is busy." });
    }
});

// --- EMAIL LOGIC (Brevo SSL Fix) ---
app.post('/api/contact', (req, res) => {
    const { name, email, inquiryType, message } = req.body;
    res.status(200).json({ success: true, message: "Request Received!" });

    if(process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        
        // 🔥 BREVO SSL CONFIGURATION (Port 465)
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com", 
            port: 465,                    // 🔥 465 is Safer than 587
            secure: true,                 // 🔥 True for 465
            auth: { 
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS  
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: "priyanshubharadava90231@gmail.com", // Tumhara Email
            replyTo: email, 
            subject: `🔔 New Inquiry: ${inquiryType}`,
            text: `Name: ${name}\nUser Email: ${email}\n\nMessage:\n${message}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.error("❌ Email Failed:", error);
            else console.log("✅ Email Sent via Brevo:", info.messageId);
        });
    } else {
        console.log("⚠️ Email Credentials Missing");
    }
});

// Serve HTML
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(500).send("Server Error: index.html not found on server. Check logs.");
    }
});

server.listen(PORT, () => {
    console.log(`⚡ Server running on port ${PORT}`);
});