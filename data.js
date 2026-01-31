// backend/data.js

// 1. SUBJECTS MASTER LIST
const subjects = [
    { id: 1, code: 'MATHS', name: 'Mathematics-I' },
    { id: 2, code: 'FOP', name: 'Fundamentals of Programming' },
    { id: 3, code: 'BEEE', name: 'Basic Electrical & Electronics' },
    { id: 4, code: 'EPHY', name: 'Engineering Physics' },
    { id: 5, code: 'BME', name: 'Basic Mechanical Engineering' },
    { id: 6, code: 'BCPS', name: 'Business Comm. & Prof. Skills' },
    { id: 7, code: 'SPORTS', name: 'Sports & Yoga' },

    //SEM 2 Syllabus 
    // Purane subjects (ID 1 se 7) waise hi rehne dena, unke niche yeh add karo:
    { id: 8, code: 'OOPC', name: 'Object Oriented Programming with C++' },
    { id: 9, code: 'ENV', name: 'Environmental Awareness' },
    { id: 10, code: 'BCE', name: 'Basics of Civil Engineering' },
    { id: 11, code: 'PEHV', name: 'Professional Ethics and Human Values' },
    { id: 12, code: 'EG', name: 'Engineering Graphics' },
    { id: 13, code: 'MATHS2', name: 'Mathematics-II' }
];

// 2. TEXTBOOKS (Restored from Reference)
const textbooks = [
    // --- BME (Subject ID: 5) ---
    { id: 4, subject_id: 5, title: 'Chapter 1: Prime Movers', author: 'BME Dept', downloadUrl: '1MjEfbZVf9e2d0NLMFXoPUz7S5n9EMeTv' },
    { id: 5, subject_id: 5, title: 'Chapter 2: Energy', author: 'BME Dept', downloadUrl: '1nNIT87BN57hivS4yXG_xsdHu6cjFgmf2' },
    { id: 6, subject_id: 5, title: 'Chapter 3: Properties of Gases', author: 'BME Dept', downloadUrl: '112ohKHO3s3XRChuIBjDYZ2SdT4rP0MqU' },
    { id: 7, subject_id: 5, title: 'Chapter 4: Properties of Steam', author: 'BME Dept', downloadUrl: '1uaDf4RaId82ORMdf-bslYb0cUO6SnO0S' },
    { id: 8, subject_id: 5, title: 'Chapter 5: Heat Engine', author: 'BME Dept', downloadUrl: '1cBUv8KRiNJzwGb6MAPMqla7j2lH4b0GK' },
    { id: 9, subject_id: 5, title: 'Chapter 6: Steam Boilers', author: 'BME Dept', downloadUrl: '1dS_ksDY_4wh-Mpf0dyDI-zeeAe5gf5X0' },
    { id: 10, subject_id: 5, title: 'Chapter 7: Internal Combustion Engine', author: 'BME Dept', downloadUrl: '1mvVuwijtX-1gF_OVSW0jZcqvIF5pxYoT' },
    { id: 11, subject_id: 5, title: 'Chapter 8: Pumps', author: 'BME Dept', downloadUrl: '1nSJ7AHcurmqPkerJFW8FpVEcWSOjZru7' },
    { id: 12, subject_id: 5, title: 'Chapter 9: Air Compressor', author: 'BME Dept', downloadUrl: '1feWnI9dYSavU8W4bxCn1qosKOpoY2HUk' },
    { id: 13, subject_id: 5, title: 'Chapter 10: Refrigeration and Air Conditioning', author: 'BME Dept', downloadUrl: '1NUQpoWX6UDoMnmIv9pxSH_CTC_q9Z6Ob' },
    { id: 14, subject_id: 5, title: 'Chapter 11: Power Transmission', author: 'BME Dept', downloadUrl: '12Fn6GcYmIKgmKeqRIVSHGAXlEavfHgm6' },

    // --- FOP (Subject ID: 2) ---
    { id: 100, subject_id: 2, title: 'Index of Book', author: 'FOP Dept', downloadUrl: '1dCVSjgka8LZAF2L0zhmZAIXa3vX6VhcQ' },
    { id: 101, subject_id: 2, title: 'Chapter 1: Introduction to Computer & Programming', author: 'FOP Dept', downloadUrl: '1PAZm0iSn49RuZ6crUl4ztDHY0Dx72KsS' },
    { id: 102, subject_id: 2, title: 'Chapter 2: Flowcharts & Algorithms', author: 'FOP Dept', downloadUrl: '1j5o3TtnxzE719fSpv0XS0dhB0MCG_eoc' },
    { id: 103, subject_id: 2, title: 'Chapter 3: Introduction to C Language', author: 'FOP Dept', downloadUrl: '11YoT4NbJm3q8G19m-aeAeCybOxDVQP2l' },
    { id: 104, subject_id: 2, title: 'Chapter 4: Operators and Expressions', author: 'FOP Dept', downloadUrl: '11Ii9Z50T9Hn0LMpKkJ5w1LfG4U5cdBaf' },
    { id: 105, subject_id: 2, title: 'Chapter 5: Input-Output', author: 'FOP Dept', downloadUrl: '1uc8eTIVv8MW0s9Sc0qcYM7OlEnVjeG7D' },
    { id: 106, subject_id: 2, title: 'Chapter 6: Decision Making Structure', author: 'FOP Dept', downloadUrl: '17nntJVSFso3kIBS3-mlZe-L-ziIGrYob' },
    { id: 107, subject_id: 2, title: 'Chapter 7: Looping Control Structures', author: 'FOP Dept', downloadUrl: '1qphKNLjgnfy_l_K68qmdTt8neWMyjyb2' },
    { id: 108, subject_id: 2, title: 'Chapter 8: Arrays and Strings', author: 'FOP Dept', downloadUrl: '1hco7MDDNe4nXZOdoSsg8JZ8vF6L44s2f' },
    { id: 109, subject_id: 2, title: 'Chapter 9: Pointers', author: 'FOP Dept', downloadUrl: '18ySnrfnzC4nxQuoaKzqrdd9Ju9JiJsmI' },
    { id: 110, subject_id: 2, title: 'Chapter 10: Functions', author: 'FOP Dept', downloadUrl: '15cIM79yJpLP62CWMOX9kc5tTzA8o_2Py' },
    { id: 111, subject_id: 2, title: 'Chapter 11: Structures and Unions', author: 'FOP Dept', downloadUrl: '13Dqlu7zGPgo8bUJhm0prBvEsdZH4_ynT' },
    { id: 112, subject_id: 2, title: 'Chapter 12: Dynamic Memory Allocation', author: 'FOP Dept', downloadUrl: '1ORyHsSi1iVm7ePleDOP3ySv943krI-Er' },
    { id: 113, subject_id: 2, title: 'Chapter 13: File Management', author: 'FOP Dept', downloadUrl: '152jJkyCd6gaOQQ022QwBkgqrBnqAo7WV' },

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
    { id: 406, subject_id: 6, title: 'Index of the Book', author: 'Humanities Dept', downloadUrl: '17wH5c6FfRo-UKrIfh-BtBhXeN-2WZi1F' },
    { id: 401, subject_id: 6, title: 'Chapter 1: Introduction to Technical Communication', author: 'Humanities Dept', downloadUrl: '1Jn2m1-_668H3sf3rs9p14h6ZvT-k-9yw' },
    { id: 402, subject_id: 6, title: 'Chapter 2: Comprehension Skills', author: 'Humanities Dept', downloadUrl: '1y8M_C7d9ZsMxyMx48Tex-yBSrbSvuNnT' },
    { id: 403, subject_id: 6, title: 'Chapter 3: Speaking Skills', author: 'Humanities Dept', downloadUrl: '1_CFBxI-uTkVgxFK2jrHWTgiKs_uhq6Vb' },
    { id: 404, subject_id: 6, title: 'Chapter 4: Writing Skills', author: 'Humanities Dept', downloadUrl: '1Mxwa0lJ4QAEdoGCIsWwg3F4CDVUNikbF' },
    { id: 405, subject_id: 6, title: 'Chapter 5: Preparing for the Profession', author: 'Humanities Dept', downloadUrl: '1PDIazVhhJNUzHjjJfcyiAFVztbrfeCFZ' },
    
    // --- MATHS (Subject ID: 1) ---
    { id: 500, subject_id: 1, title: 'Index of the Book', author: 'Maths Dept', downloadUrl: '1lttoyzDtC8jEeZAvNNOjSXXK_bANZDhS' },
    { id: 501, subject_id: 1, title: 'Chapter 1: Sequence and Series', author: 'Maths Dept', downloadUrl: '1bvDxRINVhLbrAZJ1VbksENWlO4IsfsBn' },
    { id: 502, subject_id: 1, title: 'Chapter 2: Taylor’s and Maclaurin’s Series', author: 'Maths Dept', downloadUrl: '1LsUVbuQdASQL66_MB2cm4cOVfEI1ZPp-' },
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
    { id: 101, subject_id: 1, chapter: 'Chapter 1', title: 'Differential Calculus', description: 'Convergence, Divergence, Tests.', fileUrl: '19vv3-nTXVNpMMmYnwGw9y_bh2F-Q76K3' },
    { id: 102, subject_id: 1, chapter: 'Chapter 2', title: 'Partial differentiation', description: 'Taylor and Maclaurin series.', fileUrl: '1UBSkj0FHfcoCXeCI_LApRCMzK2mQz8UT' },
    { id: 103, subject_id: 1, chapter: 'Chapter 3', title: 'Applications of Partial differentiation', description: 'Tracing of curves in Cartesian/Polar.', fileUrl: '1rT_zsPDfzlpeIbnL2r9gNUDqaGnzxvhL' },
    { id: 104, subject_id: 1, chapter: 'Chapter 4', title: 'Multiple Integrals and its applications', description: 'L-Hospital Rule applications.', fileUrl: '16q-X5nrwD02UFkDR5ACR695k7UAFmvan' },
    { id: 105, subject_id: 1, chapter: 'Chapter 5', title: 'Infinite Series', description: 'Gamma and Beta functions.', fileUrl: '1lLNJWN5PkeR68-dgXTfG6_9klb4BW8RP' },
    { id: 106, subject_id: 1, chapter: 'Chapter 6', title: 'Vector differential Calculus', description: 'Area, Volume, Length of arc.', fileUrl: '1jKZ6OjMsufUq3L1_DXAmMU6QyB2oevPd' },

    // FOP (ID 2)
    { id: 201, subject_id: 2, chapter: 'Chapter 1', title: 'Intro to  Introduction to C Language and Program Structure', description: 'Basics of Computer logic.', fileUrl: '1VzLIL5AcAPfEiVxtLfdxSLjYWGcYyjlh' },
    { id: 202, subject_id: 2, chapter: 'Chapter 2', title: 'Flowcharts & Algorithms', description: 'Logic building blocks.', fileUrl: '1xVh0i0qbPUzcbItXcxFj_ty0leIeT6xa' },
    { id: 203, subject_id: 2, chapter: 'Chapter 3', title: 'Introduction to C', description: 'Structure of C program.', fileUrl: '1xVh0i0qbPUzcbItXcxFj_ty0leIeT6xa' },
    { id: 204, subject_id: 2, chapter: 'Chapter 4', title: 'Arrays and Strings', description: 'Arithmetic, logical operators.', fileUrl: '1nz_Q44Pd07xQhr6zvILQJkBNlpEe4wtE' },
    { id: 205, subject_id: 2, chapter: 'Chapter 5', title: 'Functions in C', description: 'Printf, Scanf usages.', fileUrl: '1ZeU8P-mbN68LneUnIVUk4fOE4es23ZGq' },
    { id: 206, subject_id: 2, chapter: 'Chapter 6', title: 'Structures and Unions', description: 'If-else statements.', fileUrl: '1bfcdIieyh4czYqPI-w6eThpkQG8gdt-h' },

    // BEEE (ID 3)
    { id: 301, subject_id: 3, chapter: 'Chapter 1', title: 'DC Circuits', description: 'KCL, KVL, Network Theorems.', fileUrl: '1kPVzaeor8HS9rmCC7MIIwBLFgcAucW6_' },
    { id: 302, subject_id: 3, chapter: 'Chapter 2', title: 'AC Fundamentals', description: 'RL, RC, RLC Circuits.', fileUrl: '12HUekw0FKtyUk2OBvoqUeLj2dnEvhv4R' },
    { id: 303, subject_id: 3, chapter: 'Chapter 3', title: 'Polyphase Circuits', description: '3-Phase Systems.', fileUrl: '1vGmBfR-IbF-cZ98dYoVG24B8nWH90Hyb' },
    { id: 304, subject_id: 3, chapter: 'Chapter 4', title: 'Electrostatics', description: 'Capacitors and Fields.', fileUrl: '144ScwGN2_Wxl0VUp5hMkzdUZd2BV6btP' },
    { id: 305, subject_id: 3, chapter: 'Chapter 5', title: 'Electromagnetics', description: 'Magnetic circuits.', fileUrl: '1TbjmVfVzSL4_ZU8eGnpbPG1wVyxOMVSr' },
    { id: 306, subject_id: 3, chapter: 'Chapter 6', title: 'Electronic System', description: 'Diodes and Rectifiers.', fileUrl: '1bCeKlUGlRnGt8af8AaQ_BXB-YJSd-u0b' },

    // EPHY (ID 4)
    { id: 401, subject_id: 4, chapter: 'Chapter 1', title: 'Acoustics', description: 'Sound engineering.', fileUrl: '1ksoRJaqIokPdSOV62BoMNNGPb7nzZmK3' },
    { id: 402, subject_id: 4, chapter: 'Chapter 2', title: 'Elasticity', description: 'Production and applications.', fileUrl: '1qsPYO1-yhJb78I5HpXswaelkhbQEt5N9' },
    { id: 403, subject_id: 4, chapter: 'Chapter 3', title: 'Laser', description: 'Stimulated emission.', fileUrl: '1Jzs3l4gqh2LIZ_c8snbr51q7BNe12Joo' },
    { id: 404, subject_id: 4, chapter: 'Chapter 4', title: 'Fiber Optics', description: 'Communication physics..', fileUrl: '1qbwOsKZsx3HBbRzA7eKEaTIxFp1Y0pPM' },
    { id: 405, subject_id: 4, chapter: 'Chapter 5', title: 'Quantum Mechanics & Computing', description: 'Wave Equation', fileUrl: '1tX5eZiS3zGxOT-lblE4vDOb3pYRV_psy' },
    { id: 406, subject_id: 4, chapter: 'Chapter 6', title: 'Crystal Structure', description: 'Miller Indices.', fileUrl: '1aAVXjKwYItMXX7RSo06ngv7Ys_z8vOwA' },
    { id: 407, subject_id: 4, chapter: 'Chapter 7', title: 'Band Theory of Solids', description: 'Free electron theory.', fileUrl: '1rT_zsPDfzlpeIbnL2r9gNUDqaGnzxvhL' },
    { id: 408, subject_id: 4, chapter: 'Chapter 8', title: 'Nanomaterials & NDT', description: 'NDT tests.', fileUrl: '1rT_zsPDfzlpeIbnL2r9gNUDqaGnzxvhL' },

    // BME (ID 5)
    { id: 501, subject_id: 5, chapter: 'Chapter 1', title: 'Prime Movers', description: 'Introduction to mechanical energy.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 502, subject_id: 5, chapter: 'Chapter 2', title: 'Energy', description: 'Renewable and Non-renewable.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 503, subject_id: 5, chapter: 'Chapter 3', title: 'Properties of Gases', description: 'Gas laws.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 504, subject_id: 5, chapter: 'Chapter 4', title: 'Steam Properties', description: 'Steam tables usage.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 505, subject_id: 5, chapter: 'Chapter 5', title: 'Heat Engine', description: 'Thermodynamic cycles.', fileUrl: 'PASTE_DRIVE_ID_HERE' },
    { id: 506, subject_id: 5, chapter: 'Chapter 6', title: 'Steam Boilers', description: 'Boiler mountings.', fileUrl: 'PASTE_DRIVE_ID_HERE' },

    // BCPS (ID 6)
    { id: 601, subject_id: 6, chapter: 'Chapter 1', title: 'Tech Communication', description: 'Basics of communication.', fileUrl: '1JE-62ekmHL2KrpeTa1v8ySt2QGM-U0t8' },
    { id: 602, subject_id: 6, chapter: 'Chapter 2', title: 'Comprehension', description: 'Reading skills.', fileUrl: '1DFTEX9PrmjyGOYXMg3YKgopXpQB602Hp' },
    { id: 603, subject_id: 6, chapter: 'Chapter 3', title: 'Speaking Skills', description: 'Oral presentation.', fileUrl: '1ZLA9hxJIgTVfxUGm5GnHe20_5L_5dd9Z' },
    { id: 604, subject_id: 6, chapter: 'Chapter 4', title: 'Writing Skills', description: 'Technical writing.', fileUrl: '1hv_bKJJQeST8gttTsZGcOgzj88PCTFja' },
    { id: 605, subject_id: 6, chapter: 'Chapter 5', title: 'Professional Skills', description: 'Ethics and etiquette.', fileUrl: '1RTOHoqtbFdYTr9MqS9B2UmCim12gYlzu' },

    // SPORTS (ID 7)
    { id: 701, subject_id: 7, chapter: 'Chapter 1', title: 'Sports Theory', description: 'General Sports Notes.', fileUrl: '1tot2XZhsxiFZG7smD2Ui_DR96gFEeMcG' },
    { id: 702, subject_id: 7, chapter: 'Chapter 2', title: 'Environment', description: 'Environmental Science Notes.', fileUrl: '1uOw1a8NU6Xi-BxNBkINEXSLoY9sAcb1z' }
];

// 4. IMP TOPICS (Based on Chapters)
const imp_topics = [
    { id: 1, subject_id: 1, title: 'MATHS IMP', description: 'Most likely questions', fileUrl: '1GOWe9QU4BriWTGQQqNnieBWxCMMTTlVx' },
    { id: 2, subject_id: 2, title: 'FOP IMP', description: 'C Programs List', fileUrl: '1L0--eXFnKFO1PBNTgiytXtUyFXn8oqC3' },
    { id: 3, subject_id: 3, title: 'BEEE IMP', description: 'Circuit Problems', fileUrl: '101EvJ2VYXuHHfMoJlNW4JPW-Yd797q4P' },
    { id: 4, subject_id: 4, title: 'EPHY IMP', description: 'Physics Theory', fileUrl: '1ylIRbOzb8dsh4JVi8L8Y6_3SCY6ZqIvA' },
    { id: 5, subject_id: 5, title: 'BME IMP', description: 'Diagrams & Definitions', fileUrl: '1L35Ry7FxwPhYZ-raKWfQ6DVK6WL54jeC' },
    { id: 6, subject_id: 6, title: 'BCPS IMP', description: 'Grammar Rules', fileUrl: '1zyjIle93uei8eMp93eKMC3n4S7APNnH8' },
    { id: 7, subject_id: 7, title: 'SPORTS IMP', description: 'YOGA', fileUrl: '1rT_zsPDfzlpeIbnL2r9gNUDqaGnzxvhL' }
];

// 5. PRACTICALS (Restored - Full Detail)
const practicals = [
    // FOP
    { id: 10, subject_id: 2, title: 'Sets of Practical', subtitle: 'Index Of all Sets', file: '1zg-HdWtkJ5yhsMyVrzZ7n-QOnvUKZ_-7' },
    { id: 1, subject_id: 2, title: 'Practical 1', subtitle: 'Experiment: SET 1', file: '1elVnc6B8Do3k97rZs3UoqREvhLz6O45z' },
    { id: 2, subject_id: 2, title: 'Practical 2', subtitle: 'Experiment: SET 2', file: '1OW5TY-Izn2NjMePZ0Hm3SoaCfAobqFrw' },
    { id: 3, subject_id: 2, title: 'Practical 3', subtitle: 'Experiment: SET 3', file: '1ibydlW4MzZ5AsQ5SuE69FZWlBM8RI9F0' },
    { id: 4, subject_id: 2, title: 'Practical 4', subtitle: 'Experiment: SET 4', file: '1iBs6xrCL6ttUMdEiWdGCOT8-P8qai5-p' },
    { id: 5, subject_id: 2, title: 'Practical 5', subtitle: 'Experiment: SET 5', file: '1ObdMgdbWu53GdgsU60CkZhepZZ8emTmN' },
    { id: 6, subject_id: 2, title: 'Practical 6', subtitle: 'Experiment: SET 6', file: '1qmR5XoyT0cXNjTEFd2HZqjqGoe69S4Zr' },
    { id: 7, subject_id: 2, title: 'Practical 7', subtitle: 'Experiment: SET 7', file: '1ZNqg54SQ4rtHDRcddRaQg02lyZIRcgPC' },
    { id: 8, subject_id: 2, title: 'Practical 8', subtitle: 'Experiment: SET 8', file: '1d_vLBbcorMotx7wkJC0CnxlyuQuTl2oN' },
    { id: 9, subject_id: 2, title: 'Practical 9', subtitle: 'Experiment: SET 9', file: '1J7ubOeqMed5XZGyQnGUf272ijWfZOGs-' },

    // BEEE
    { id: 10, subject_id: 3, title: 'Practical 1', subtitle: 'Exp: Understand Electrical safety', file: '155XO9-BuCHCGjmEeQx_tIG5DgV1jlJTT' },
    { id: 11, subject_id: 3, title: 'Practical 2', subtitle: 'Exp: Standard symbols in EE', file: '1VGN2-hXTOJwXJyyBxzLoE8C2BP6CWLfx' },
    { id: 12, subject_id: 3, title: 'Practical 3', subtitle: 'Exp: Effect of temp on Resistance', file: '1hFPr1FlM3Xw9zpqAoFBIEACJY0tltJcQ' },
    { id: 13, subject_id: 3, title: 'Practical 4', subtitle: 'Exp: Verification of Kirchhoff\'s laws', file: '1OSsWSNR11Jr1WvFeRmvbFzZvUqLHQyFS' },
    { id: 14, subject_id: 3, title: 'Practical 5', subtitle: 'Exp: Power in single phase AC', file: '1FSG3215OfaDkqEl53v_oyPut7uTdNUPk' },
    { id: 15, subject_id: 3, title: 'Practical 6', subtitle: 'Exp: Inductance & PF in R-L Circuit', file: '1jmTjSklHeOgiEqJoyDPtKuoE8tZmAwqk' },
    { id: 16, subject_id: 3, title: 'Practical 7', subtitle: 'Exp: Capacitance & PF in R-C Circuit', file: '1Ur2BNX3cgZDJDmrjaRqX-Kq-GiIv_kbG' },
    { id: 17, subject_id: 3, title: 'Practical 8', subtitle: 'Exp: Star and Delta connections', file: '1JTcKN4BstBLd3XNPhEBClseQAlmKaoH2' },
    { id: 18, subject_id: 3, title: 'Practical 9', subtitle: 'Exp: V-I characteristics of PN Diode', file: '1eAyPx8H2vDxWuo77lprxboMvnNujZn5w' },
    { id: 19, subject_id: 3, title: 'Practical 10', subtitle: 'Exp: Zener Diode as regulator', file: '1fm2OeozkbhFA8xMYS_6uHmLHZqaWXg4j' },

    // EPHY
    { id: 20, subject_id: 4, title: 'Practical 1', subtitle: 'Exp: SOUND LEVEL METER', file: '1rT_zsPDfzlpeIbnL2r9gNUDqaGnzxvhL' },
    { id: 21, subject_id: 4, title: 'Practical 2', subtitle: 'Exp: YOUNG\'S MODULUS', file: '1rT_zsPDfzlpeIbnL2r9gNUDqaGnzxvhL' },
    { id: 22, subject_id: 4, title: 'Practical 3', subtitle: 'Exp: MOMENT OF INERTIA', file: '1rT_zsPDfzlpeIbnL2r9gNUDqaGnzxvhL' },
    { id: 23, subject_id: 4, title: 'Practical 4', subtitle: 'Exp: WAVELENGTH OF LASER', file: '1rT_zsPDfzlpeIbnL2r9gNUDqaGnzxvhL' },
    { id: 24, subject_id: 4, title: 'Practical 5', subtitle: 'Exp: NUMERICAL APERTURE (FO)', file: '1rT_zsPDfzlpeIbnL2r9gNUDqaGnzxvhL' },
    { id: 25, subject_id: 4, title: 'Practical 6', subtitle: 'Exp: RADIOACTIVE DECAY', file: '1rT_zsPDfzlpeIbnL2r9gNUDqaGnzxvhL' },
    { id: 26, subject_id: 4, title: 'Practical 7', subtitle: 'Exp: MILLER INDICES', file: '1rT_zsPDfzlpeIbnL2r9gNUDqaGnzxvhL' },
    { id: 27, subject_id: 4, title: 'Practical 8', subtitle: 'Exp: DE-BROGLIE RELATION', file: '1rT_zsPDfzlpeIbnL2r9gNUDqaGnzxvhL' },
    { id: 28, subject_id: 4, title: 'Practical 9', subtitle: 'Exp: USE OF MULTIMETER', file: '1rT_zsPDfzlpeIbnL2r9gNUDqaGnzxvhL' },
    { id: 29, subject_id: 4, title: 'Practical 10', subtitle: 'Exp: DIODE VOLTAGES', file: '1rT_zsPDfzlpeIbnL2r9gNUDqaGnzxvhL' },
    { id: 30, subject_id: 4, title: 'Practical 11', subtitle: 'Exp: PLANCK\'S CONSTANT', file: '1rT_zsPDfzlpeIbnL2r9gNUDqaGnzxvhL' },
    { id: 31, subject_id: 4, title: 'Practical 12', subtitle: 'Exp: NANOMATERIAL SCALE', file: '1rT_zsPDfzlpeIbnL2r9gNUDqaGnzxvhL' },

    // BME
    { id: 40, subject_id: 5, title: 'Practical 1', subtitle: 'Exp: Types of boilers', file: '1WHj2E01PUSip1V2BmQgrusoN72a0iknr' },
    { id: 41, subject_id: 5, title: 'Practical 2', subtitle: 'Exp: 4-stroke engines', file: '1BhIKLg_jw-NadFn_2RHI2vdNuhMaakCe' },
    { id: 42, subject_id: 5, title: 'Practical 3', subtitle: 'Exp: 2-stroke engines', file: '1P9ZJrhbB29EVRFNjJZLDE8vizf03dy9-' },
    { id: 43, subject_id: 5, title: 'Practical 4', subtitle: 'Exp: Reciprocating air compressor', file: '1UR6maHuAVCmY1cFtBWat7bX27c1o8NB_' },
    { id: 44, subject_id: 5, title: 'Practical 5', subtitle: 'Exp: Vapor compression refrigeration', file: '1RSzwr49D_2861l_iPOBGelPT_ctJA572' },
    { id: 45, subject_id: 5, title: 'Practical 6', subtitle: 'Exp: Window AC and Split AC', file: '1D7B68eFR1CUmJpf1Pk6gUdZca-CIdfgV' },
    { id: 46, subject_id: 5, title: 'Practical 7', subtitle: 'Exp: Clutches and brakes', file: '1K-24rshRBYB5dNcW3uTYj_w9w3uYOWKf' },
    { id: 47, subject_id: 5, title: 'Practical 8', subtitle: 'Exp: Power transmission drives', file: '1VgkZ4FZv1VcmWdUELxw96cCh3d-RwWYE' },
    { id: 48, subject_id: 5, title: 'Practical 9', subtitle: 'Exp: Tutorials (Gases/Engines/Steam)', file: '1gvT8aXcV95iP-hOyhPSrQk7YKF9M1jDB' }
];

// 6. ASSIGNMENTS (Restored)
const assignments = [
    // MATHS
    { id: 1, subject_id: 1, title: 'Assignment 1', subtitle: 'Unit 1: Differential Calculus', file: '1oCBgmGIwVBqvxaMCsX42hUZ_E9il1YPS' },
    { id: 2, subject_id: 1, title: 'Assignment 2', subtitle: 'Unit 2: Partial Differentiation', file: '149g0f6Wk2Oxc2ZYlS6pgFJKmWtWDHQEk' },
    { id: 3, subject_id: 1, title: 'Assignment 3', subtitle: 'Unit 3: Applications of Partial Diff.', file: '1rT_zsPDfzlpeIbnL2r9gNUDqaGnzxvhL' },
    { id: 4, subject_id: 1, title: 'Assignment 4', subtitle: 'Unit 4: Multiple Integrals', file: '1cfI7n44CHyi5vBOxXOF3lFB53hiri0No' },
    { id: 5, subject_id: 1, title: 'Assignment 5', subtitle: 'Unit 5: Infinite Series', file: '1cTF_VXJbx_lfSNS42I0Oj2GzcJXVAWvE' },
    { id: 6, subject_id: 1, title: 'Assignment 6', subtitle: 'Unit 6: Vector Calculus', file: '1aBX07_T7-w62rnXdu8Q8aNon2v8kU1XL' },

    // FOP
    { id: 11, subject_id: 2, title: 'Questions of Assignment', subtitle: '50 Questions', file: '1wEzdgUejLvxbmp7f2OlHYLD5yfzSSMZt' },
    { id: 10, subject_id: 2, title: 'Assignment 1', subtitle: 'Unit 1: 50 Questions', file: '1gi5CvBOvkTGAw9ReSlu2njx6-rPoyNOj' },

    // BEEE
    { id: 20, subject_id: 3, title: 'Assignment 1', subtitle: 'UNIT 1: DC CIRCUIT', file: '1j5KheknQYfFD5gzBmSxAT1h-5QGYSkgL' },
    { id: 21, subject_id: 3, title: 'Assignment 2', subtitle: 'UNIT 2: AC CIRCUIT', file: '1GEd6ehuO-_fbHgDwuePVQ_F1ciHCQ9Q-' },
    { id: 22, subject_id: 3, title: 'Assignment 3', subtitle: 'UNIT 3: Basics of 3-phase', file: '1IRoiUdeTZ64VQSYTifn2C2gPv_-vRVyH' },
    { id: 23, subject_id: 3, title: 'Assignment 4', subtitle: 'UNIT 4: Electrostatics', file: '1A3Em6Cvu86JRhGVk0pZ_CsSIHBJzIfQw' },
    { id: 24, subject_id: 3, title: 'Assignment 5', subtitle: 'UNIT 5: Electromagnetics', file: '19zYoPATqo3A42mw5S8aBeIctJSvBO64b' },
    { id: 25, subject_id: 3, title: 'Assignment 6', subtitle: 'UNIT 6: Electronic Systems', file: '1ihJ8l2_VsxzwYW-JqdNvvrj8_Jc2NFes' },

    // EPHY
    { id: 30, subject_id: 4, title: 'Assignment 1', subtitle: 'UNIT 1 : Ultrasonic & Architecture Acoustics', file: '17EZMAwHRHKnGfV1wyuT_jfFHBacRA8lY' },
    { id: 31, subject_id: 4, title: 'Assignment 2', subtitle: 'UNIT 2 : Elasticity', file: '17989JqlEH3WO_yPMc6CEd8uzgvjPuHBx' },
    { id: 32, subject_id: 4, title: 'Assignment 3', subtitle: 'UNIT 3 : Laser', file: '1Ri4JXWoR7te8w2sH_dI0bAZKXS6-5-QO' },
    { id: 33, subject_id: 4, title: 'Assignment 4', subtitle: 'UNIT 4 : Fiber Optics', file: '1qwdiBPJODRTUQgwJjnERF6_opC3KKdQz' },
    { id: 34, subject_id: 4, title: 'Assignment 5', subtitle: 'UINT 5 : Crystal Structure', file: '1-Qhzqm6vONedY0VD8UJDqrX5X1iPZvJs' },
    { id: 35, subject_id: 4, title: 'Assignment 6', subtitle: 'UNIT 6 : Band Theory Of Solids', file: '16USQ5V6Lddz1VnuMwBhVAdCX5L6-B3-S' },
    { id: 36, subject_id: 4, title: 'Assignment 7', subtitle: 'UNIT 7 : Nanomaterials & NDT', file: '1jsngd3WJHbkyBgd_DpNB3LdUsOEehIaT' },

    // BCPS
    { id: 40, subject_id: 6, title: 'Assignment 1', subtitle: 'UNIT 5: Resume making', file: '14b2YhYkS3iy9Sd91-mQfWaGBQWBcCu7f' },

    // SPORTS
    { id: 50, subject_id: 7, title: 'Assignment 1', subtitle: 'UNIT: Class Notes', file: '1IfxJB8qc31KsA4zY0CIYvme_uvRskxBo' }
];

// --- 7. PYQs (FIXED: 6 Subjects, 2022-2025, ALL Exams) ---
const pyqs = [
    { id: 1, subject_id: 1, year: '2022-2025', exam: 'ALL', fileUrl: '1RWpRpgAm9z896sBMsqpMG_n0n4OrUmQD' }, // MATHS
    { id: 2, subject_id: 2, year: '2022-2025', exam: 'ALL', fileUrl: '1bmBm0PQxGBRBZGzJDvvCYsj6Ji7jYHI3' }, // FOP
    { id: 3, subject_id: 3, year: '2022-2025', exam: 'ALL', fileUrl: '1tAtendOFd0aM2oQlW4QjI0SWJCdTXYZJ' }, // BEEE
    { id: 4, subject_id: 4, year: '2022-2025', exam: 'ALL', fileUrl: '1-nETfbZWZdqUSgHNvwtIc2Es2wXk2-uD' }, // EPHY
    { id: 5, subject_id: 5, year: '2022-2025', exam: 'ALL', fileUrl: '17DP3lvXxPD6Cy0Ug_-gCRBZDeeeMS_my' }, // BME
    { id: 6, subject_id: 6, year: '2022-2025', exam: 'ALL', fileUrl: '1e7KKwqUhaCq0W0akTI992q1nGJ3Fa0Sw' }  // BCPS
];

// --- 8. FACULTY DATA (Scalable Structure) ---
const faculty = [
    // --- ID 1: MATHS (9 Faculty) ---
    { id: 101, subject_id: 1, name: "DR. Manoj Patel", designation: "Asst. Professor", dept: "Mathematics", cabin: "Shift 1,First Floor,CF-SR 5,", email: "manoj_sh@ldrp.ac.in", linkedin: "https://www.linkedin.com/in/dr-manoj-patel-73341090/", image: "images/faculty/maths_1.jpg" },
    { id: 102, subject_id: 1, name: "MR. Khushal Prajapati", designation: "Asst. Professor", dept: "Mathematics", cabin: "Shift 1,First floor,Opp. of CF-SR 4", email: "khushalnp@gmail.com", linkedin: "https://www.linkedin.com/in/khushal-prajapati/", image: "images/faculty/maths_2.jpeg" },
    { id: 103, subject_id: 1, name: "DR. Vijay Patel", designation: "Asst. Professor", dept: "Mathematics", cabin: "UPDATING SOON...", email: "vijay_sh@ldrp.ac.in", linkedin: "https://www.linkedin.com/in/dr-vijay-patel-159a1027/", image: "images/faculty/maths_3.jpg" },
    { id: 104, subject_id: 1, name: "MR. Divyarajsinh Gohil", designation: "Asst. Professor", dept: "Mathematics", cabin: "Shift 1,First floor,Opp. of CF-SR 4", email: "UPDATING SOON...", linkedin: "#", image: "images/faculty/maths_4.jpg" },
    { id: 105, subject_id: 1, name: "MR. Harsh Shah", designation: "Asst. Professor", dept: "Mathematics", cabin: "Shift 1,First floor,Opp. of CF-SR 4", email: "harsh_sh@ldrp.ac.in", linkedin: "#", image: "images/faculty/maths_5.jpg" },
    { id: 106, subject_id: 1, name: "MS. Shruti Rathod", designation: "Asst. Professor", dept: "Mathematics", cabin: "Shift 1,First floor,Opp. of CF-SR 4", email: "shruti_sh@ldrp.ac.in", linkedin: "#", image: "images/faculty/maths_6.jpg" },
    { id: 107, subject_id: 1, name: "DR. KRISHNA P. SOLANKI", designation: "Asst. Professor", dept: "Mathematics", cabin: "Shift 1,First floor,Opp. of CF-SR 4", email: "krishna_sh@ldrp.ac.in", linkedin: "#", image: "images/faculty/maths_7.jpg" },
    { id: 108, subject_id: 1, name: "MR. Vipul Patel", designation: "Asst. Professor", dept: "Mathematics", cabin: "UPDATING SOON...", email: "vipul_sh@ldrp.ac.in", linkedin: "#", image: "images/faculty/maths_8.jpg" },

    // --- ID 2: FOP (Computer) - Assuming 5 Faculty ---
    { id: 201, subject_id: 2, name: "DR. Maulik A. Modi", designation: "Asst. Professor", dept: "Mechanical Engineering Department Faculty of Engineering", cabin: "UPDATING SOON...", email: "maulik_me@ldrp.ac.in", linkedin: "#", image: "images/faculty/fop_1.jpeg" },
    { id: 202, subject_id: 2, name: "DR. Jigar Suthar", designation: "Asst. Professor", dept: "Mechanical Engineering Department Faculty of Engineering", cabin: "Mechanical Dept. ,Ground Floor,HMT LAB", email: "jigar_me@ldrp.ac.in", linkedin: "#", image: "images/faculty/fop_2.jpg" },
    { id: 203, subject_id: 2, name: "DR. Kaushal H. Bhavsar", designation: "Associate Professor", dept: "Mechanical Engineering Department Faculty of Engineering", cabin: "UPDATING SOON...", email: "kaushal_me@ldrp.ac.in", linkedin: "#", image: "images/faculty/fop_3.jpg" },
    { id: 204, subject_id: 2, name: "MR. Amit Pandey", designation: "Asst. Professor", dept: "Mechanical Engineering Department Faculty of Engineering", cabin: "UPDATING SOON...", email: "amit_me@ldrp.ac.in", linkedin: "#", image: "images/faculty/fop_4.jpg" },
    { id: 205, subject_id: 2, name: "MR. Chandramaulisinh A Parmar", designation: "Asst. Professor", dept: "Mechanical Engineering Department Faculty of Engineering", cabin: "UPDATING SOON...", email: "chandra_me@ldrp.ac.in", linkedin: "#", image: "images/faculty/fop_5.jpg" },
    { id: 206, subject_id: 2, name: "MR. Hitesh Patel", designation: "Asst. Professor", dept: "Mechanical Engineering Department Faculty of Engineering", cabin: "UPDATING SOON...", email: "hitesh_me@ldrp.ac.in", linkedin: "#", image: "images/faculty/fop_6.jpg" },
    { id: 207, subject_id: 2, name: "DR. Saumil C Patel", designation: "Asst. Professor", dept: "Mechanical Engineering Department Faculty of Engineering", cabin: "UPDATING SOON...", email: "saumil_me@ldrp.ac.in", linkedin: "#", image: "images/faculty/fop_7.jpg" },
    { id: 208, subject_id: 2, name: "DR. Kiran A Patel", designation: "Asst. Professor", dept: "Mechanical Engineering Department Faculty of Engineering", cabin: "UPDATING SOON...", email: "kiran_me@ldrp.ac.in", linkedin: "#", image: "images/faculty/fop_8.jpg" },
    { id: 209, subject_id: 2, name: "MR. Aniruddh R Kyada", designation: "Asst. Professor", dept: "Mechanical Engineering Department Faculty of Engineering", cabin: "UPDATING SOON...", email: "aniruddh_me@ldrp.ac.in", linkedin: "#", image: "images/faculty/fop_9.jpg" },

    // --- ID 3: BEEE (Electrical) - 6 Faculty ---
    { id: 301, subject_id: 3, name: "MRS.Payal V.Mistry", designation: "Asst. Professor", dept: "Electrical", cabin: "E-101", email: "pvmistri_ee@ldrp.ac.in", linkedin: "#", image: "images/faculty/beee_1.jpg" },
    { id: 302, subject_id: 3, name: "DR. Maulik C. Pandya", designation: "Asst. Professor", dept: "Electrical", cabin: "UPDATING SOON...", email: "mcpandya_ee@ldrp.ac.in", linkedin: "#", image: "images/faculty/beee_2.jpg" },
    { id: 303, subject_id: 3, name: "DR.Mihirkumar C.Rathod", designation: "Asst. Professor", dept: "Electrical", cabin: "UPDATING SOON...", email: "mihirrathod_ee@ldrp.ac.in", linkedin: "#", image: "images/faculty/beee_3.jpg" },
    { id: 304, subject_id: 3, name: "DR.Rakesh.P.Sukhadiya", designation: "Asst. Professor", dept: "Electrical", cabin: "UPDATING SOON...", email: "rpsukhadia_ee@ldrp.ac.in", linkedin: "#", image: "images/faculty/beee_4.jpg" },
    { id: 305, subject_id: 3, name: "MR.Ashish N.Patel", designation: "Asst. Professor", dept: "Electrical", cabin: "UPDATING SOON...", email: "ashish_ee@ldrp.ac.in", linkedin: "#", image: "images/faculty/beee_5.jpg" },

    // --- ID 4: EPHY (Physics) - 3 Faculty ---
    { id: 401, subject_id: 4, name: "MR. Jitendra Patel", designation: "Asst. Professor", dept: "Science & Humanities", cabin: "Shift 1,First floor,CF SR 6", email: "jinendra_sh@ldrp.ac.in", linkedin: "#", image: "images/faculty/ephy_1.jpg" },
    { id: 402, subject_id: 4, name: "Prof. Tanvirbanu A. Malik", designation: "Asst. Professor", dept: "Science & Humanities", cabin: "Shift 1,First floor,Opp. of CF-SR 4", email: "tanvirbanu_sh@ldrp.ac.in", linkedin: "#", image: "images/faculty/ephy_2.jpg" },
    { id: 403, subject_id: 4, name: "DR. Manjul Kumar", designation: "Asst. Professor", dept: "Science & Humanities", cabin: "Shift 1,First floor,CF SR 6", email: "manjul_sh@ldrp.ac.in", linkedin: "#", image: "images/faculty/ephy_3.jpg" },

    // --- ID 5: BME (Mechanical) - 10 Faculty ---
    { id: 501, subject_id: 5, name: "Dr. Amit Pandey", designation: "Asst. Professor", dept: "Mechanical", cabin: "UPDATING SOON...", email: "amit_me@ldrp.ac.in", linkedin: "#", image: "images/faculty/bme_1.jpg" },
    { id: 502, subject_id: 5, name: "MRS. Pragna R Patel", designation: "Asst. Professor", dept: "Mechanical", cabin: "UPDATING SOON...", email: "pragna_me@ldrp.ac.in", linkedin: "#", image: "images/faculty/bme_2.jpg" },
    { id: 503, subject_id: 5, name: "DR. Alkesh M. Mavani", designation: "Asst. Professor", dept: "Mechanical", cabin: "UPDATING SOON...", email: "alkesh_me@ldrp.ac.in", linkedin: "#", image: "images/faculty/bme_3.jpg" },
    { id: 504, subject_id: 5, name: "MR. Hemal J Patel", designation: "Asst. Professor", dept: "Mechanical", cabin: "UPDATING SOON...", email: "hemal_me@ldrp.ac.in", linkedin: "#", image: "images/faculty/bme_4.jpg" },
    { id: 505, subject_id: 5, name: "DR. Krunal B Patel", designation: "Asst. Professor", dept: "Mechanical", cabin: "UPDATING SOON...", email: "krunal_me@ldrp.ac.in", linkedin: "#", image: "images/faculty/bme_5.jpg" },
    { id: 506, subject_id: 5, name: "DR. Jaimin R Patel", designation: "Asst. Professor", dept: "Mechanical", cabin: "UPDATING SOON...", email: "jaimin_me@ldrp.ac.in", linkedin: "#", image: "images/faculty/bme_6.jpg" },
    { id: 507, subject_id: 5, name: "DR. Ankit A Darji", designation: "Asst. Professor", dept: "Mechanical", cabin: "UPDATING SOON...", email: "ankit_me@ldrp.ac.in", linkedin: "#", image: "images/faculty/bme_7.jpg" },
    { id: 508, subject_id: 5, name: "MR. Neel Joshi", designation: "Asst. Professor", dept: "Mechanical", cabin: "UPDATING SOON...", email: "neel_me@ldrp.ac.in", linkedin: "#", image: "images/faculty/bme_8.jpg" },

    // --- ID 6: BCPS (Humanities) - 2 Faculty ---
    { id: 601, subject_id: 6, name: "DR. Sandhya Vyas", designation: "Asst. Professor", dept: "Humanities", cabin: "UPDATING SOON...", email: "UPDATING SOON...", linkedin: "https://www.linkedin.com/in/dr-sandhya-vyas-a75024174/?originalSubdomain=in", image: "images/faculty/bcps_1.jpg" },
    { id: 602, subject_id: 6, name: "DR. Amee Brahmbhatt", designation: "Asst. Professor", dept: "Humanities", cabin: "UPDATING SOON...", email: "UPDATING SOON...", linkedin: "#", image: "images/faculty/bcps_2.jpg" },

    // --- ID 7: SPORTS - 2 Faculty ---
    { id: 701, subject_id: 7, name: "Lt. Bhavik Pandya", designation: "Asso. NCC Officer", dept: "Sports", cabin: "Shift 2,Ground Floor,AG-SR 2", email: "UPDATING SOON...", linkedin: "https://www.linkedin.com/in/bhavik-pandya-9725531b2/?originalSubdomain=in", image: "images/faculty/sports_1.jpg" },
    { id: 702, subject_id: 7, name: "MR. Ashish", designation: "Sports Co-ordinator", dept: "Sports", cabin: "Shift 2,Ground Floor,AG-SR 2", email: "UPDATING SOON...", linkedin: "#", image: "images/faculty/sports_2.jpg" }
];

// Niche wali line ko update krke 'faculty' add kr dena
module.exports = { subjects, textbooks, notes, imp_topics, practicals, assignments, pyqs, faculty };

// Force update v10 - Final Fixs
