// Standard Reference Data & Mock Initial State for TumbuhHarmoni

export const initialChildren = [
  {
    id: "child-1",
    name: "Rayyan Al-Fatih",
    nickname: "Rayyan",
    gender: "male", // 'male' | 'female'
    birthDate: "2025-07-15",
    birthWeight: 3.2, // kg
    birthHeight: 49.0, // cm
    bloodType: "O+",
    allergies: "Tidak ada",
    notes: "Anak pertama, sangat aktif bereksplorasi.",
    avatar: "👦",
    growthHistory: [
      { date: "2025-07-15", ageMonths: 0, weight: 3.2, height: 49.0, headCirc: 34.5, note: "Lahir di RS Bunda" },
      { date: "2025-09-15", ageMonths: 2, weight: 5.4, height: 57.2, headCirc: 38.0, note: "Posyandu Melati - Imunisasi DPT 1" },
      { date: "2025-11-15", ageMonths: 4, weight: 6.8, height: 63.5, headCirc: 40.5, note: "Posyandu Melati - Imunisasi DPT 2" },
      { date: "2026-01-15", ageMonths: 6, weight: 7.9, height: 67.0, headCirc: 42.5, note: "Mulai MPASI homemade" },
      { date: "2026-04-15", ageMonths: 9, weight: 8.8, height: 71.5, headCirc: 44.0, note: "Bisa merangkak cepat" },
      { date: "2026-07-15", ageMonths: 12, weight: 9.6, height: 75.8, headCirc: 45.5, note: "Ulang tahun ke-1, berdiri mandiri" },
      { date: "2026-09-15", ageMonths: 14, weight: 10.1, height: 78.5, headCirc: 46.2, note: "Mulai jalan lancar & panggil 'Mama/Papa'" }
    ],
    completedMilestones: ["m-01", "m-02", "m-03", "m-04", "m-05", "m-06", "m-07", "m-08", "m-09", "m-10", "m-11", "m-12", "m-13", "m-14"],
    completedVaccines: ["v-hb0", "v-bcg", "v-polio1", "v-dpt1", "v-polio2", "v-pcv1", "v-dpt2", "v-polio3", "v-pcv2", "v-dpt3", "v-polio4", "v-ipv", "v-mr"]
  },
  {
    id: "child-2",
    name: "Aisyah Humaira",
    nickname: "Aisyah",
    gender: "female",
    birthDate: "2026-05-10",
    birthWeight: 3.0,
    birthHeight: 48.0,
    bloodType: "A+",
    allergies: "Sensitif susu sapi",
    notes: "Adik Rayyan, bayi usia 4 bulan.",
    avatar: "👧",
    growthHistory: [
      { date: "2026-05-10", ageMonths: 0, weight: 3.0, height: 48.0, headCirc: 34.0, note: "Lahir normal" },
      { date: "2026-07-10", ageMonths: 2, weight: 4.8, height: 56.0, headCirc: 37.5, note: "Imunisasi 2 bulan" },
      { date: "2026-09-10", ageMonths: 4, weight: 6.2, height: 62.0, headCirc: 40.0, note: "Bisa miring & tersenyum sosial" }
    ],
    completedMilestones: ["m-01", "m-02", "m-03", "m-04"],
    completedVaccines: ["v-hb0", "v-bcg", "v-polio1", "v-dpt1", "v-polio2"]
  }
];

// WHO Growth Standards (Simplified Medians, -2SD, +2SD for Boys & Girls 0-24 mo)
export const whoGrowthStandards = {
  male: {
    weight: [
      { age: 0, sdNeg2: 2.5, median: 3.3, sdPos2: 4.4 },
      { age: 2, sdNeg2: 4.3, median: 5.6, sdPos2: 7.1 },
      { age: 4, sdNeg2: 5.6, median: 7.0, sdPos2: 8.7 },
      { age: 6, sdNeg2: 6.4, median: 7.9, sdPos2: 9.8 },
      { age: 9, sdNeg2: 7.1, median: 8.9, sdPos2: 11.0 },
      { age: 12, sdNeg2: 7.7, median: 9.6, sdPos2: 12.0 },
      { age: 15, sdNeg2: 8.3, median: 10.3, sdPos2: 12.8 },
      { age: 18, sdNeg2: 8.8, median: 10.9, sdPos2: 13.7 },
      { age: 24, sdNeg2: 9.7, median: 12.2, sdPos2: 15.3 },
      { age: 36, sdNeg2: 11.3, median: 14.3, sdPos2: 18.3 },
      { age: 48, sdNeg2: 12.7, median: 16.3, sdPos2: 21.2 },
      { age: 60, sdNeg2: 14.1, median: 18.3, sdPos2: 24.2 }
    ],
    height: [
      { age: 0, sdNeg2: 46.1, median: 49.9, sdPos2: 53.7 },
      { age: 2, sdNeg2: 54.4, median: 58.4, sdPos2: 62.4 },
      { age: 4, sdNeg2: 60.0, median: 63.9, sdPos2: 67.8 },
      { age: 6, sdNeg2: 63.6, median: 67.6, sdPos2: 71.6 },
      { age: 9, sdNeg2: 67.5, median: 72.0, sdPos2: 76.5 },
      { age: 12, sdNeg2: 71.0, median: 75.7, sdPos2: 80.5 },
      { age: 15, sdNeg2: 74.1, median: 79.1, sdPos2: 84.2 },
      { age: 18, sdNeg2: 76.9, median: 82.3, sdPos2: 87.7 },
      { age: 24, sdNeg2: 81.7, median: 87.8, sdPos2: 93.9 },
      { age: 36, sdNeg2: 88.7, median: 96.1, sdPos2: 103.5 },
      { age: 48, sdNeg2: 94.9, median: 103.3, sdPos2: 111.7 },
      { age: 60, sdNeg2: 100.7, median: 110.0, sdPos2: 119.2 }
    ]
  },
  female: {
    weight: [
      { age: 0, sdNeg2: 2.4, median: 3.2, sdPos2: 4.2 },
      { age: 2, sdNeg2: 3.9, median: 5.1, sdPos2: 6.6 },
      { age: 4, sdNeg2: 5.0, median: 6.4, sdPos2: 8.2 },
      { age: 6, sdNeg2: 5.7, median: 7.3, sdPos2: 9.3 },
      { age: 9, sdNeg2: 6.5, median: 8.2, sdPos2: 10.5 },
      { age: 12, sdNeg2: 7.0, median: 8.9, sdPos2: 11.5 },
      { age: 15, sdNeg2: 7.6, median: 9.6, sdPos2: 12.4 },
      { age: 18, sdNeg2: 8.1, median: 10.2, sdPos2: 13.2 },
      { age: 24, sdNeg2: 9.0, median: 11.5, sdPos2: 14.8 },
      { age: 36, sdNeg2: 10.8, median: 13.9, sdPos2: 18.1 },
      { age: 48, sdNeg2: 12.3, median: 16.1, sdPos2: 21.5 },
      { age: 60, sdNeg2: 13.7, median: 18.2, sdPos2: 24.9 }
    ],
    height: [
      { age: 0, sdNeg2: 45.4, median: 49.1, sdPos2: 52.9 },
      { age: 2, sdNeg2: 53.0, median: 57.1, sdPos2: 61.1 },
      { age: 4, sdNeg2: 58.4, median: 62.1, sdPos2: 65.9 },
      { age: 6, sdNeg2: 61.2, median: 65.7, sdPos2: 69.8 },
      { age: 9, sdNeg2: 65.3, median: 70.1, sdPos2: 74.7 },
      { age: 12, sdNeg2: 68.9, median: 74.0, sdPos2: 79.2 },
      { age: 15, sdNeg2: 72.0, median: 77.5, sdPos2: 83.0 },
      { age: 18, sdNeg2: 74.9, median: 80.7, sdPos2: 86.5 },
      { age: 24, sdNeg2: 80.0, median: 86.4, sdPos2: 92.9 },
      { age: 36, sdNeg2: 87.4, median: 95.1, sdPos2: 102.7 },
      { age: 48, sdNeg2: 94.1, median: 102.7, sdPos2: 111.3 },
      { age: 60, sdNeg2: 99.9, median: 109.4, sdPos2: 118.9 }
    ]
  }
};

// KPSP (Kuesioner Pra-Skrining Perkembangan) Milestone Checklist (0-60 mo)
export const milestoneDatabase = [
  {
    id: "m-01",
    category: "motorik_kasar",
    categoryLabel: "Motorik Kasar",
    minAge: 0,
    maxAge: 3,
    title: "Mengangkat kepala saat tengkurap",
    description: "Saat ditengkurapkan pada bidang datar, bayi dapat mengangkat kepalanya setinggi 45 derajat beberapa saat.",
    tips: "Sering lakukan Tummy Time selama 2-5 menit beberapa kali sehari saat bayi terjaga."
  },
  {
    id: "m-02",
    category: "sosial_emosional",
    categoryLabel: "Sosial & Emosional",
    minAge: 0,
    maxAge: 3,
    title: "Tersenyum spontan / sosial",
    description: "Bayi membalas senyuman ketika diajak bicara atau melihat wajah tersenyum orang tua.",
    tips: "Ajak bicara dengan tatapan mata hangat dan ekspresi wajah gembira."
  },
  {
    id: "m-03",
    category: "bahasa",
    categoryLabel: "Bahasa & Komunikasi",
    minAge: 0,
    maxAge: 3,
    title: "Mengeluarkan suara mengoceh (Cooing)",
    description: "Mengeluarkan suara vokal lembut seperti 'ooh', 'aah' saat diajak bercanda.",
    tips: "Tirukan kembali suara ocehan bayi untuk merangsang komunikasi timbal balik."
  },
  {
    id: "m-04",
    category: "motorik_halus",
    categoryLabel: "Motorik Halus",
    minAge: 0,
    maxAge: 3,
    title: "Menggenggam mainan kerincingan",
    description: "Dapat menggenggam mainan yang diletakkan di telapak tangannya selama beberapa detik.",
    tips: "Berikan mainan gantung berwarna kontras yang aman digenggam."
  },
  {
    id: "m-05",
    category: "motorik_kasar",
    categoryLabel: "Motorik Kasar",
    minAge: 4,
    maxAge: 6,
    title: "Tengkurap dan berguling mandiri",
    description: "Mampu membalikkan badan dari telentang ke tengkurap atau sebaliknya tanpa bantuan.",
    tips: "Beri ruang gerak di atas matras bermain yang aman tanpa bantal penghalang."
  },
  {
    id: "m-06",
    category: "motorik_halus",
    categoryLabel: "Motorik Halus",
    minAge: 4,
    maxAge: 6,
    title: "Meraih benda dengan kedua tangan",
    description: "Mampu mengulurkan kedua tangan untuk meraih benda atau mainan di dekatnya.",
    tips: "Sodorkan mainan lembut berjarak 20-30 cm di depan dada anak."
  },
  {
    id: "m-07",
    category: "motorik_kasar",
    categoryLabel: "Motorik Kasar",
    minAge: 7,
    maxAge: 9,
    title: "Duduk stabil tanpa topangan",
    description: "Dapat duduk sendiri di lantai selama minimal 60 detik tanpa jatuh ke samping.",
    tips: "Latih duduk dengan menaruh mainan di lantai di antara kedua kakinya."
  },
  {
    id: "m-08",
    category: "bahasa",
    categoryLabel: "Bahasa & Komunikasi",
    minAge: 7,
    maxAge: 9,
    title: "Mengulang suku kata ganda (Babbling)",
    description: "Mengucapkan suku kata seperti 'ba-ba', 'ma-ma', 'da-da' tanpa makna spesifik.",
    tips: "Sebutkan nama benda di sekitar secara berulang dengan artikulasi jelas."
  },
  {
    id: "m-09",
    category: "sosial_emosional",
    categoryLabel: "Sosial & Emosional",
    minAge: 7,
    maxAge: 9,
    title: "Bermain cilukba & melambai dada",
    description: "Menunjukkan rasa senang saat bermain cilukba dan mulai meniru lambaian tangan 'dadah'.",
    tips: "Ajak interaksi bermain sembunyi muka dengan kain transparan atau tangan."
  },
  {
    id: "m-10",
    category: "motorik_kasar",
    categoryLabel: "Motorik Kasar",
    minAge: 10,
    maxAge: 12,
    title: "Berdiri mandiri & melangkah dititah",
    description: "Mampu berdiri berpegangan pada perabot dan mulai melangkah perlahan saat dituntun.",
    tips: "Sediakan area rambatan (cruising) yang kokoh dan bebas dari sudut tajam."
  },
  {
    id: "m-11",
    category: "motorik_halus",
    categoryLabel: "Motorik Halus",
    minAge: 10,
    maxAge: 12,
    title: "Pincer Grasp (Menjumput benda kecil)",
    description: "Dapat mengambil potongan biskuit/makanan kecil menggunakan ujung ibu jari dan telunjuk.",
    tips: "Sajikan finger food berukuran aman untuk melatih motorik jemari."
  },
  {
    id: "m-12",
    category: "bahasa",
    categoryLabel: "Bahasa & Komunikasi",
    minAge: 10,
    maxAge: 12,
    title: "Mengucapkan kata pertama yang bermakna",
    description: "Memanggil 'Mama' atau 'Papa' secara spesifik pada orang yang tepat.",
    tips: "Respon kata anak dengan kalimat pendek positif, misal: 'Iya sayang, ini Papa'."
  },
  {
    id: "m-13",
    category: "motorik_kasar",
    categoryLabel: "Motorik Kasar",
    minAge: 13,
    maxAge: 18,
    title: "Berjalan mandiri tanpa jatuh",
    description: "Mampu berjalan beberapa langkah melintasi ruangan secara mandiri dan percaya diri.",
    tips: "Biarkan anak bertelanjang kaki di dalam rumah untuk menguatkan lengkung telapak kaki."
  },
  {
    id: "m-14",
    category: "sosial_emosional",
    categoryLabel: "Sosial & Emosional",
    minAge: 13,
    maxAge: 18,
    title: "Minum dari cangkir & menunjuk keinginan",
    description: "Mampu memegang gelas sendiri untuk minum dan menunjuk benda yang diinginkannya.",
    tips: "Latih kemandirian dengan memberi cangkir kecil dengan pegangan ganda."
  },
  {
    id: "m-15",
    category: "motorik_halus",
    categoryLabel: "Motorik Halus",
    minAge: 19,
    maxAge: 24,
    title: "Menumpuk 4-6 balok kayu",
    description: "Mampu menyusun menara dari beberapa balok tanpa roboh.",
    tips: "Bermain susun balok atau wadah plastik bertingkat bersama anak."
  },
  {
    id: "m-16",
    category: "bahasa",
    categoryLabel: "Bahasa & Komunikasi",
    minAge: 19,
    maxAge: 24,
    title: "Menyusun kalimat 2 kata",
    description: "Mampu menggabungkan 2 kata seperti 'mau susu', 'mama mana', atau 'minta roti'.",
    tips: "Bacakan buku cerita bergambar setiap sebelum tidur dan ajak anak menunjuk gambar."
  },
  {
    id: "m-17",
    category: "motorik_kasar",
    categoryLabel: "Motorik Kasar",
    minAge: 25,
    maxAge: 36,
    title: "Melompat dengan kedua kaki",
    description: "Mampu melompat ke atas dengan kedua kaki terangkat dari lantai secara bersamaan.",
    tips: "Bermain engklek sederhana atau meniru kelinci melompat di karpet lembut."
  },
  {
    id: "m-18",
    category: "sosial_emosional",
    categoryLabel: "Sosial & Emosional",
    minAge: 37,
    maxAge: 60,
    title: "Bermain peran interaktif & berbagi",
    description: "Bermain pura-pura (dokter-dokteran, masak-masakan) bersama teman sebaya dan mau berbagi giliran.",
    tips: "Dukung sosialisasi di taman bermain atau PAUD/Posyandu secara teratur."
  }
];

// IDAI & Kemenkes Vaccine Schedule Reference
export const vaccineSchedule = [
  {
    id: "v-hb0",
    name: "Hepatitis B-0",
    targetAge: "0 Bulan (< 24 Jam)",
    category: "Wajib Nasional",
    description: "Mencegah penularan virus Hepatitis B dari ibu ke bayi saat proses persalinan."
  },
  {
    id: "v-bcg",
    name: "BCG",
    targetAge: "1 Bulan",
    category: "Wajib Nasional",
    description: "Melindungi bayi dari penyakit Tuberkulosis (TBC) berat seperti meningitis TB."
  },
  {
    id: "v-polio1",
    name: "Polio Tetes (OPV 1)",
    targetAge: "1 Bulan",
    category: "Wajib Nasional",
    description: "Mencegah kelumpuhan layu akibat infeksi virus Polio."
  },
  {
    id: "v-dpt1",
    name: "DPT-HB-Hib 1",
    targetAge: "2 Bulan",
    category: "Wajib Nasional",
    description: "Mencegah Difteri, Pertusis (batuk rejan), Tetanus, Hepatitis B, dan Pneumonia Hib."
  },
  {
    id: "v-polio2",
    name: "Polio Tetes (OPV 2)",
    targetAge: "2 Bulan",
    category: "Wajib Nasional",
    description: "Dosis lanjutan kekebalan usus terhadap Polio."
  },
  {
    id: "v-pcv1",
    name: "PCV 1 (Pneumokokus)",
    targetAge: "2 Bulan",
    category: "Program Nasional",
    description: "Mencegah radang paru (pneumonia) dan radang selaput otak akibat bakteri Streptococcus pneumoniae."
  },
  {
    id: "v-rv1",
    name: "Rotavirus 1",
    targetAge: "2 Bulan",
    category: "Program Nasional",
    description: "Mencegah diare cair akut dan dehidrasi berat akibat rotavirus."
  },
  {
    id: "v-dpt2",
    name: "DPT-HB-Hib 2",
    targetAge: "3 Bulan",
    category: "Wajib Nasional",
    description: "Dosis kedua perlindungan 5 penyakit bakteri & virus berbahaya."
  },
  {
    id: "v-polio3",
    name: "Polio Tetes (OPV 3)",
    targetAge: "3 Bulan",
    category: "Wajib Nasional",
    description: "Dosis ketiga penguatan antibodi polio."
  },
  {
    id: "v-pcv2",
    name: "PCV 2",
    targetAge: "3 Bulan",
    category: "Program Nasional",
    description: "Dosis kedua proteksi infeksi pneumokokus."
  },
  {
    id: "v-dpt3",
    name: "DPT-HB-Hib 3",
    targetAge: "4 Bulan",
    category: "Wajib Nasional",
    description: "Dosis ketiga kelengkapan vaksinasi dasar DPT."
  },
  {
    id: "v-polio4",
    name: "Polio Tetes (OPV 4) + IPV 1",
    targetAge: "4 Bulan",
    category: "Wajib Nasional",
    description: "Kombinasi Polio tetes dan Polio suntik (IPV) untuk kekebalan maksimal."
  },
  {
    id: "v-mr",
    name: "Campak-Rubella (MR)",
    targetAge: "9 Bulan",
    category: "Wajib Nasional",
    description: "Mencegah infeksi campak (morbili) yang dapat berakibat pneumonia serta sindrom rubella bawaan."
  },
  {
    id: "v-je",
    name: "Japanese Encephalitis (JE)",
    targetAge: "10 Bulan",
    category: "Endemis / Anjuran",
    description: "Mencegah radang otak akibat virus JE yang ditularkan nyamuk Culex di area tertentu."
  },
  {
    id: "v-pcv3",
    name: "PCV 3 (Booster)",
    targetAge: "12 Bulan",
    category: "Program Nasional",
    description: "Dosis penguat (booster) PCV untuk perlindungan jangka panjang."
  },
  {
    id: "v-dpt-booster",
    name: "DPT-HB-Hib Booster",
    targetAge: "18 Bulan",
    category: "Wajib Lanjutan",
    description: "Vaksin lanjutan balita usia 18 bulan untuk memperpanjang daya tahan tubuh."
  },
  {
    id: "v-mr-booster",
    name: "MR Booster",
    targetAge: "18 Bulan",
    category: "Wajib Lanjutan",
    description: "Vaksin penguat campak rubella usia 18 bulan."
  }
];

// Edinburgh Postnatal Depression Scale (EPDS) - 10 Validated Questions
export const epdsQuestions = [
  {
    id: 1,
    question: "Dalam 7 hari terakhir, saya mampu tertawa dan melihat sisi lucu dari berbagai hal:",
    options: [
      { text: "Sebanyak yang biasanya saya lakukan", score: 0 },
      { text: "Tidak sebanyak biasanya", score: 1 },
      { text: "Jauh lebih sedikit dari biasanya", score: 2 },
      { text: "Sama sekali tidak bisa", score: 3 }
    ]
  },
  {
    id: 2,
    question: "Saya menantikan masa depan dengan rasa senang dan antusias:",
    options: [
      { text: "Sebesar yang selalu saya rasakan", score: 0 },
      { text: "Agak berkurang dari biasanya", score: 1 },
      { text: "Pasti jauh berkurang dari biasanya", score: 2 },
      { text: "Hampir tidak ada sama sekali", score: 3 }
    ]
  },
  {
    id: 3,
    question: "Saya menyalahkan diri saya sendiri tanpa alasan ketika ada hal yang berjalan tidak sesuai rencana:",
    options: [
      { text: "Ya, hampir sepanjang waktu", score: 3 },
      { text: "Ya, beberapa kali", score: 2 },
      { text: "Jarang sekali", score: 1 },
      { text: "Tidak, tidak pernah", score: 0 }
    ]
  },
  {
    id: 4,
    question: "Saya merasa cemas atau khawatir tanpa alasan yang jelas:",
    options: [
      { text: "Tidak, tidak sama sekali", score: 0 },
      { text: "Hampir tidak pernah", score: 1 },
      { text: "Ya, kadang-kadang", score: 2 },
      { text: "Ya, sangat sering", score: 3 }
    ]
  },
  {
    id: 5,
    question: "Saya merasa takut atau panik tanpa alasan yang kuat:",
    options: [
      { text: "Ya, cukup sering", score: 3 },
      { text: "Ya, kadang-kadang", score: 2 },
      { text: "Tidak, jarang sekali", score: 1 },
      { text: "Tidak, tidak sama sekali", score: 0 }
    ]
  },
  {
    id: 6,
    question: "Beban tugas dan tanggung jawab terasa terlalu menumpuk di pundak saya:",
    options: [
      { text: "Ya, hampir sepanjang waktu saya merasa kewalahan", score: 3 },
      { text: "Ya, kadang-kadang saya tidak dapat mengatasinya sebaik biasanya", score: 2 },
      { text: "Tidak, sebagian besar waktu saya mengatasinya dengan cukup baik", score: 1 },
      { text: "Tidak, saya mampu mengatasinya seperti biasa", score: 0 }
    ]
  },
  {
    id: 7,
    question: "Saya merasa sangat sedih atau tidak bahagia hingga mengalami kesulitan tidur:",
    options: [
      { text: "Ya, hampir sepanjang waktu", score: 3 },
      { text: "Ya, kadang-kadang", score: 2 },
      { text: "Tidak terlalu sering", score: 1 },
      { text: "Tidak, tidak sama sekali", score: 0 }
    ]
  },
  {
    id: 8,
    question: "Saya merasa sedih, murung, atau tertekan:",
    options: [
      { text: "Ya, hampir sepanjang waktu", score: 3 },
      { text: "Ya, cukup sering", score: 2 },
      { text: "Hanya sesekali", score: 1 },
      { text: "Tidak, tidak pernah", score: 0 }
    ]
  },
  {
    id: 9,
    question: "Saya merasa sangat tidak bahagia sampai-sampai saya menangis:",
    options: [
      { text: "Ya, hampir sepanjang waktu", score: 3 },
      { text: "Ya, cukup sering", score: 2 },
      { text: "Hanya sesekali", score: 1 },
      { text: "Tidak, tidak pernah", score: 0 }
    ]
  },
  {
    id: 10,
    question: "Pikiran untuk melukai diri sendiri pernah terlintas dalam benak saya:",
    options: [
      { text: "Ya, cukup sering (Harap segera hubungi bantuan medis/119)", score: 3 },
      { text: "Kadang-kadang terlintas", score: 2 },
      { text: "Hampir tidak pernah", score: 1 },
      { text: "Tidak pernah sama sekali", score: 0 }
    ]
  }
];

// Parental Burnout Assessment (PBA Simplified - 6 Key Indicators)
export const burnoutQuestions = [
  {
    id: "b-1",
    question: "Saya merasa terkuras secara fisik dan emosional oleh peran saya sebagai orang tua.",
    options: [
      { text: "Tidak pernah / Sangat Jarang", score: 0 },
      { text: "Kadang-kadang (1-2 kali sebulan)", score: 1 },
      { text: "Sering (1-3 kali seminggu)", score: 2 },
      { text: "Setiap hari / Terus-menerus", score: 3 }
    ]
  },
  {
    id: "b-2",
    question: "Saya merasa tidak lagi memiliki energi untuk menunjukkan kehangatan atau bermain bersama anak seperti dulu.",
    options: [
      { text: "Tidak pernah", score: 0 },
      { text: "Kadang-kadang", score: 1 },
      { text: "Sering", score: 2 },
      { text: "Hampir setiap hari", score: 3 }
    ]
  },
  {
    id: "b-3",
    question: "Saya merasa mengasuh anak saat ini hanya sekadar rutinitas otomatis tanpa rasa gembira.",
    options: [
      { text: "Tidak pernah", score: 0 },
      { text: "Kadang-kadang", score: 1 },
      { text: "Sering", score: 2 },
      { text: "Selalu terasa seperti beban berat", score: 3 }
    ]
  },
  {
    id: "b-4",
    question: "Saya merasa sangat mudah tersulut emosi, berteriak, atau frustrasi saat anak rewel/tantrum.",
    options: [
      { text: "Bisa mengontrol emosi dengan baik", score: 0 },
      { text: "Sesekali lepas kendali tapi cepat tenang", score: 1 },
      { text: "Cukup sering meledak-ledak", score: 2 },
      { text: "Sangat sering dan merasa bersalah mendalam setelahnya", score: 3 }
    ]
  },
  {
    id: "b-5",
    question: "Saya merasa sendirian dan kurang mendapat dukungan nyata dari pasangan atau keluarga dalam pengasuhan.",
    options: [
      { text: "Dukungan keluarga sangat baik", score: 0 },
      { text: "Cukup didukung meski kadang kurang", score: 1 },
      { text: "Merasa minim dukungan", score: 2 },
      { text: "Merasa sendirian menanggung semuanya", score: 3 }
    ]
  }
];

// Child Behavioral & Emotional Screener (PSC-17 / SDQ Simplified - 6 Questions)
export const childBehaviorQuestions = [
  {
    id: "cb-1",
    question: "Anak sering mengalami tantrum hebat, menjerit berlebihan, atau memukul saat keinginannya tidak terpenuhi:",
    options: [
      { text: "Jarang / Normal sesuai fase usia", score: 0 },
      { text: "Kadang-kadang (1-2 kali seminggu)", score: 1 },
      { text: "Sangat sering & sulit ditenangkan (>30 menit)", score: 2 }
    ]
  },
  {
    id: "cb-2",
    question: "Anak tampak sangat cemas berlebihan saat berpisah sebentar dengan orang tua (Separation Anxiety ekstrem):",
    options: [
      { text: "Wajar dan cepat tenang setelah beberapa menit", score: 0 },
      { text: "Menangis cukup lama", score: 1 },
      { text: "Histeris berkepanjangan dan menolak siapapun", score: 2 }
    ]
  },
  {
    id: "cb-3",
    question: "Anak menunjukkan kontak mata yang baik dan merespon saat namanya dipanggil:",
    options: [
      { text: "Ya, selalu merespon dan menatap mata", score: 0 },
      { text: "Kadang perlu dipanggil berulang kali", score: 1 },
      { text: "Jarang merespon dan menghindari kontak mata", score: 2 }
    ]
  },
  {
    id: "cb-4",
    question: "Anak mengalami kesulitan makan ekstrem (GTM menolak semua tekstur) atau gangguan tidur kronis:",
    options: [
      { text: "Makan & tidur dalam batas normal", score: 0 },
      { text: "Kadang GTM saat tumbuh gigi / sakit", score: 1 },
      { text: "Menolak makan terus-menerus dan berat badan turun", score: 2 }
    ]
  }
];

// Emergency & SOS Helplines Indonesia
export const sosHelplines = [
  {
    name: "Layanan SEJIWA - Kemenkes RI",
    number: "119 ext 8",
    tel: "119",
    category: "Kesehatan Mental & Konseling Gratis 24/7",
    description: "Layanan konseling psikologis gratis dari Kementerian Kesehatan RI dan Himpunan Psikologi Indonesia (HIMPSI).",
    badge: "Prioritas Nasional 24 Jam",
    color: "emerald"
  },
  {
    name: "SAPA 129 - KemenPPPA",
    number: "129 / WhatsApp: 08111-129-129",
    tel: "129",
    category: "Perlindungan Perempuan & Anak",
    description: "Layanan sahabat perempuan dan anak untuk pengaduan kekerasan, penelantaran, atau krisis pengasuhan keluarga.",
    badge: "KemenPPPA",
    color: "indigo"
  },
  {
    name: "PUSPAGA (Pusat Pembelajaran Keluarga)",
    number: "0812-8888-8888",
    tel: "081288888888",
    category: "Konsultasi Parenting & Pengasuhan",
    description: "Layanan konsultasi keluarga gratis terdekat yang disediakan pemerintah daerah untuk pendampingan orang tua.",
    badge: "Parenting Support",
    color: "sky"
  },
  {
    name: "Ambulans Gawat Darurat Medis",
    number: "118 / 119",
    tel: "119",
    category: "Kedaruratan Medis Balita",
    description: "Panggilan darurat ambulans jika balita mengalami kejang demam (step), dehidrasi berat, sesak napas, atau trauma fisik.",
    badge: "Emergency Medis",
    color: "rose"
  }
];

// AI Simulated Parenting & Mental Health Guidance Scenarios
export const aiParentingKnowledge = [
  {
    keywords: ["tantrum", "ngamuk", "teriak", "nangis", "marah"],
    title: "Strategi 4-Langkah De-Eskalasi Tantrum Balita",
    reply: "Tantrum adalah cara alami otak emosi balita berkomunikasi saat belum mampu meregulasi rasa kecewa atau lelah.\n\n💡 **Langkah Praktis Mama/Papa:**\n1. **Tetap Tenang & Tarik Napas Dalam**: Jangan ikut berteriak karena emosi anak akan meniru kestabilan emosi Anda (Co-Regulation).\n2. **Amankan Lingkungan**: Pastikan area sekitar bebas benda tajam atau berbahaya.\n3. **Validasi Perasaan, Batasi Perilaku**: Katakan dengan suara lembut: *'Mama tahu kamu sedang kesal karena mainan harus disimpan. Boleh kesal, tapi tidak boleh memukul ya sayang.'*\n4. **Beri Pelukan Hangat saat Reda**: Tunggu hingga badai emosinya mereda, lalu tawarkan air minum atau pelukan."
  },
  {
    keywords: ["gtm", "makan", "gamau makan", "lepeh", "susah makan"],
    title: "Mengatasi GTM (Gerakan Tutup Mulut) & Sensitivitas Makan",
    reply: "GTM sering terjadi karena tumbuh gigi, bosan tekstur, atau rasa kenyang susu berlebih.\n\n💡 **Tips Mengatasi GTM:**\n1. **Terapkan Feeding Rules**: Jadwal makan teratur (3x makan utama, 2x selingan), durasi maksimal 30 menit tanpa distraksi gadget/TV.\n2. **Variasikan Finger Food & Tekstur**: Ajak anak memegang makanannya sendiri agar rasa penasaran sensoriknya terstimulasi.\n3. **Ciptakan Suasana Menyenangkan**: Makan bersama di meja makan keluarga, hindari memaksa atau menjejalkan makanan."
  },
  {
    keywords: ["burnout", "capek", "lelah", "stres", "sendirian", "menangis"],
    title: "Pertolongan Pertama untuk Mama/Papa yang Lelah Emosional",
    reply: "Peluk diri Anda. Menjadi orang tua adalah salah satu peran terberat di dunia, dan merasa lelah **bukan** berarti Anda orang tua yang gagal.\n\n🌿 **Langkah Pemulihan Cepat Hari Ini:**\n1. **Jeda 10 Menit (Time-Out Mandiri)**: Titipkan anak sejenak pada pasangan/keluarga, basuh muka dengan air dingin, atau minum secangkir teh hangat dalam hening.\n2. **Lepaskan Standar Kesempurnaan**: Rumah berantakan atau pesan makanan siap saji sesekali sama sekali tidak masalah.\n3. **Komunikasikan Kebutuhan dengan Pasangan**: Katakan dengan jujur: *'Aku butuh bantuan istirahat 30 menit sore ini'*. Anda berhak dirawat!"
  },
  {
    keywords: ["stunting", "berat badan", "tinggi badan", "gizi", "posyandu"],
    title: "Pencegahan Stunting & Optimasi Pertumbuhan Fisik",
    reply: "Stunting adalah kondisi gagal tumbuh akibat malnutrisi kronis atau infeksi berulang dalam 1000 Hari Pertama Kehidupan (HPK).\n\n🛡️ **Fokus Utama:**\n1. **Prioritaskan Protein Hewani Kaya Zat Besi**: Telur, hati ayam, ikan kembung, daging sapi setiap kali makan.\n2. **Pantau Garis Pertumbuhan Bulanan**: Pastikan berat badan naik mengikuti pita hijau (KMS) secara konsisten.\n3. **Jaga Higienitas & Sanitasi**: Air minum matang, cuci tangan dengan sabun untuk mencegah diare berulang."
  }
];
