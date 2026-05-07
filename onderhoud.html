import express from "express";
import cors from "cors";
import fs from "fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "fix50supersecret";

const USERS_FILE = "./users.json";
const SCOOTERS_FILE = "./scooters.json";
const MAINT_SETTINGS_FILE = "./maintenance-settings.json";

const resend = new Resend(process.env.RESEND_API_KEY);

/* HELPERS */
function loadJson(path) {
  if (!fs.existsSync(path)) return [];
  return JSON.parse(fs.readFileSync(path));
}

function saveJson(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

/* AUTH MIDDLEWARE */
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer "))
    return res.status(401).json({ error: "Geen token" });

  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Ongeldige token" });
  }
}

/* REGISTER */
app.post("/api/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email en wachtwoord verplicht" });

  const users = loadJson(USERS_FILE);
  if (users.find(u => u.email === email))
    return res.status(400).json({ error: "Gebruiker bestaat al" });

  const hashed = bcrypt.hashSync(password, 10);
  users.push({ email, password: hashed });
  saveJson(USERS_FILE, users);

  const token = jwt.sign({ email }, SECRET, { expiresIn: "7d" });
  res.json({ success: true, token });
});

/* LOGIN */
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const users = loadJson(USERS_FILE);
  const user = users.find(u => u.email === email);

  if (!user) return res.status(400).json({ error: "Onjuiste gegevens" });

  const match = bcrypt.compareSync(password, user.password);
  if (!match) return res.status(400).json({ error: "Onjuiste gegevens" });

  const token = jwt.sign({ email }, SECRET, { expiresIn: "7d" });
  res.json({ token });
});

/* SCOOTERS OPHALEN */
app.get("/api/scooters", authMiddleware, (req, res) => {
  const scooters = loadJson(SCOOTERS_FILE);
  const userScooters = scooters.filter(s => s.owner === req.user.email);
  res.json(userScooters);
});

/* SCOOTER TOEVOEGEN */
app.post("/api/scooters", authMiddleware, (req, res) => {
  const { naam, kenteken, km } = req.body;

  if (!naam || !kenteken || !km)
    return res.status(400).json({ error: "Alle velden verplicht" });

  const scooters = loadJson(SCOOTERS_FILE);

  const newScooter = {
    id: Date.now(),
    naam,
    kenteken,
    km,
    owner: req.user.email
  };

  scooters.push(newScooter);
  saveJson(SCOOTERS_FILE, scooters);

  res.json({ success: true, scooter: newScooter });
});

/* SCOOTER VERWIJDEREN */
app.delete("/api/scooters/:id", authMiddleware, (req, res) => {
  const id = Number(req.params.id);

  let scooters = loadJson(SCOOTERS_FILE);
  scooters = scooters.filter(s => !(s.id === id && s.owner === req.user.email));

  saveJson(SCOOTERS_FILE, scooters);

  res.json({ success: true });
});

/* SCOOTER BEWERKEN */
app.put("/api/scooters/:id", authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const { naam, kenteken, km } = req.body;

  const scooters = loadJson(SCOOTERS_FILE);
  const scooter = scooters.find(s => s.id === id && s.owner === req.user.email);

  if (!scooter) return res.status(404).json({ error: "Scooter niet gevonden" });

  scooter.naam = naam;
  scooter.kenteken = kenteken;
  scooter.km = km;

  saveJson(SCOOTERS_FILE, scooters);

  res.json({ success: true, scooter });
});

/* ------------------------------
   ONDERHOUD ENGINE
------------------------------ */

const MAINTENANCE_RULES = [
  // 2T
  { onderdeel: "Bougie", type: "2T", minKm: 2000, maxKm: 4000, info: "2T vervuilt sneller" },
  { onderdeel: "Luchtfilter reinigen", type: "2T", minKm: 1000, maxKm: 2000, info: "Foam filters vaker reinigen" },
  { onderdeel: "Luchtfilter vervangen", type: "2T", minKm: 6000, maxKm: 8000, info: "" },
  { onderdeel: "V-snaar", type: "2T", minKm: 8000, maxKm: 12000, info: "" },
  { onderdeel: "Rollen", type: "2T", minKm: 4000, maxKm: 6000, info: "Platte rollen = slecht optrekken" },
  { onderdeel: "Koppeling reinigen", type: "2T", minKm: 6000, maxKm: 10000, info: "" },
  { onderdeel: "Koppeling vervangen", type: "2T", minKm: 15000, maxKm: 25000, info: "" },
  { onderdeel: "Carburateur reinigen", type: "2T", minKm: 3000, maxKm: 5000, info: "2T sproeiers vervuilen sneller" },
  { onderdeel: "Zuiger + zuigerveren", type: "2T", minKm: 8000, maxKm: 12000, info: "Bij sportcilinders soms 5000 km" },
  { onderdeel: "Krukaslagers", type: "2T", minKm: 20000, maxKm: 30000, info: "" },
  { onderdeel: "Keerringen", type: "2T", minKm: 10000, maxKm: 20000, info: "" },
  { onderdeel: "Oliepomp afstellen", type: "2T", minKm: 6000, maxKm: 6000, info: "Alleen bij modellen met pomp" },
  { onderdeel: "Uitlaat ontkolen", type: "2T", minKm: 8000, maxKm: 12000, info: "2T uitlaten raken verstopt" },

  // 4T
  { onderdeel: "Motorolie", type: "4T", minKm: 2000, maxKm: 3000, info: "Belangrijkste onderhoud" },
  { onderdeel: "Oliefilter", type: "4T", minKm: 4000, maxKm: 6000, info: "Niet alle 4T hebben filter" },
  { onderdeel: "Bougie", type: "4T", minKm: 4000, maxKm: 6000, info: "4T vervuilt minder snel" },
  { onderdeel: "Klepspeling stellen", type: "4T", minKm: 4000, maxKm: 6000, info: "GY6 gevoelig" },
  { onderdeel: "Luchtfilter reinigen", type: "4T", minKm: 2000, maxKm: 4000, info: "" },
  { onderdeel: "Luchtfilter vervangen", type: "4T", minKm: 8000, maxKm: 10000, info: "" },
  { onderdeel: "V-snaar", type: "4T", minKm: 10000, maxKm: 15000, info: "" },
  { onderdeel: "Rollen", type: "4T", minKm: 6000, maxKm: 8000, info: "" },
  { onderdeel: "Koppeling reinigen", type: "4T", minKm: 8000, maxKm: 12000, info: "" },
  { onderdeel: "Koppeling vervangen", type: "4T", minKm: 20000, maxKm: 30000, info: "" },
  { onderdeel: "Carburateur reinigen", type: "4T", minKm: 5000, maxKm: 8000, info: "" },
  { onderdeel: "Kleppen/nokkenasketting inspecteren", type: "4T", minKm: 10000, maxKm: 15000, info: "" },

  // Universeel
  { onderdeel: "Remblokken", type: "Universeel", minKm: 5000, maxKm: 10000, info: "Afhankelijk van rijstijl" },
  { onderdeel: "Remschijven", type: "Universeel", minKm: 20000, maxKm: 40000, info: "" },
  { onderdeel: "Banden", type: "Universeel", minKm: 8000, maxKm: 15000, info: "Of 4 jaar" },
  { onderdeel: "Accu", type: "Universeel", minKm: null, maxKm: null, info: "2-4 jaar" },
  { onderdeel: "Wiellagers", type: "Universeel", minKm: 15000, maxKm: 25000, info: "" },
  { onderdeel: "Balhoofdlagers", type: "Universeel", minKm: 15000, maxKm: 25000, info: "" },
  { onderdeel: "Schokdempers", type: "Universeel", minKm: 20000, maxKm: 30000, info: "" }
];

function berekenOnderhoudBackend({ kmPerWeek, huidigeKm, type }) {
  const nu = new Date();

  return MAINTENANCE_RULES
    .filter(r => r.type === type || r.type === "Universeel")
    .map(rule => {
      if (!rule.minKm) {
        return {
          ...rule,
          kmNog: null,
          weken: null,
          datum: "Tijdgebonden",
          status: "OK"
        };
      }

      const volgendeKm = rule.minKm;
      const kmNog = Math.max(0, volgendeKm - huidigeKm);
      const weken = kmNog / kmPerWeek;
      const dagen = Math.round(weken * 7);
      const datum = new Date(nu.getTime() + dagen * 86400000);

      let status;
      if (kmNog <= 0) status = "TE LAAT";
      else if (weken < 2) status = "DRINGEND";
      else if (weken < 6) status = "BINNENKORT";
      else status = "OK";

      return {
        ...rule,
        kmNog,
        weken: Number(weken.toFixed(1)),
        datum: datum.toISOString().slice(0, 10),
        status
      };
    })
    .sort((a, b) => (a.kmNog ?? 999999) - (b.kmNog ?? 999999));
}

/* ------------------------------
   ONDERHOUD INSTELLINGEN OPSLAAN
------------------------------ */

app.post("/api/maintenance/settings", authMiddleware, (req, res) => {
  const { kmPerWeek, huidigeKm, type } = req.body;

  if (!kmPerWeek || !huidigeKm || !type)
    return res.status(400).json({ error: "Alle velden verplicht" });

  const settings = loadJson(MAINT_SETTINGS_FILE);

  const existing = settings.find(s => s.email === req.user.email);
  if (existing) {
    existing.kmPerWeek = kmPerWeek;
    existing.huidigeKm = huidigeKm;
    existing.type = type;
  } else {
    settings.push({
      email: req.user.email,
      kmPerWeek,
      huidigeKm,
      type
    });
  }

  saveJson(MAINT_SETTINGS_FILE, settings);

  res.json({ success: true });
});

/* ONDERHOUD ADVIES OPVRAGEN */

app.get("/api/maintenance/advice", authMiddleware, (req, res) => {
  const settings = loadJson(MAINT_SETTINGS_FILE);
  const userSettings = settings.find(s => s.email === req.user.email);

  if (!userSettings)
    return res.status(400).json({ error: "Geen onderhoudsinstellingen gevonden" });

  const adviezen = berekenOnderhoudBackend(userSettings);
  res.json(adviezen);
});

/* ------------------------------
   MAIL FUNCTIE MET RESEND
------------------------------ */

async function sendMaintenanceMail(to, adviezen) {
  const dringende = adviezen.filter(a => a.status === "DRINGEND" || a.status === "TE LAAT");

  if (dringende.length === 0) return;

  const lines = dringende.map(a =>
    `- ${a.onderdeel}: ${a.status}, datum: ${a.datum}, nog: ${a.kmNog ?? "-"} km`
  );

  const text = [
    "Je scooter heeft binnenkort onderhoud nodig:",
    "",
    ...lines,
    "",
    "Groeten,",
    "Fix50"
  ].join("\n");

  await resend.emails.send({
    from: "Fix50 <noreply@fix50.nl>",
    to,
    subject: "Fix50 onderhoudsherinnering",
    text
  });
}

/* ------------------------------
   DAILY CHECK ENDPOINT
------------------------------ */

app.post("/api/maintenance/check-and-mail", async (req, res) => {
  const settings = loadJson(MAINT_SETTINGS_FILE);
  const users = loadJson(USERS_FILE);

  for (const s of settings) {
    const user = users.find(u => u.email === s.email);
    if (!user) continue;

    const adviezen = berekenOnderhoudBackend(s);
    await sendMaintenanceMail(s.email, adviezen);
  }

  res.json({ success: true });
});

/* SERVER START */
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Fix50 backend draait op poort", port));
