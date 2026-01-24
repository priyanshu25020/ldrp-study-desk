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
app.use(express.json({ limit: '10mb' })); // Increase limit for image uploads

// 🚨 SECURITY FIX: Only serve files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// --- API ENDPOINTS ---
app.get('/api/subjects', (req, res) => res.json(subjects));
app.get('/api/notes', (req, res) => res.json(notes));
app.get('/api/textbooks', (req, res) => res.json(textbooks));
app.get('/api/pyqs', (req, res) => res.json(pyqs));
app.get('/api/imp_topics', (req, res) => res.json(imp_topics));
app.get('/api/practicals', (req, res) => res.json(practicals));
app.get('/api/assignments', (req, res) => res.json(assignments));

// --- GOOGLE DRIVE PROXY (Superfast Caching) ---
app.get('/api/proxy-pdf', async (req, res) => {
    try {
        const fileId = req.query.id;
        if (!fileId || fileId.includes('PASTE')) {
            return res.status(404).send("File ID not configured.");
        }

        const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        
        // Headers to mimic a browser request
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        };

        const response = await axios({
            method: 'GET',
            url: driveUrl,
            responseType: 'stream',
            headers: headers
        });

        // Content headers
        res.setHeader('Content-Type', 'application/pdf');
        
        // 🚀 SPEED FIX: Cache for 1 year (immutable)
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        
        response.data.pipe(res);

    } catch (error) {
        console.error("Proxy Error Details:", error.message);
        res.status(500).send("Error loading PDF via Proxy.");
    }
});

// --- CHAT AI (Language Logic) ---
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/chat", async (req, res) => {
    try {
        const { text, image } = req.body;

        let userContent = [];
        if (text) userContent.push({ type: "text", text: text });
        if (image) userContent.push({ 
            type: "image_url", 
            image_url: { url: image } 
        });

        // Use vision model if image exists, otherwise versatile model
        const modelName = image ? "llama-3.2-11b-vision-preview" : "llama-3.3-70b-versatile";

        // 🚨 STRICT LANGUAGE INSTRUCTION
        const systemPrompt = `You are a helpful study assistant. 
        STRICT RULES:
        1. If user asks in ENGLISH -> Respond ONLY in ENGLISH.
        2. If user asks in HINDI -> Respond ONLY in HINDI.
        3. If user asks in GUJARATI -> Respond ONLY in GUJARATI.
        4. Keep answers concise and helpful.`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userContent },
            ],
            model: modelName,
            temperature: 0.3, // Lower temperature for more deterministic/obedient responses
            max_tokens: 1024,
        });

        const botReply = completion.choices[0].message.content;
        res.json({ reply: botReply });

    } catch (err) {
        console.error("AI Error:", err.message);
        res.status(500).json({ reply: "Sorry, server is busy." });
    }
});

// --- EMAIL (Fix using Gmail Service) ---
// --- EMAIL FIX (Use SSL & Port 465) ---
// --- EMAIL LOGIC (Brevo/Sendinblue SMTP) ---
app.post('/api/contact', (req, res) => {
    const { name, email, inquiryType, message } = req.body;
    
    // Frontend को तुरंत बता दो कि रिक्वेस्ट मिल गई
    res.status(200).json({ success: true, message: "Request Received!" });

    if(process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        
        // 🔥 BREVO SMTP CONFIGURATION
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",  // Brevo का सर्वर
            port: 587,                     // Brevo पोर्ट 587 यूज करता है
            secure: false,                 // 587 के लिए secure: false रखें
            auth: { 
                user: process.env.EMAIL_USER, // Render Env से Brevo Login Email
                pass: process.env.EMAIL_PASS  // Render Env से SMTP Key
            }
        });

        const mailOptions = {
            from: `"LDRP Desk Bot" <${process.env.EMAIL_USER}>`, // यह वही ईमेल होना चाहिए जो Brevo में Verified है
            to: "priyanshubharadava27@gmail.com", // यहाँ अपना पर्सनल ईमेल लिखो जहाँ मेल चाहिए
            replyTo: email, // यूजर का ईमेल (ताकि तुम रिप्लाई कर सको)
            subject: `🔔 New Inquiry: ${inquiryType}`,
            text: `Name: ${name}\nUser Email: ${email}\n\nMessage:\n${message}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("❌ Email Failed:", error);
            } else {
                console.log("✅ Email Sent via Brevo:", info.messageId);
            }
        });
    } else {
        console.log("⚠️ Email Credentials Missing");
    }
});