require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const http = require('http');
const compression = require('compression');
const { Server } = require("socket.io");
const Groq = require("groq-sdk");
const axios = require('axios'); // Email API ke liye zaroori
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// --- DEBUGGING: Check Folders on Server ---
// Ye check karega ki public folder server par pahuncha ya nahi
const publicPath = path.join(__dirname, 'public');
if (fs.existsSync(publicPath)) {
    console.log("✅ Public folder FOUND at:", publicPath);
} else {
    console.error("❌ ERROR: Public folder NOT FOUND! Make sure files are inside 'public' folder.");
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

// 🔥 FIX 1: Upload Limit Increased to 50MB (Badi images ke liye)
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve Static Files
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

// --- CHAT AI (Vision Fix + Language Script Fix) ---
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/chat", async (req, res) => {
    try {
        const { text, image } = req.body;
        let messages = [];

        // Instructions for AI (Language Script Fixed)
        const instructions = `You are a helpful study assistant. 
        STRICT RULES:
        1. If user asks in Hindi, Reply in Hindi Script (Devanagari). Example: 'नमस्ते'. DO NOT use Hinglish.
        2. If user asks in Gujarati, Reply in Gujarati Script. Example: 'નમસ્તે'.
        3. If user asks in English, Reply in English.
        4. Keep answers short and clear.`;

        // 🔥 FIX 2: Vision Model Logic
        // Agar Image hai, to System Prompt ko User Text ke saath mila do.
        // Kyunki Llama Vision models kabhi-kabhi alag System role support nahi karte.
        
        if (image) {
            // Vision Request Structure (System role removed, integrated into user content)
            messages = [
                {
                    role: "user",
                    content: [
                        { type: "text", text: instructions + "\n\nUser Question: " + (text || "Explain this image") },
                        { type: "image_url", image_url: { url: image } }
                    ]
                }
            ];
        } else {
            // Normal Text Request Structure
            messages = [
                { role: "system", content: instructions },
                { role: "user", content: text }
            ];
        }

        const modelName = image ? "llama-3.2-11b-vision-preview" : "llama-3.3-70b-versatile";

        const completion = await groq.chat.completions.create({
            messages: messages,
            model: modelName,
            temperature: 0.3,
            max_tokens: 1024,
        });

        res.json({ reply: completion.choices[0].message.content });

    } catch (err) {
        // Error Log karo taki Render logs me dikhe
        console.error("AI Error Details:", err.response ? err.response.data : err.message);
        res.status(500).json({ reply: "Sorry, I am unable to process this image right now. Try a smaller image." });
    }
});

// --- 🔥 FINAL EMAIL FIX (Brevo API instead of SMTP) ---
// SMTP ports (587/465) are blocked on Render. HTTP (API) is NOT blocked.
app.post('/api/contact', async (req, res) => {
    const { name, email, inquiryType, message } = req.body;
    
    // Frontend ko turant success bhejo
    res.status(200).json({ success: true, message: "Request Received!" });

    if (!process.env.EMAIL_PASS || !process.env.EMAIL_USER) {
        return console.log("⚠️ API Key Missing in Render Environment");
    }

    try {
        // Axios se Brevo API ko call karenge (Ye kabhi block nahi hota)
        const response = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
                sender: { name: "LDRP Desk Bot", email: process.env.EMAIL_USER }, // Login Email (Brevo verified)
                to: [{ email: "priyanshubharadava90231@gmail.com", name: "Priyanshu" }], // Personal Email jahan mail aayega
                replyTo: { email: email, name: name },
                subject: `🔔 New Inquiry: ${inquiryType}`,
                htmlContent: `
                    <h3>New Inquiry Received</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>User Email:</strong> ${email}</p>
                    <p><strong>Type:</strong> ${inquiryType}</p>
                    <br>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                `
            },
            {
                headers: {
                    'accept': 'application/json',
                    'api-key': process.env.EMAIL_PASS, // ⚠️ Yahan Brevo API Key honi chahiye (xkeysib...)
                    'content-type': 'application/json'
                }
            }
        );
        console.log("✅ Email Sent via API! ID:", response.data.messageId);

    } catch (error) {
        console.error("❌ Email API Failed:", error.response ? error.response.data : error.message);
    }
});

// Serve HTML
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`⚡ Server running on port ${PORT}`);
});