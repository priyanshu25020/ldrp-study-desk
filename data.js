// backend/data.js

// --- 1. SUBJECTS MASTER LIST (DO NOT EDIT) ---
const subjects = [
    { id: 1, code: 'MATHS', name: 'Mathematics-I' },
    { id: 2, code: 'FOP', name: 'Fundamentals of Programming' },
    { id: 3, code: 'BEEE', name: 'Basic Electrical & Electronics' },
    { id: 4, code: 'EPHY', name: 'Engineering Physics' },
    { id: 5, code: 'BME', name: 'Basic Mechanical Engineering' },
    { id: 6, code: 'BCPS', name: 'Business Comm. & Prof. Skills' },
    { id: 7, code: 'SPORTS', name: 'Sports & Yoga' }
];

// --- 🛠️ INPUT AREA: SIRF YAHA LINKS PASTE KARNI HAIN ---
// Rule: Har link ko "" ke andar rakho aur baad mein comma (,) lagao.
// Agar kisi me material nahi hai to [] khali chhod do.

const rawData = {
    // 1. MATHEMATICS-I
    'MATHS': {
        textbooks: [
            "1Jn2m1-_668H3sf3rs9p14h6ZvT-k-9yw",
            "1y8M_C7d9ZsMxyMx48Tex-yBSrbSvuNnT",
            // Aur paste karte jao...
        ],
        notes: [
            "DRIVE_ID_MATHS_NOTE_CH1",
            "DRIVE_ID_MATHS_NOTE_CH2"
        ],
        imp_topics: [
            "DRIVE_ID_MATHS_IMP_CH1",
            "DRIVE_ID_MATHS_IMP_CH2"
        ],
        practicals: [], // Maths me practical nahi hote usually
        assignments: [
            "DRIVE_ID_MATHS_ASSI_1",
            "DRIVE_ID_MATHS_ASSI_2"
        ],
        pyqs: [
            "DRIVE_ID_MATHS_PYQ_2023",
            "DRIVE_ID_MATHS_PYQ_2024"
        ]
    },

    // 2. FOP (Programming)
    'FOP': {
        textbooks: [
            "DRIVE_ID_FOP_BOOK_1",
            "DRIVE_ID_FOP_BOOK_2"
        ],
        notes: [
            "DRIVE_ID_FOP_NOTE_1"
        ],
        imp_topics: [
            "DRIVE_ID_FOP_IMP_1"
        ],
        practicals: [
            "DRIVE_ID_FOP_EXP_1", // Exp 1
            "DRIVE_ID_FOP_EXP_2", // Exp 2
            "DRIVE_ID_FOP_EXP_3"  // Exp 3
        ],
        assignments: [
            "DRIVE_ID_FOP_ASSI_1"
        ],
        pyqs: [
            "DRIVE_ID_FOP_PYQ_ALL"
        ]
    },

    // 3. BEEE (Electrical)
    'BEEE': {
        textbooks: [],
        notes: [],
        imp_topics: [],
        practicals: [],
        assignments: [],
        pyqs: []
    },

    // 4. EPHY (Physics)
    'EPHY': {
        textbooks: [],
        notes: [],
        imp_topics: [],
        practicals: [],
        assignments: [],
        pyqs: []
    },

    // 5. BME (Mechanical)
    'BME': {
        textbooks: [],
        notes: [],
        imp_topics: [],
        practicals: [],
        assignments: [],
        pyqs: []
    },

    // 6. BCPS (Communication)
    'BCPS': {
        textbooks: [],
        notes: [],
        imp_topics: [],
        practicals: [],
        assignments: [],
        pyqs: []
    },

    // 7. SPORTS
    'SPORTS': {
        textbooks: [],
        notes: [],
        imp_topics: [],
        practicals: [],
        assignments: [],
        pyqs: []
    }
};


// --- ⚙️ AUTOMATIC GENERATOR ENGINE (DO NOT TOUCH BELOW) ---
// Ye code tumhari links ko automatically format karke website par bhejega.

let textbooks = [];
let notes = [];
let imp_topics = [];
let practicals = [];
let assignments = [];
let pyqs = [];

// Global ID Counters to keep IDs unique
let ids = {
    txt: 100,
    note: 1000,
    imp: 2000,
    prac: 3000,
    assi: 4000,
    pyq: 5000
};

// Helper to find Subject ID by Code
const getSubId = (code) => subjects.find(s => s.code === code)?.id;

// The Grand Loop
Object.keys(rawData).forEach(subCode => {
    const subId = getSubId(subCode);
    const data = rawData[subCode];

    if (!subId) {
        console.error(`❌ Error: Subject ${subCode} not found.`);
        return;
    }

    // 1. Textbooks Generator
    if (data.textbooks) {
        data.textbooks.forEach((link, i) => {
            textbooks.push({
                id: ids.txt++,
                subject_id: subId,
                title: `Chapter ${i + 1}`,
                author: `${subCode} Dept`,
                downloadUrl: link // ID for Drive
            });
        });
    }

    // 2. Notes Generator
    if (data.notes) {
        data.notes.forEach((link, i) => {
            notes.push({
                id: ids.note++,
                subject_id: subId,
                chapter: `Unit ${i + 1}`,
                title: `${subCode} Note ${i + 1}`,
                description: `Complete notes for Unit ${i + 1}`,
                fileUrl: link
            });
        });
    }

    // 3. IMP Topics Generator
    if (data.imp_topics) {
        data.imp_topics.forEach((link, i) => {
            imp_topics.push({
                id: ids.imp++,
                subject_id: subId,
                title: `IMP Topic ${i + 1}`,
                description: `Most likely questions for Exam`,
                fileUrl: link
            });
        });
    }

    // 4. Practicals Generator
    if (data.practicals) {
        data.practicals.forEach((link, i) => {
            practicals.push({
                id: ids.prac++,
                subject_id: subId,
                title: `Experiment ${i + 1}`,
                subtitle: `Lab Session ${i + 1}`,
                file: link
            });
        });
    }

    // 5. Assignments Generator
    if (data.assignments) {
        data.assignments.forEach((link, i) => {
            assignments.push({
                id: ids.assi++,
                subject_id: subId,
                title: `Assignment ${i + 1}`,
                subtitle: `Unit ${i + 1} Questions`,
                file: link
            });
        });
    }

    // 6. PYQs Generator
    if (data.pyqs) {
        data.pyqs.forEach((link, i) => {
            pyqs.push({
                id: ids.pyq++,
                subject_id: subId,
                year: `Paper ${i + 1}`, // Or 2023, 2024 automatically
                exam: 'GTU/LDRP',
                fileUrl: link
            });
        });
    }
});

// Export Everything
module.exports = { subjects, textbooks, notes, imp_topics, practicals, assignments, pyqs };