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

// ✅ Naya Code (faculty add kiya):
const { subjects, textbooks, notes, pyqs, imp_topics, practicals, assignments, faculty } = require('./data');
// --- STATS LOGIC ---
let currentStats = { totalVisits: 25, visitsToday: 10, onlineUsers: 0 };

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
// --- MIDDLEWARES ---
// 🔥 FIX: Sirf TEXT compress karo, PDF nahi (Speed badhegi)
app.use(compression({
    filter: (req, res) => {
        if (req.path.includes('/api/proxy-pdf')) return false; // PDF skip karo
        return compression.filter(req, res); // Baaki HTML/JS compress karo
    }
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
// ✅ Yeh Line Add Karo:
app.get('/api/faculty', (req, res) => res.json(faculty));
// --- GOOGLE DRIVE PROXY ---
// --- UPDATED GOOGLE DRIVE PROXY (Supports Range Requests & Chunking) ---
app.get('/api/proxy-pdf', async (req, res) => {
    try {
        const fileId = req.query.id;
        const range = req.headers.range; // Browser maang raha hai "Muje bas thoda sa part do"

        if (!fileId || fileId.includes('PASTE')) return res.status(404).send("File ID missing.");

        const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
// 🔥 ADD THIS LINE FOR CACHING (Dubara khulne par instant load hoga) 🔥
        res.setHeader('Cache-Control', 'public, max-age=3600');
        // 1. Agar Browser ne Range mangi hai (Fast Loading ke liye)
        if (range) {
            const response = await axios({
                method: 'GET',
                url: driveUrl,
                responseType: 'stream',
                headers: { 
                    'Range': range, // Google Drive ko bolo hume bas ye tukda chahiye
                    'User-Agent': 'Mozilla/5.0' 
                }
            });

            // Google Drive se headers copy karke Browser ko bhejo
            res.status(206); // 206 means "Partial Content"
            res.setHeader('Content-Range', response.headers['content-range']);
            res.setHeader('Accept-Ranges', 'bytes');
            res.setHeader('Content-Length', response.headers['content-length']);
            res.setHeader('Content-Type', 'application/pdf');
            
            response.data.pipe(res);
        } 
        // 2. Agar Range nahi mangi (Normal Download)
        else {
            const response = await axios({
                method: 'GET',
                url: driveUrl,
                responseType: 'stream',
                headers: { 'User-Agent': 'Mozilla/5.0' }
            });
            res.setHeader('Content-Type', 'application/pdf');
            response.data.pipe(res);
        }

    } catch (error) {
        console.error("Proxy Error:", error.message);
        // Agar range request fail ho jaye, to normal retry karega browser
        res.status(500).send("Error loading PDF.");
    }
});
// --- CHAT AI (Vision Fix + Language Script Fix) ---
// --- CHAT AI (SAFE MODE: No Vision, Only Text) ---
// Note: Groq ne vision models band kar diye hain, isliye hum sirf text model use kar rahe hain.
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/chat", async (req, res) => {
    try {
        const { text, image } = req.body;
        
        // 1. AI Instructions (Script Rules)
        const systemPrompt = `You are a helpful study assistant.
        STRICT RULES:
        1. If user asks in Hindi, Reply in Hindi Script (Devanagari). Example: 'नमस्ते'.
        2. If user asks in Gujarati, Reply in Gujarati Script. Example: 'નમસ્તે'.
        3. If user asks in English, Reply in English.
        4. Keep answers short and clear.`;

        // 2. Model Selection (Sirf ye model abhi chal raha hai)
        const modelName = "llama-3.3-70b-versatile"; 
        
        // 3. User Message Preparation
        let userContent = text;

        // 4. SAFETY CHECK: Agar image aayi hai, to AI ko mat bhejo (Warna crash hoga)
        if (image) {
            console.log("⚠️ Image received but Vision model is dead. Handling gracefully.");
            // AI ko bas bata do ki image aayi thi
            userContent = text + "\n\n[SYSTEM NOTE: The user uploaded an image, but I cannot see it because the vision service is down. Please kindly tell the user to type their question instead.]";
        }

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userContent }, // Hum hamesha STRING bhej rahe hain (Array nahi)
            ],
            model: modelName,
            temperature: 0.3,
            max_tokens: 1024,
        });

        res.json({ reply: completion.choices[0].message.content });

    } catch (err) {
        console.error("AI Error:", err.message);
        // Agar fir bhi error aaye, to frontend ko safe reply bhejo
        res.status(500).json({ reply: "Sorry, server busy. Please try asking in text." });
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