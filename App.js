import React, { useMemo, useState } from "react";

// ALL SCHEMES
const schemes = {
  scholarship: [
    { name: "NSP Scholarship", income: 200000, benefit: "₹50,000/year", link: "https://scholarships.gov.in" },
    { name: "INSPIRE Scholarship", income: 500000, benefit: "₹80,000/year", link: "https://scholarships.gov.in" },
    { name: "Post Matric Scholarship", income: 250000, benefit: "₹30,000/year", link: "https://scholarships.gov.in" },
    { name: "Central Sector Scheme", income: 800000, benefit: "₹20,000/year", link: "https://scholarships.gov.in" }
  ],
  students: [
    { name: "National Scholarship Portal (NSP)", benefit: "Tuition + stipend", link: "https://scholarships.gov.in" },
    { name: "INSPIRE Scholarship", benefit: "₹80,000/year", link: "https://online-inspire.gov.in" },
    { name: "PM YASASVI Scholarship", benefit: "₹75,000–₹1,25,000", link: "https://yet.nta.ac.in" },
    { name: "AICTE Pragati Scholarship", benefit: "₹50,000/year", link: "https://www.aicte-india.org" },
    { name: "Post Matric Scholarship", benefit: "Tuition + maintenance", link: "https://scholarships.gov.in" }
  ],
  women: [
    { name: "Beti Bachao Beti Padhao", benefit: "Education & welfare support", link: "https://wcd.gov.in" },
    { name: "Mahila Shakti Kendra", benefit: "Skill training + guidance", link: "https://wcd.gov.in/schemes/mahila-shakti-kendra" },
    { name: "Ujjwala Yojana", benefit: "Free LPG connection", link: "https://www.pmujjwalayojana.com" },
    { name: "Stand Up India (Women)", benefit: "₹10L–₹1Cr loans", link: "https://www.standupmitra.in" },
    { name: "Working Women Hostel Scheme", benefit: "Safe & affordable housing", link: "https://wcd.gov.in" }
  ],
  job: [
    { name: "PMKVY 4.0", age: 35, benefit: "Free Skill Training", link: "https://www.msde.gov.in/offerings/schemes-and-services/details/pradhan-mantri-kaushal-vikas-yojana-4-0-pmkvy-4-0-2021-ITO3A" },
    { name: "Skill India", age: 40, benefit: "Job Training", link: "https://www.skillindia.gov.in" },
    { name: "NCS Portal", age: 45, benefit: "Government Jobs", link: "https://www.ncs.gov.in" },
    { name: "Startup India", age: 50, benefit: "Startup Support", link: "https://www.startupindia.gov.in" }
  ],
  farmer: [
    { name: "PM Kisan", benefit: "₹6000/year", link: "https://pmkisan.gov.in" },
    { name: "Kisan Credit Card", benefit: "Low interest loan", link: "https://www.nabard.org" },
    { name: "PM Fasal Bima Yojana", benefit: "Crop Insurance", link: "https://pmfby.gov.in" },
    { name: "Soil Health Card", benefit: "Soil Testing", link: "https://soilhealth.dac.gov.in" }
  ],
  health: [
    { name: "Ayushman Bharat", benefit: "₹5 lakh insurance", link: "https://pmjay.gov.in" },
    { name: "Jan Arogya Yojana", benefit: "Free treatment", link: "https://pmjay.gov.in" },
    { name: "Mission Indradhanush", benefit: "Free vaccination", link: "https://nhm.gov.in" },
    { name: "eSanjeevani", benefit: "Online doctor consultation", link: "https://esanjeevani.in" }
  ],
  housing: [
    { name: "PM Awas Yojana", benefit: "Affordable housing", link: "https://pmaymis.gov.in" },
    { name: "CLSS Scheme", benefit: "Interest subsidy", link: "https://pmaymis.gov.in" },
    { name: "Rajiv Awas Yojana", benefit: "Urban housing", link: "https://mohua.gov.in" },
    { name: "Affordable Rental Housing", benefit: "Low-cost rent", link: "https://mohua.gov.in" }
  ]
};

// SIMPLE DICTIONARY (UI TEXT ONLY)
const i18n = {
  en: {
    title: "🇮🇳 AI Bharat Smart Assistant",
    subtitle: "Hackathon‑grade AI assistant to discover government schemes instantly.",
    ask: "Ask",
    speak: "🎤 Speak",
    askPlaceholder: "e.g. student schemes, women help...",
    sectionAsk: "Ask the AI",
    sectionForm: "📋 Smart Application",
    findBest: "Find Best",
    bestFor: "⭐ Best Scheme for",
    applyVisit: "Apply / Visit",
    visit: "Visit →",
    select: "Select Category",
    scholarship: "Scholarship",
    students: "Students",
    women: "Women",
    job: "Job",
    farmer: "Farmer",
    health: "Health",
    housing: "Housing"
  },
  hi: {
    title: "🇮🇳 एआई भारत स्मार्ट सहायक",
    subtitle: "सरकारी योजनाएँ तुरंत खोजने के लिए हैकाथॉन‑ग्रेड सहायक।",
    ask: "पूछें",
    speak: "🎤 बोलें",
    askPlaceholder: "जैसे छात्र योजना, महिला सहायता...",
    sectionAsk: "एआई से पूछें",
    sectionForm: "📋 स्मार्ट आवेदन",
    findBest: "सर्वश्रेष्ठ खोजें",
    bestFor: "⭐ आपके लिए सर्वश्रेष्ठ योजना",
    applyVisit: "आवेदन / देखें",
    visit: "देखें →",
    select: "श्रेणी चुनें",
    scholarship: "छात्रवृत्ति",
    students: "छात्र",
    women: "महिला",
    job: "नौकरी",
    farmer: "किसान",
    health: "स्वास्थ्य",
    housing: "आवास"
  }
};

export default function App() {
  const [lang, setLang] = useState("en");
  const [input, setInput] = useState(""
  );
  const [response, setResponse] = useState([]);
  const [title, setTitle] = useState("✨ Discover Schemes");
  const [category, setCategory] = useState("scholarship");
  const [name, setName] = useState("");
  const [income, setIncome] = useState("");
  const [age, setAge] = useState("");
  const [bestScheme, setBestScheme] = useState(null);

  const t = i18n[lang];
  const activeSchemes = useMemo(() => schemes[category] || [], [category]);

  const handleAsk = () => {
    const text = (input || "").toLowerCase();
    const includesAny = (values) => values.some((value) => text.includes(value));

    if (includesAny(["job", "naukri", "rojgar", "रोजगार", "नौकरी"])) {
      setCategory("job");
      setTitle("💼 Job Schemes");
      setResponse(schemes.job);
    } else if (includesAny(["farmer", "kisan", "किसान", "खेती", "कृषि"])) {
      setCategory("farmer");
      setTitle("🚜 Farmer Schemes");
      setResponse(schemes.farmer);
    } else if (includesAny(["health", "swasth", "स्वास्थ्य", "इलाज", "चिकित्सा"])) {
      setCategory("health");
      setTitle("🏥 Health Schemes");
      setResponse(schemes.health);
    } else if (includesAny(["house", "housing", "awas", "आवास", "मकान", "घर"])) {
      setCategory("housing");
      setTitle("🏠 Housing Schemes");
      setResponse(schemes.housing);
    } else if (includesAny(["student", "students", "scholar", "vidyarthi", "विद्यार्थी", "छात्र", "छात्रवृत्ति"])) {
      setCategory("students");
      setTitle("🎓 Student Schemes");
      setResponse(schemes.students);
    } else if (includesAny(["women", "woman", "mahila", "महिला", "nari", "नारी"])) {
      setCategory("women");
      setTitle("👩 Women Schemes");
      setResponse(schemes.women);
    } else {
      setCategory("scholarship");
      setTitle("🎓 Scholarship Schemes");
      setResponse(schemes.scholarship);
    }
  };

  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === "hi" ? "hi-IN" : "en-IN";
    recognition.onresult = (event) => setInput(event.results[0][0].transcript);
    recognition.start();
  };

  const findBestScheme = () => {
    let list = schemes[category];
    let best;

    if (category === "scholarship") best = list.find((s) => income <= s.income);
    else if (category === "job") best = list.find((s) => age <= s.age);
    else best = list[0];

    setBestScheme(best || null);
  };

  return (
    <div style={styles.page}>
      <header style={styles.hero}>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>

        {/* Bilingual toggle button */}
        <button
          style={styles.ghostBtn}
          onClick={() => setLang((prev) => (prev === "en" ? "hi" : "en"))}
        >
          {lang === "en" ? "Switch to Hindi" : "अंग्रेज़ी में बदलें"}
        </button>
      </header>

      {/* Search Section */}
      <section style={styles.card}>
        <h2>{t.sectionAsk}</h2>
        <div style={styles.row}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.askPlaceholder}
            style={styles.input}
          />
          <button style={styles.primaryBtn} onClick={handleAsk}>{t.ask}</button>
          <button style={styles.ghostBtn} onClick={startVoice}>{t.speak}</button>
        </div>

        <h3 style={{ marginTop: "20px" }}>{title}</h3>

        <div style={styles.grid}>
          {response.map((item, i) => (
            <div key={i} style={styles.schemeCard}>
              <strong>{item.name}</strong>
              <p>{item.benefit}</p>
              <button style={styles.linkBtn} onClick={() => window.open(item.link, "_blank")}>{t.visit}</button>
            </div>
          ))}
        </div>
      </section>

      {/* Application */}
      <section style={styles.card}>
        <h2>{t.sectionForm}</h2>
        <div style={styles.row}>
          <select onChange={(e) => setCategory(e.target.value)} style={styles.input}>
            <option value="scholarship">{t.scholarship}</option>
            <option value="students">{t.students}</option>
            <option value="women">{t.women}</option>
            <option value="job">{t.job}</option>
            <option value="farmer">{t.farmer}</option>
            <option value="health">{t.health}</option>
            <option value="housing">{t.housing}</option>
          </select>
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} style={styles.input} />
          <input placeholder="Income" onChange={(e) => setIncome(e.target.value)} style={styles.input} />
          <input placeholder="Age" onChange={(e) => setAge(e.target.value)} style={styles.input} />
          <button style={styles.primaryBtn} onClick={findBestScheme}>{t.findBest}</button>
        </div>

        {bestScheme && (
          <div style={styles.bestCard}>
            <h3>{t.bestFor} {name}</h3>
            <p><b>{bestScheme.name}</b></p>
            <p>{bestScheme.benefit}</p>
            <button style={styles.primaryBtn} onClick={() => window.open(bestScheme.link, "_blank")}>{t.applyVisit}</button>
          </div>
        )}
      </section>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Inter, system-ui, sans-serif",
    minHeight: "100vh",
    background: "white",
    color: "#000",
    padding: "30px"
  },
  hero: {
    textAlign: "center",
    marginBottom: "20px"
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    padding: "20px",
    borderRadius: "16px",
    marginBottom: "20px"
  },
  row: { display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5f5",
    background: "#ffffff",
    color: "#000",
    minWidth: "160px"
  },
  primaryBtn: {
    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    border: "none",
    color: "#000",
    padding: "12px 16px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600"
  },
  ghostBtn: {
    background: "transparent",
    border: "1px solid #64748b",
    color: "#000",
    padding: "12px 16px",
    borderRadius: "12px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "12px",
    marginTop: "16px"
  },
  schemeCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "14px"
  },
  linkBtn: {
    marginTop: "8px",
    background: "transparent",
    color: "#000",
    border: "none",
    cursor: "pointer"
  },
  bestCard: {
    marginTop: "16px",
    background: "#e7f7ee",
    border: "1px solid #86efac",
    padding: "16px",
    borderRadius: "14px"
  }
};