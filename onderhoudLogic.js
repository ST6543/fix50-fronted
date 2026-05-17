/* ============================
   ONDERHOUD LOGICA
============================ */

const onderhoudSchema = {
    "2T": [
        { onderdeel: "Bougie", interval: 5000 },
        { onderdeel: "Olie (mengsmering)", interval: 0 },
        { onderdeel: "V-snaar", interval: 8000 },
        { onderdeel: "Luchtfilter", interval: 3000 },
        { onderdeel: "Remmen", interval: 2000 }
    ],
    "4T": [
        { onderdeel: "Bougie", interval: 5000 },
        { onderdeel: "Motorolie", interval: 3000 },
        { onderdeel: "V-snaar", interval: 8000 },
        { onderdeel: "Luchtfilter", interval: 3000 },
        { onderdeel: "Kleppen stellen", interval: 6000 }
    ]
};

async function berekenOnderhoud() {
    const kmPerDag = Number(document.getElementById("kmPerDag").value);
    const msg = document.getElementById("onderhoud-msg");
    const container = document.getElementById("onderhoud-resultaten");

    msg.textContent = "";
    container.innerHTML = "";

    if (!kmPerDag || kmPerDag <= 0) {
        msg.style.color = "red";
        msg.textContent = "Vul een geldig aantal kilometers in.";
        return;
    }

    // Scooter ophalen
    let scooters = [];
    try {
        scooters = await apiFetch("/api/scooters");
    } catch {
        msg.style.color = "red";
        msg.textContent = "Kon scooters niet laden.";
        return;
    }

    if (!scooters.length) {
        msg.style.color = "red";
        msg.textContent = "Je hebt nog geen scooters toegevoegd.";
        return;
    }

    const scooter = scooters[0]; // eerste scooter gebruiken
    const type = scooter.type;

    const schema = onderhoudSchema[type];
    if (!schema) {
        msg.style.color = "red";
        msg.textContent = "Onbekend scootertype.";
        return;
    }

    msg.style.color = "green";
    msg.textContent = `Onderhoud berekend voor jouw ${type} scooter (${scooter.naam}).`;

    schema.forEach(item => {
        if (item.interval === 0) return;

        const dagenTotOnderhoud = Math.round(item.interval / kmPerDag);

        const card = document.createElement("div");
        card.className = "home-card";

        card.innerHTML = `
            <h3>${item.onderdeel}</h3>
            <p>Interval: ${item.interval} km</p>
            <p>Op basis van jouw gebruik:</p>
            <p><strong>Over ${dagenTotOnderhoud} dagen vervangen</strong></p>
        `;

        container.appendChild(card);
    });

    // MAIL SIMULATIE
    setTimeout(() => {
        document.getElementById("mail-simulatie").classList.remove("hidden");
    }, 1500);
}
