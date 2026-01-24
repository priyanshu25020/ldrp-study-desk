// backend/data.js

// 1. SUBJECTS MASTER LIST
const subjects = [
    { id: 1, code: 'MATHS', name: 'Mathematics-I' },
    { id: 2, code: 'FOP', name: 'Fundamentals of Programming' },
    { id: 3, code: 'BEEE', name: 'Basic Electrical & Electronics' },
    { id: 4, code: 'EPHY', name: 'Engineering Physics' },
    { id: 5, code: 'BME', name: 'Basic Mechanical Engineering' },
    { id: 6, code: 'BCPS', name: 'Business Comm. & Prof. Skills' },
    { id: 7, code: 'SPORTS', name: 'Sports & Yoga' }
];

// 2. TEXTBOOKS (Restored from Reference)
const textbooks = [
    // --- BME (Subject ID: 5) ---
    { id: 4, subject_id: 5, title: 'Chapter 1: Prime Movers', author: 'BME Dept', downloadUrl: '1MjEfbZVf9e2d0NLMFXoPUz7S5n9EMeTv' },
    { id: 5, subject_id: 5, title: 'Chapter 2: Energy', author: 'BME Dept', downloadUrl: '1nNIT87BN57hivS4yXG_xsdHu6cjFgmf2' },
    { id: 6, subject_id: 5, title: 'Chapter 3: Properties of Gases', author: 'BME Dept', downloadUrl: '112ohKHO3s3XRChuIBjDYZ2SdT4rP0MqU' },
    { id: 7, subject_id: 5, title: 'Chapter 4: Properties of Steam', author: 'BME Dept', downloadUrl: '1uiPh2ugH6RH2UkP3h4Do9OR-tTOk14PU' },
    { id: 8, subject_id: 5, title: 'Chapter 5: Heat Engine', author: 'BME Dept', downloadUrl: '1cBUv8KRiNJzwGb6MAPMqla7j2lH4b0GK' },
    { id: 9, subject_id: 5, title: 'Chapter 6: Steam Boilers', author: 'BME Dept', downloadUrl: '1dS_ksDY_4wh-Mpf0dyDI-zeeAe5gf5X0' },
    { id: 10, subject_id: 5, title: 'Chapter 7: Internal Combustion Engine', author: 'BME Dept', downloadUrl: '1mvVuwijtX-1gF_OVSW0jZcqvIF5pxYoT' },
    { id: 11, subject_id: 5, title: 'Chapter 8: Pumps', author: 'BME Dept', downloadUrl: '1nSJ7AHcurmqPkerJFW8FpVEcWSOjZru7' },
    { id: 12, subject_id: 5, title: 'Chapter 9: Air Compressor', author: 'BME Dept', downloadUrl: '1feWnI9dYSavU8W4bxCn1qosKOpoY2HUk' },
    { id: 13, subject_id: 5, title: 'Chapter 10: Refrigeration and Air Conditioning', author: 'BME Dept', downloadUrl: '1NUQpoWX6UDoMnmIv9pxSH_CTC_q9Z6Ob' },
    { id: 14, subject_id: 5, title: 'Chapter 11: Power Transmission', author: 'BME Dept', downloadUrl: '12Fn6GcYmIKgmKeqRIVSHGAXlEavfHgm6' },

    // --- FOP (Subject ID: 2) ---
    { id: 100, subject_id: 2, title: 'Index of Book', author: 'FOP Dept', downloadUrl: '1Jn2m1-_668H3sf3rs9p14h6ZvT-k-9yw' },
    { id: 101, subject_id: 2, title: 'Chapter 1: Introduction to Computer & Programming', author: 'FOP Dept', downloadUrl: '1Jn2m1-_668H3sf3rs9p14h6ZvT-k-9yw' },
    { id: 102, subject_id: 2, title: 'Chapter 2: Flowcharts & Algorithms', author: 'FOP Dept', downloadUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 103, subject_id: 2, title: 'Chapter 3: Introduction to C Language', author: 'FOP Dept', downloadUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 104, subject_id: 2, title: 'Chapter 4: Operators and Expressions', author: 'FOP Dept', downloadUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 105, subject_id: 2, title: 'Chapter 5: Input-Output', author: 'FOP Dept', downloadUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 106, subject_id: 2, title: 'Chapter 6: Decision Making Structure', author: 'FOP Dept', downloadUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 107, subject_id: 2, title: 'Chapter 7: Looping Control Structures', author: 'FOP Dept', downloadUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 108, subject_id: 2, title: 'Chapter 8: Arrays and Strings', author: 'FOP Dept', downloadUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 109, subject_id: 2, title: 'Chapter 9: Pointers', author: 'FOP Dept', downloadUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 110, subject_id: 2, title: 'Chapter 10: Functions', author: 'FOP Dept', downloadUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 111, subject_id: 2, title: 'Chapter 11: Structures and Unions', author: 'FOP Dept', downloadUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 112, subject_id: 2, title: 'Chapter 12: Dynamic Memory Allocation', author: 'FOP Dept', downloadUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 113, subject_id: 2, title: 'Chapter 13: File Management', author: 'FOP Dept', downloadUrl: 'PASTE_DRIVE_ID_HERE' },

    // --- EPHY (Subject ID: 4) ---
    { id: 201, subject_id: 4, title: 'Chapter 1: Architectural Acoustics', author: 'Physics Dept', downloadUrl: '1sU0mISEVXZz7oBqLHHWk16BrDU5xPHrc' },
    { id: 202, subject_id: 4, title: 'Chapter 2: Ultrasonics', author: 'Physics Dept', downloadUrl: '1N8HmtKAjTuogEaT2QGGhksWLIm4IfxEf' },
    { id: 203, subject_id: 4, title: 'Chapter 3: Crystal Physics', author: 'Physics Dept', downloadUrl: '1-6eI-UV3wSlGztsIKZhpRImmW2FtA1IB' },
    { id: 204, subject_id: 4, title: 'Chapter 4: Band Theory of Solids', author: 'Physics Dept', downloadUrl: '1Njs9r4wdI3aPNU0jl-17etRgALSHiWKR' },
    { id: 205, subject_id: 4, title: 'Chapter 5: Lasers', author: 'Physics Dept', downloadUrl: '1KfpIGbFEh8mJe1qTvJXq0eVYQMBh-lSl' },
    { id: 206, subject_id: 4, title: 'Chapter 6: Optical Fibers', author: 'Physics Dept', downloadUrl: '1r6XWHsgPUIGgP7nG8om_kYHL74QemFqM' },
    { id: 207, subject_id: 4, title: 'Chapter 7: Conducting Materials', author: 'Physics Dept', downloadUrl: '16Qv16y6ywx4IbG2R3UDH2oaGk-nGruBs' },
    { id: 208, subject_id: 4, title: 'Chapter 8: Super Conducting Material', author: 'Physics Dept', downloadUrl: '1P98O14-AZz_hybUKn6Olaovp9YhtKm7s' },

    // --- BEEE (Subject ID: 3) ---
    { id: 301, subject_id: 3, title: 'Chapter 1: Introduction to DC Circuit', author: 'Electrical Dept', downloadUrl: '137aEJ_TCi1GOPWon1qf4VaaiwG3em925' },
    { id: 302, subject_id: 3, title: 'Chapter 2: AC Fundamentals & Analysis of AC Circuit', author: 'Electrical Dept', downloadUrl: '1A8o8VGqCbepeVLJf2s0T_Bwmja4KS3zk' },
    { id: 303, subject_id: 3, title: 'Chapter 3: Polyphase (3-phase) Circuit', author: 'Electrical Dept', downloadUrl: '12ZtQFh0Fa0A2C5_wct9BcPJlpRk8PX11' },
    { id: 304, subject_id: 3, title: 'Chapter 4: Electrostatics & Capacitance', author: 'Electrical Dept', downloadUrl: '1rmtm3AOfGL324_haDH7kRBwCh9qlR26K' },
    { id: 305, subject_id: 3, title: 'Chapter 5: Electromagnetic', author: 'Electrical Dept', downloadUrl: '1O2WVtVHb4ELhd-RTWWovJJ_MzscH-NUN' },
    { id: 306, subject_id: 3, title: 'Chapter 6: Basics of Electronics', author: 'Electrical Dept', downloadUrl: '1C3Owhw8QhzePawXpQVjbRsDaWCkBPr_L' },

    // --- BCPS (Subject ID: 6) ---
    { id: 401, subject_id: 6, title: 'Chapter 1: Introduction to Technical Communication', author: 'Humanities Dept', downloadUrl: '1Jn2m1-_668H3sf3rs9p14h6ZvT-k-9yw' },
    { id: 402, subject_id: 6, title: 'Chapter 2: Comprehension Skills', author: 'Humanities Dept', downloadUrl: '1y8M_C7d9ZsMxyMx48Tex-yBSrbSvuNnT' },
    { id: 403, subject_id: 6, title: 'Chapter 3: Speaking Skills', author: 'Humanities Dept', downloadUrl: '1_CFBxI-uTkVgxFK2jrHWTgiKs_uhq6Vb' },
    { id: 404, subject_id: 6, title: 'Chapter 4: Writing Skills', author: 'Humanities Dept', downloadUrl: '1Mxwa0lJ4QAEdoGCIsWwg3F4CDVUNikbF' },
    { id: 405, subject_id: 6, title: 'Chapter 5: Preparing for the Profession', author: 'Humanities Dept', downloadUrl: '1PDIazVhhJNUzHjjJfcyiAFVztbrfeCFZ' },
    { id: 406, subject_id: 6, title: 'Index of the Book', author: 'Humanities Dept', downloadUrl: '17wH5c6FfRo-UKrIfh-BtBhXeN-2WZi1F' },
    // --- MATHS (Subject ID: 1) ---
    { id: 500, subject_id: 1, title: 'Index of the Book', author: 'Maths Dept', downloadUrl: '1lttoyzDtC8jEeZAvNNOjSXXK_bANZDhS' },
    { id: 501, subject_id: 1, title: 'Chapter 1: Sequence and Series', author: 'Maths Dept', downloadUrl: '1bvDxRINVhLbrAZJ1VbksENWlO4IsfsBn' },
    { id: 502, subject_id: 1, title: 'Chapter 2: Taylor’s and Maclaurin’s Series', author: 'Maths Dept', downloadUrl: '1-2gh84Xk5XTugF2IyNgCiv9A6-Kqt-ew' },
    { id: 503, subject_id: 1, title: 'Chapter 3: Curve Sketching', author: 'Maths Dept', downloadUrl: '1pmY-Ge_ja72Efxj8PoEiePMcJveXzgmw' },
    { id: 504, subject_id: 1, title: 'Chapter 4: Indeterminate Forms', author: 'Maths Dept', downloadUrl: '1ds275CVqodPjH2aPj9ckSiO7t47Tf59n' },
    { id: 505, subject_id: 1, title: 'Chapter 5: Improper Integrals', author: 'Maths Dept', downloadUrl: '1HEZJE5cbsw0_XoGMXybndNxDdFoyFupb' },
    { id: 506, subject_id: 1, title: 'Chapter 6: Applications Of Integration', author: 'Maths Dept', downloadUrl: '1UCjhe_HPwWygQZJnYd1Tn9C1eCuXA6Xr' },
    { id: 507, subject_id: 1, title: 'Chapter 7: Partial Derivatives', author: 'Maths Dept', downloadUrl: '1zw0HiOs3wO29quI4qxPnL5-GIQfn3M9K' },
    { id: 508, subject_id: 1, title: 'Chapter 8: Applications of Partial Derivatives', author: 'Maths Dept', downloadUrl: '1L8o-W0eAJcX0mvXlqFFIMctVZ4IRiy1d' },
    { id: 509, subject_id: 1, title: 'Chapter 9: Multiple Integrals', author: 'Maths Dept', downloadUrl: '1lOrHtSt1wB5SSgsbOsZQA0y5Z79Ov8OA' },
    { id: 510, subject_id: 1, title: 'FORMULAS IN MATHS', author: 'Maths Dept', downloadUrl: '1ufn4veq9Hdf1SL_UGpg6oC9-SXazns9f' }
];

// 3. NOTES DATA (Restored from Reference)
const notes = [
    // MATHS (ID 1)
    { id: 101, subject_id: 1, chapter: 'Chapter 1', title: 'Sequence and Series', description: 'Convergence, Divergence, Tests.', fileUrl: '1Jn2m1-_668H3sf3rs9p14h6ZvT-k-9yw' },
    { id: 102, subject_id: 1, chapter: 'Chapter 2', title: 'Series Expansion', description: 'Taylor and Maclaurin series.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 103, subject_id: 1, chapter: 'Chapter 3', title: 'Curve Sketching', description: 'Tracing of curves in Cartesian/Polar.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 104, subject_id: 1, chapter: 'Chapter 4', title: 'Indeterminate Forms', description: 'L-Hospital Rule applications.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 105, subject_id: 1, chapter: 'Chapter 5', title: 'Improper Integrals', description: 'Gamma and Beta functions.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 106, subject_id: 1, chapter: 'Chapter 6', title: 'Applications of Integration', description: 'Area, Volume, Length of arc.', fileUrl: 'PASTE_DRIVE_ID_HERE' },

    // FOP (ID 2)
    { id: 200, subject_id: 2, chapter: 'Index', title: 'Course Index', description: 'Table of contents.', fileUrl: '1y8M_C7d9ZsMxyMx48Tex-yBSrbSvuNnT' },
    { id: 201, subject_id: 2, chapter: 'Chapter 1', title: 'Intro to Programming', description: 'Basics of Computer logic.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 202, subject_id: 2, chapter: 'Chapter 2', title: 'Flowcharts & Algorithms', description: 'Logic building blocks.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 203, subject_id: 2, chapter: 'Chapter 3', title: 'Introduction to C', description: 'Structure of C program.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 204, subject_id: 2, chapter: 'Chapter 4', title: 'Operators', description: 'Arithmetic, logical operators.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 205, subject_id: 2, chapter: 'Chapter 5', title: 'Input Output', description: 'Printf, Scanf usages.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 206, subject_id: 2, chapter: 'Chapter 6', title: 'Decision Making', description: 'If-else statements.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 207, subject_id: 2, chapter: 'Chapter 7', title: 'Loops', description: 'For, While, Do-While loops.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 208, subject_id: 2, chapter: 'Chapter 8', title: 'Arrays', description: '1D and 2D arrays.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 209, subject_id: 2, chapter: 'Chapter 9', title: 'Pointers', description: 'Memory addressing.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 210, subject_id: 2, chapter: 'Chapter 10', title: 'Functions', description: 'Modular programming.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 211, subject_id: 2, chapter: 'Chapter 11', title: 'Structures', description: 'User defined data types.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 212, subject_id: 2, chapter: 'Chapter 12', title: 'Dynamic Memory', description: 'Malloc, Calloc.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 213, subject_id: 2, chapter: 'Chapter 13', title: 'File Management', description: 'File handling in C.', fileUrl: 'PASTE_DRIVE_ID_HERE' },

    // BEEE (ID 3)
    { id: 301, subject_id: 3, chapter: 'Chapter 1', title: 'DC Circuits', description: 'KCL, KVL, Network Theorems.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 302, subject_id: 3, chapter: 'Chapter 2', title: 'AC Fundamentals', description: 'RL, RC, RLC Circuits.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 303, subject_id: 3, chapter: 'Chapter 3', title: 'Polyphase Circuits', description: '3-Phase Systems.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 304, subject_id: 3, chapter: 'Chapter 4', title: 'Electrostatics', description: 'Capacitors and Fields.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 305, subject_id: 3, chapter: 'Chapter 5', title: 'Electromagnetics', description: 'Magnetic circuits.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 306, subject_id: 3, chapter: 'Chapter 6', title: 'Electronics', description: 'Diodes and Rectifiers.', fileUrl: 'PASTE_DRIVE_ID_HERE' },

    // EPHY (ID 4)
    { id: 401, subject_id: 4, chapter: 'Chapter 1', title: 'Acoustics', description: 'Sound engineering.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 402, subject_id: 4, chapter: 'Chapter 2', title: 'Ultrasonics', description: 'Production and applications.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 403, subject_id: 4, chapter: 'Chapter 3', title: 'Crystal Physics', description: 'Lattice structures.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 404, subject_id: 4, chapter: 'Chapter 4', title: 'Band Theory', description: 'Conductivity in solids.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 405, subject_id: 4, chapter: 'Chapter 5', title: 'Lasers', description: 'Stimulated emission.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 406, subject_id: 4, chapter: 'Chapter 6', title: 'Optical Fibers', description: 'Communication physics.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 407, subject_id: 4, chapter: 'Chapter 7', title: 'Conducting Materials', description: 'Free electron theory.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 408, subject_id: 4, chapter: 'Chapter 8', title: 'Superconductors', description: 'Meissner effect.', fileUrl: 'PASTE_DRIVE_ID_HERE' },

    // BME (ID 5)
    { id: 501, subject_id: 5, chapter: 'Chapter 1', title: 'Prime Movers', description: 'Introduction to mechanical energy.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 502, subject_id: 5, chapter: 'Chapter 2', title: 'Energy', description: 'Renewable and Non-renewable.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 503, subject_id: 5, chapter: 'Chapter 3', title: 'Properties of Gases', description: 'Gas laws.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 504, subject_id: 5, chapter: 'Chapter 4', title: 'Steam Properties', description: 'Steam tables usage.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 505, subject_id: 5, chapter: 'Chapter 5', title: 'Heat Engine', description: 'Thermodynamic cycles.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 506, subject_id: 5, chapter: 'Chapter 6', title: 'Steam Boilers', description: 'Boiler mountings.', fileUrl: 'PASTE_DRIVE_ID_HERE' },

    // BCPS (ID 6)
    { id: 601, subject_id: 6, chapter: 'Chapter 1', title: 'Tech Communication', description: 'Basics of communication.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 602, subject_id: 6, chapter: 'Chapter 2', title: 'Comprehension', description: 'Reading skills.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 603, subject_id: 6, chapter: 'Chapter 3', title: 'Speaking Skills', description: 'Oral presentation.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 604, subject_id: 6, chapter: 'Chapter 4', title: 'Writing Skills', description: 'Technical writing.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 605, subject_id: 6, chapter: 'Chapter 5', title: 'Professional Skills', description: 'Ethics and etiquette.', fileUrl: 'PASTE_DRIVE_ID_HERE' },

    // SPORTS (ID 7)
    { id: 701, subject_id: 7, chapter: 'Chapter 1', title: 'Sports Theory', description: 'General Sports Notes.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 702, subject_id: 7, chapter: 'Chapter 2', title: 'Environment', description: 'Environmental Science Notes.', fileUrl: 'PASTE_DRIVE_ID_HERE' }
];

// 4. IMP TOPICS (Based on Chapters)
const imp_topics = [
    { id: 1, subject_id: 1, title: 'MATHS IMP', description: 'Most likely questions', fileUrl: '1LadgSMX5heRtYrRl-2V4eBwgN8uO-662' },
    { id: 2, subject_id: 2, title: 'FOP IMP', description: 'C Programs List', fileUrl: '1O2yRSMCT1PgaBjugElHSHzmEG52sdLyX' },
    { id: 3, subject_id: 3, title: 'BEEE IMP', description: 'Circuit Problems', fileUrl: '15fy1EAGoPAlM87HQlZXMtd711Kg9rCRS' },
    { id: 4, subject_id: 4, title: 'EPHY IMP', description: 'Physics Theory', fileUrl: '1Gi86eKwXLywCcdTLSEw5PYPO076nDzdD' },
    { id: 5, subject_id: 5, title: 'BME IMP', description: 'Diagrams & Definitions', fileUrl: '1hnZItDpfFFwNHV_oIwW7Q0d6XhhfJtAf' },
    { id: 6, subject_id: 6, title: 'BCPS IMP', description: 'Grammar Rules', fileUrl: '15Nrjz2WhRNkfEqg2c1OvKDsj7xRlsj6Z' }
];

// 5. PRACTICALS (Restored - Full Detail)
const practicals = [
    // FOP
    { id: 1, subject_id: 2, title: 'Practical 1', subtitle: 'Experiment: SET 1', file: '1Jn2m1-_668H3sf3rs9p14h6ZvT-k-9yw' },
    { id: 2, subject_id: 2, title: 'Practical 2', subtitle: 'Experiment: SET 2', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 3, subject_id: 2, title: 'Practical 3', subtitle: 'Experiment: SET 3', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 4, subject_id: 2, title: 'Practical 4', subtitle: 'Experiment: SET 4', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 5, subject_id: 2, title: 'Practical 5', subtitle: 'Experiment: SET 5', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 6, subject_id: 2, title: 'Practical 6', subtitle: 'Experiment: SET 6', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 7, subject_id: 2, title: 'Practical 7', subtitle: 'Experiment: SET 7', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 8, subject_id: 2, title: 'Practical 8', subtitle: 'Experiment: SET 8', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 9, subject_id: 2, title: 'Practical 9', subtitle: 'Experiment: SET 9', file: 'PASTE_DRIVE_ID_HERE' },

    // BEEE
    { id: 10, subject_id: 3, title: 'Practical 1', subtitle: 'Exp: Understand Electrical safety', file: '155XO9-BuCHCGjmEeQx_tIG5DgV1jlJTT' },
    { id: 11, subject_id: 3, title: 'Practical 2', subtitle: 'Exp: Standard symbols in EE', file: '1VGN2-hXTOJwXJyyBxzLoE8C2BP6CWLfx' },
    { id: 12, subject_id: 3, title: 'Practical 3', subtitle: 'Exp: Effect of temp on Resistance', file: '1hFPr1FlM3Xw9zpqAoFBIEACJY0tltJcQ' },
    { id: 13, subject_id: 3, title: 'Practical 4', subtitle: 'Exp: Verification of Kirchhoff\'s laws', file: '1OSsWSNR11Jr1WvFeRmvbFzZvUqLHQyFS' },
    { id: 14, subject_id: 3, title: 'Practical 5', subtitle: 'Exp: Power in single phase AC', file: '1FSG3215OfaDkqEl53v_oyPut7uTdNUPk' },
    { id: 15, subject_id: 3, title: 'Practical 6', subtitle: 'Exp: Inductance & PF in R-L Circuit', file: '1Ur2BNX3cgZDJDmrjaRqX-Kq-GiIv_kbG' },
    { id: 16, subject_id: 3, title: 'Practical 7', subtitle: 'Exp: Capacitance & PF in R-C Circuit', file: '1jmTjSklHeOgiEqJoyDPtKuoE8tZmAwqk' },
    { id: 17, subject_id: 3, title: 'Practical 8', subtitle: 'Exp: Star and Delta connections', file: '1JTcKN4BstBLd3XNPhEBClseQAlmKaoH2' },
    { id: 18, subject_id: 3, title: 'Practical 9', subtitle: 'Exp: V-I characteristics of PN Diode', file: '1eAyPx8H2vDxWuo77lprxboMvnNujZn5w' },
    { id: 19, subject_id: 3, title: 'Practical 10', subtitle: 'Exp: Zener Diode as regulator', file: '1fm2OeozkbhFA8xMYS_6uHmLHZqaWXg4j' },

    // EPHY
    { id: 20, subject_id: 4, title: 'Practical 1', subtitle: 'Exp: SOUND LEVEL METER', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 21, subject_id: 4, title: 'Practical 2', subtitle: 'Exp: YOUNG\'S MODULUS', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 22, subject_id: 4, title: 'Practical 3', subtitle: 'Exp: MOMENT OF INERTIA', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 23, subject_id: 4, title: 'Practical 4', subtitle: 'Exp: WAVELENGTH OF LASER', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 24, subject_id: 4, title: 'Practical 5', subtitle: 'Exp: NUMERICAL APERTURE (FO)', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 25, subject_id: 4, title: 'Practical 6', subtitle: 'Exp: RADIOACTIVE DECAY', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 26, subject_id: 4, title: 'Practical 7', subtitle: 'Exp: MILLER INDICES', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 27, subject_id: 4, title: 'Practical 8', subtitle: 'Exp: DE-BROGLIE RELATION', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 28, subject_id: 4, title: 'Practical 9', subtitle: 'Exp: USE OF MULTIMETER', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 29, subject_id: 4, title: 'Practical 10', subtitle: 'Exp: DIODE VOLTAGES', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 30, subject_id: 4, title: 'Practical 11', subtitle: 'Exp: PLANCK\'S CONSTANT', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 31, subject_id: 4, title: 'Practical 12', subtitle: 'Exp: NANOMATERIAL SCALE', file: 'PASTE_DRIVE_ID_HERE' },

    // BME
    { id: 40, subject_id: 5, title: 'Practical 1', subtitle: 'Exp: Types of boilers', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 41, subject_id: 5, title: 'Practical 2', subtitle: 'Exp: 4-stroke engines', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 42, subject_id: 5, title: 'Practical 3', subtitle: 'Exp: 2-stroke engines', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 43, subject_id: 5, title: 'Practical 4', subtitle: 'Exp: Reciprocating air compressor', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 44, subject_id: 5, title: 'Practical 5', subtitle: 'Exp: Vapor compression refrigeration', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 45, subject_id: 5, title: 'Practical 6', subtitle: 'Exp: Window AC and Split AC', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 46, subject_id: 5, title: 'Practical 7', subtitle: 'Exp: Clutches and brakes', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 47, subject_id: 5, title: 'Practical 8', subtitle: 'Exp: Power transmission drives', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 48, subject_id: 5, title: 'Practical 9', subtitle: 'Exp: Tutorials (Gases/Engines/Steam)', file: 'PASTE_DRIVE_ID_HERE' }
];

// 6. ASSIGNMENTS (Restored)
const assignments = [
    // MATHS
    { id: 1, subject_id: 1, title: 'Assignment 1', subtitle: 'Unit 1: Differential Calculus', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 2, subject_id: 1, title: 'Assignment 2', subtitle: 'Unit 2: Partial Differentiation', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 3, subject_id: 1, title: 'Assignment 3', subtitle: 'Unit 3: Applications of Partial Diff.', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 4, subject_id: 1, title: 'Assignment 4', subtitle: 'Unit 4: Multiple Integrals', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 5, subject_id: 1, title: 'Assignment 5', subtitle: 'Unit 5: Infinite Series', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 6, subject_id: 1, title: 'Assignment 6', subtitle: 'Unit 6: Vector Calculus', file: 'PASTE_DRIVE_ID_HERE' },

    // FOP
    { id: 10, subject_id: 2, title: 'Assignment 1', subtitle: 'Unit 1: 50 Questions', file: 'PASTE_DRIVE_ID_HERE' },

    // BEEE
    { id: 20, subject_id: 3, title: 'Assignment 1', subtitle: 'UNIT 1: DC CIRCUIT', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 21, subject_id: 3, title: 'Assignment 2', subtitle: 'UNIT 2: AC CIRCUIT', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 22, subject_id: 3, title: 'Assignment 3', subtitle: 'UNIT 3: Basics of 3-phase', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 23, subject_id: 3, title: 'Assignment 4', subtitle: 'UNIT 4: Electrostatics', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 24, subject_id: 3, title: 'Assignment 5', subtitle: 'UNIT 5: Electromagnetics', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 25, subject_id: 3, title: 'Assignment 6', subtitle: 'UNIT 6: Electronic Systems', file: 'PASTE_DRIVE_ID_HERE' },

    // EPHY
    { id: 30, subject_id: 4, title: 'Assignment 1', subtitle: 'UNIT 1 : Ultrasonic & Architecture Acoustics', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 31, subject_id: 4, title: 'Assignment 2', subtitle: 'UNIT 2 : Laser', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 32, subject_id: 4, title: 'Assignment 3', subtitle: 'UNIT 3 : Fiber Optics', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 33, subject_id: 4, title: 'Assignment 4', subtitle: 'UNIT 4 : Crystal Structure', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 34, subject_id: 4, title: 'Assignment 5', subtitle: 'UINT 5 : Band Theory', file: 'PASTE_DRIVE_ID_HERE' },
    { id: 35, subject_id: 4, title: 'Assignment 6', subtitle: 'UNIT 6 : Nanomaterials & NDT', file: 'PASTE_DRIVE_ID_HERE' },

    // BCPS
    { id: 40, subject_id: 6, title: 'Assignment 1', subtitle: 'UNIT 5: Resume making', file: 'PASTE_DRIVE_ID_HERE' },

    // SPORTS
    { id: 50, subject_id: 7, title: 'Assignment 1', subtitle: 'UNIT: Class Notes', file: 'PASTE_DRIVE_ID_HERE' }
];

// --- 7. PYQs (FIXED: 6 Subjects, 2022-2025, ALL Exams) ---
const pyqs = [
    { id: 1, subject_id: 1, year: '2022-2025', exam: 'ALL', fileUrl: 'PASTE_DRIVE_ID_HERE' }, // MATHS
    { id: 2, subject_id: 2, year: '2022-2025', exam: 'ALL', fileUrl: 'PASTE_DRIVE_ID_HERE' }, // FOP
    { id: 3, subject_id: 3, year: '2022-2025', exam: 'ALL', fileUrl: 'PASTE_DRIVE_ID_HERE' }, // BEEE
    { id: 4, subject_id: 4, year: '2022-2025', exam: 'ALL', fileUrl: 'PASTE_DRIVE_ID_HERE' }, // EPHY
    { id: 5, subject_id: 5, year: '2022-2025', exam: 'ALL', fileUrl: 'PASTE_DRIVE_ID_HERE' }, // BME
    { id: 6, subject_id: 6, year: '2022-2025', exam: 'ALL', fileUrl: 'PASTE_DRIVE_ID_HERE' }  // BCPS
];

module.exports = { subjects, textbooks, notes, imp_topics, practicals, assignments, pyqs };

// Force update v10 - Final Fixs