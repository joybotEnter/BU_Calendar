const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const events = [
  { title: 'Seminar-workshop on the Use of Canvas for Freshmen and Transferee', department: 'CITE', venue: 'ITB 302', date: '2025-08-04' },
  { title: 'OJT Orientation and Meeting with Parents / OJT Send off Program', department: 'CITE', venue: 'Smart Lab', date: '2025-08-09' },
  { title: 'CITE Orientation Program for Freshmen and Transferees and Bequethal Ceremony for SSITE Officers SY 2025-2026', department: 'CITE', venue: 'ITB 304', date: '2025-08-12' },
  { title: 'Seminar on the Responsible Use of AI in Information Technology and Computing Education', department: 'CITE', venue: 'TBA', date: '2025-08-20' },
  { title: 'Selection of Best Thesis and Capstone Project SY 2024-2025 Paper and Poster Presentation', department: 'CITE', venue: 'Smart Lab', date: '2025-08-30' },
  { title: 'Research Seminar-Workshop for Third Year CITE Students', department: 'CITE', venue: 'ITB 303', date: '2025-09-04' },
  { title: 'CITE Faculty, Accreditation and Academic Linkages Meeting for Level IV PACUCOA Accreditation of BSCS and BSIT Program', department: 'CITE', venue: 'CITE Office', date: '2025-09-11' },
  { title: 'Lecture Series 1: Emerging Trends in Animation and Game Development', department: 'CITE', venue: 'ITB 201', date: '2025-09-13' },
  { title: 'Team Building and Program Planning SSITE', department: 'CITE', venue: 'TBA', date: '2025-09-18' },
  { title: 'CITE General Assembly and Data Privacy Awareness Seminar', department: 'CITE', venue: 'Gym', date: '2025-09-24' },
  { title: 'CITE Educational Industry Visit', department: 'CITE', venue: 'TBA', date: '2025-10-17' },
  { title: 'GEd 10 Course MOS Certification', department: 'CITE', venue: 'Comp Lab', date: '2025-10-20' },
  { title: 'GEd 10 Course MOS Certification', department: 'CITE', venue: 'Comp Lab', date: '2025-10-21' },
  { title: 'GEd 10 Course MOS Certification', department: 'CITE', venue: 'Comp Lab', date: '2025-10-22' },
  { title: 'GEd 10 Course MOS Certification', department: 'CITE', venue: 'Comp Lab', date: '2025-10-23' },
  { title: 'GEd 10 Course MOS Certification', department: 'CITE', venue: 'Comp Lab', date: '2025-10-24' },
  { title: 'GEd 10 Course MOS Certification', department: 'CITE', venue: 'Comp Lab', date: '2025-10-25' },
  { title: 'Capstone Project and Computing Thesis Title Defense', department: 'CITE', venue: 'ITB 304', date: '2025-10-23' },
  { title: 'CITE Faculty Meeting', department: 'CITE', venue: 'TBA', date: '2025-10-24' },
  { title: 'Capstone Project and Computing Thesis Title Defense', department: 'CITE', venue: 'ITB 304', date: '2025-10-27' },
  { title: 'CITE Benchmarking Activity for Curriculum Development and Research', department: 'CITE', venue: 'TBA', date: '2025-11-12' },
  { title: 'CITE Faculty Meeting and Distribution of Teaching Load', department: 'CITE', venue: 'TBA', date: '2025-11-17' },
  { title: 'CITE Human and Spiritual Enhancement Program', department: 'CITE', venue: 'TBA', date: '2025-11-15' },
  { title: 'CITE E-trams / E-Sports', department: 'CITE', venue: 'ITB 303', date: '2025-11-24' },
  { title: 'CITE E-trams / E-Sports', department: 'CITE', venue: 'ITB 303', date: '2025-11-25' },
  { title: 'Lecture Series 2: Cybersecurity', department: 'CITE', venue: 'ITB 303', date: '2025-11-28' },
  { title: 'CITE Alumni Home Coming', department: 'CITE', venue: 'TBA', date: '2025-12-13' },
  { title: 'SSITE Christmas Gift Giving', department: 'CITE', venue: 'TBA', date: '2025-12-19' },
  { title: 'CITE Christmas Party', department: 'CITE', venue: 'BU Gym', date: '2025-12-20' },
  { title: 'CITE Faculty and Staff Preparation / Orientation Meeting for the BSCS and BSIT PACUCOA Level IV Accreditation Visit', department: 'CITE', venue: 'Smart Lab', date: '2026-01-08' },
  { title: 'Day 1 Computer Literacy Training for SDO Baliwag City ALS', department: 'CITE', venue: 'IT Bldg', date: '2026-01-24' },
  { title: 'Day 2 Computer Literacy Training for SDO Baliwag City ALS', department: 'CITE', venue: 'IT Bldg', date: '2026-01-31' },
  { title: 'Day 2 Computer Literacy Training for SDO Baliwag City ALS', department: 'CITE', venue: 'IT Bldg', date: '2026-02-07' },
  { title: 'Culminating Activity of Computer Literacy Training for SDO Baliwag City ALS', department: 'CITE', venue: 'Bahay na Bato', date: '2026-02-14' },
  { title: 'IT Conference for Public and Private SHS Leaders', department: 'CITE', venue: 'IT Bldg', date: '2026-02-20' },
  { title: 'MOS Certification for GED10 Courses', department: 'CITE', venue: 'ITB', date: '2026-03-02' },
  { title: 'MOS Certification for GED10 Courses', department: 'CITE', venue: 'ITB', date: '2026-03-07' },
  { title: 'Capstone Project and Computing Thesis Defense', department: 'CITE', venue: 'ITB 304', date: '2026-03-12' },
  { title: 'Capstone Project and Computing Thesis Defense', department: 'CITE', venue: 'ITB 304', date: '2026-03-13' },
  { title: 'CITE Faculty Immersion Program', department: 'CITE', venue: 'TBA', date: '2026-03-28' },
  { title: 'CITE Faculty Meeting and Distribution of Teaching Load', department: 'CITE', venue: 'CITE Office', date: '2026-03-30' },
  { title: 'Meeting with Accreditation and Academic Linkages Director in Preparation for Accreditation Visit', department: 'CITE', venue: 'TBA', date: '2026-04-02' },
  { title: 'Participation in International Research Conference in IT Education', department: 'CITE', venue: 'TBA', date: '2026-04-10' },
  { title: 'CITE Advisory Board Meeting', department: 'CITE', venue: 'CITE Office', date: '2026-04-18' },
  { title: 'CITE Conference', department: 'CITE', venue: 'TBA', date: '2026-04-23' },
  { title: 'Organization Day', department: 'CITE', venue: 'Gym', date: '2026-04-29' },
  { title: 'PSITE GA', department: 'CITE', venue: 'TBA', date: '2026-05-02' },
  { title: 'Lecture Series 3', department: 'CITE', venue: 'TBA', date: '2026-05-04' },
  { title: 'CISCO and IoT Seminar Day', department: 'CITE', venue: 'TBA', date: '2026-05-14' },
  { title: 'MOS Certification for GED10 Courses', department: 'CITE', venue: 'Comp Lab', date: '2026-06-22' },
  { title: 'MOS Certification for GED10 Courses', department: 'CITE', venue: 'Comp Lab', date: '2026-06-27' },
  { title: 'Lecture Series 4', department: 'CITE', venue: 'TBA', date: '2026-06-25' },
  { title: 'Capstone Project and Thesis Final Defense', department: 'CITE', venue: 'Smart Lab', date: '2026-07-01' },
  { title: 'Capstone Project and Thesis Final Defense', department: 'CITE', venue: 'Smart Lab', date: '2026-07-02' },
  { title: 'Blockchain Conference', department: 'CITE', venue: 'TBA', date: '2026-07-18' }
];

async function seed() {
  const batch = db.batch();
  const collectionRef = db.collection('events');

  events.forEach(ev => {
    const docRef = collectionRef.doc();
    batch.set(docRef, {
      ...ev,
      createdAt: Date.now()
    });
  });

  await batch.commit();
  console.log(`Seeded ${events.length} events successfully.`);
}

seed().catch(err => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});