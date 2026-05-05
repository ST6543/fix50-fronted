// KORTE VRAAGFLOWS PER SYMPTOM
const questionFlows = {
    "Start niet": [
        "Draait de startmotor als je op de startknop drukt?",
        "Hoor je een klikgeluid bij het starten?",
        "Is er vonk op de bougie?"
    ],
    "Slaat af bij gas geven": [
        "Slaat de motor direct af zodra je gas geeft?",
        "Reageert de motor beter met choke?",
        "Is de scooter lang niet gebruikt?"
    ],
    "Loopt slecht stationair": [
        "Blijft de motor soms bijna uitvallen op stationair?",
        "Reageert de motor op de stationair-schroef?",
        "Verandert het toerental bij remmenreiniger rond het spruitstuk?"
    ],
    "Rijdt niet harder dan 20–30 km/h": [
        "Maakt de motor veel toeren maar weinig snelheid?",
        "Is de scooter ineens langzaam geworden?",
        "Is de uitlaat ooit verstopt geweest?"
    ],
    "Tikkend/ratelend geluid": [
        "Komt het geluid vooral uit de motor?",
        "Wordt het geluid harder als de motor warm is?",
        "Hoor je het vooral bij optrekken?"
    ],
    "Rookt extreem": [
        "Is de rook blauw of wit?",
        "Is het een 2-takt scooter?",
        "Is het oliepeil te hoog?"
    ],
    "Trilt bij optrekken": [
        "Voel je de trilling vooral bij het wegrijden?",
        "Verdwijnt de trilling bij hogere snelheid?",
        "Is de scooter lang niet onderhouden?"
    ],
    "Ploffend geluid / backfire": [
        "Komt de plof uit de uitlaat?",
        "Doet het vooral bij gas loslaten?",
        "Is de scooter recent afgesteld?"
    ],
    "Wordt te warm": [
        "Is het koelvloeistofniveau laag?",
        "Wordt de scooter snel warm?",
        "Verliest de scooter koelvloeistof?"
    ],
    "Slaat af stationair maar rijdt goed": [
        "Valt de motor uit zodra je stopt?",
        "Verandert het toerental bij remmenreiniger rond het spruitstuk?",
        "Gebeurt het vooral als de motor warm is?"
    ],
    "Verliest vermogen warm": [
        "Doet het probleem zich alleen voor als de motor warm is?",
        "Slaat de motor soms af als hij warm is?",
        "Is de bougie lichtgrijs/wit?"
    ],
    "Onregelmatig vonkbeeld": [
        "Is de vonk soms weg of zwak?",
        "Is de bougiedop nat geweest?",
        "Is het vliegwiel ooit vervangen?"
    ],
    "Koppeling pakt laat": [
        "Moet je veel gas geven voordat de scooter gaat rijden?",
        "Schokt de scooter bij het wegrijden?"
    ],
    "Scooter schokt bij optrekken": [
        "Voel je schokken bij de eerste meters?",
        "Is de scooter lang niet onderhouden?"
    ],
    "Hoge toeren maar geen snelheid": [
        "Gaat de scooter gillen bij optrekken?",
        "Ruikt het naar verbrande riem?"
    ],
    "Benzine loopt uit carburateur": [
        "Druppelt er benzine onder de scooter?",
        "Komt het uit de vlotterkamer?"
    ],
    "Scooter houdt in bij half gas": [
        "Houdt de scooter in rond half gas?",
        "Is het een 2-takt scooter?"
    ],
    "Geen reactie op gas": [
        "Reageert de scooter helemaal niet op gas?",
        "Voelt de gaskabel los of slap?"
    ],
    "Scooter valt uit bij regen": [
        "Gebeurt het alleen bij regen of nat weer?",
        "Is de bougiedop nat of beschadigd?"
    ]
};

// SLIMME LOGICA PER VRAAG (OORZAKEN WEGSTREPEN)
const logic = {
    "Start niet": [
        {
            question: "Draait de startmotor als je op de startknop drukt?",
            yesRemove: ["Startmotor draait niet/ te langzaam"],
            noRemove: ["Geen vonk", "Geen brandstof", "Verstopte carburateur", "Lage compressie"]
        },
        {
            question: "Hoor je een klikgeluid bij het starten?",
            yesRemove: ["Startmotor draait niet/ te langzaam"],
            noRemove: ["Verkeerde timing"]
        },
        {
            question: "Is er vonk op de bougie?",
            yesRemove: ["Geen vonk"],
            noRemove: ["Verkeerde timing", "Lage compressie"]
        }
    ],
    "Slaat af bij gas geven": [
        {
            question: "Slaat de motor direct af zodra je gas geeft?",
            yesRemove: ["Te weinig brandstofaanvoer"],
            noRemove: ["Carburateur vervuild"]
        },
        {
            question: "Reageert de motor beter met choke?",
            yesRemove: ["Vacuümlek"],
            noRemove: ["Te arm mengsel"]
        },
        {
            question: "Is de scooter lang niet gebruikt?",
            yesRemove: [],
            noRemove: ["Carburateur vervuild"]
        }
    ],
    "Loopt slecht stationair": [
        {
            question: "Blijft de motor soms bijna uitvallen op stationair?",
            yesRemove: [],
            noRemove: ["Stationair sproeier verstopt"]
        },
        {
            question: "Reageert de motor op de stationair-schroef?",
            yesRemove: ["Valse lucht"],
            noRemove: ["Te arm mengsel"]
        },
        {
            question: "Verandert het toerental bij remmenreiniger rond het spruitstuk?",
            yesRemove: [],
            noRemove: ["Valse lucht"]
        }
    ],
    "Rijdt niet harder dan 20–30 km/h": [
        {
            question: "Maakt de motor veel toeren maar weinig snelheid?",
            yesRemove: ["Carburateur te arm", "Uitlaat verstopt"],
            noRemove: ["V-snaar versleten"]
        },
        {
            question: "Is de scooter ineens langzaam geworden?",
            yesRemove: [],
            noRemove: ["Variateur problemen"]
        },
        {
            question: "Is de uitlaat ooit verstopt geweest?",
            yesRemove: [],
            noRemove: ["Uitlaat verstopt"]
        }
    ],
    "Tikkend/ratelend geluid": [
        {
            question: "Komt het geluid vooral uit de motor?",
            yesRemove: ["Koppeling versleten"],
            noRemove: ["Klepspeling fout (4T)"]
        },
        {
            question: "Wordt het geluid harder als de motor warm is?",
            yesRemove: ["Koppeling versleten"],
            noRemove: ["Lagers versleten"]
        },
        {
            question: "Hoor je het vooral bij optrekken?",
            yesRemove: ["Klepspeling fout (4T)"],
            noRemove: ["Koppeling versleten"]
        }
    ],
    "Rookt extreem": [
        {
            question: "Is de rook blauw of wit?",
            yesRemove: ["Te veel olie (2T)"],
            noRemove: ["Klepseals (4T)"]
        },
        {
            question: "Is het een 2-takt scooter?",
            yesRemove: ["Klepseals (4T)"],
            noRemove: ["Te veel olie (2T)"]
        },
        {
            question: "Is het oliepeil te hoog?",
            yesRemove: [],
            noRemove: ["Oliepomp verkeerd afgesteld"]
        }
    ],
    "Trilt bij optrekken": [
        {
            question: "Voel je de trilling vooral bij het wegrijden?",
            yesRemove: ["Motorsteunen"],
            noRemove: []
        },
        {
            question: "Verdwijnt de trilling bij hogere snelheid?",
            yesRemove: ["Motorsteunen"],
            noRemove: []
        },
        {
            question: "Is de scooter lang niet onderhouden?",
            yesRemove: [],
            noRemove: ["Variateur"]
        }
    ],
    "Ploffend geluid / backfire": [
        {
            question: "Komt de plof uit de uitlaat?",
            yesRemove: ["Kleppen verkeerd afgesteld (4T)"],
            noRemove: ["Uitlaatpakking lek"]
        },
        {
            question: "Doet het vooral bij gas loslaten?",
            yesRemove: ["Te arm mengsel"],
            noRemove: ["Valse lucht"]
        },
        {
            question: "Is de scooter recent afgesteld?",
            yesRemove: [],
            noRemove: ["Kleppen verkeerd afgesteld (4T)"]
        }
    ],
    "Wordt te warm": [
        {
            question: "Is het koelvloeistofniveau laag?",
            yesRemove: [],
            noRemove: ["Koelvloeistof laag"]
        },
        {
            question: "Wordt de scooter snel warm?",
            yesRemove: [],
            noRemove: ["Thermostaat vast"]
        },
        {
            question: "Verliest de scooter koelvloeistof?",
            yesRemove: [],
            noRemove: ["Waterpomp defect"]
        }
    ],
    "Slaat af stationair maar rijdt goed": [
        {
            question: "Valt de motor uit zodra je stopt?",
            yesRemove: [],
            noRemove: ["Stationair sproeier verstopt"]
        },
        {
            question: "Verandert het toerental bij remmenreiniger rond het spruitstuk?",
            yesRemove: [],
            noRemove: ["Valse lucht"]
        },
        {
            question: "Gebeurt het vooral als de motor warm is?",
            yesRemove: [],
            noRemove: ["Klepspeling (4T)"]
        }
    ],
    "Verliest vermogen warm": [
        {
            question: "Doet het probleem zich alleen voor als de motor warm is?",
            yesRemove: [],
            noRemove: ["Bobine/CDI defect bij warmte"]
        },
        {
            question: "Slaat de motor soms af als hij warm is?",
            yesRemove: [],
            noRemove: ["Klepspeling te klein"]
        },
        {
            question: "Is de bougie lichtgrijs/wit?",
            yesRemove: [],
            noRemove: ["Keerringen lekken warm"]
        }
    ],
    "Onregelmatig vonkbeeld": [
        {
            question: "Is de vonk soms weg of zwak?",
            yesRemove: [],
            noRemove: ["Pickup sensor"]
        },
        {
            question: "Is de bougiedop nat geweest?",
            yesRemove: [],
            noRemove: ["Massa"]
        },
        {
            question: "Is het vliegwiel ooit vervangen?",
            yesRemove: [],
            noRemove: ["Vliegwiel magneten"]
        }
    ],
    "Koppeling pakt laat": [
        {
            question: "Moet je veel gas geven voordat de scooter gaat rijden?",
            yesRemove: [],
            noRemove: ["Versleten koppelingsveren"]
        },
        {
            question: "Schokt de scooter bij het wegrijden?",
            yesRemove: [],
            noRemove: ["Gladde platen"]
        }
    ],
    "Scooter schokt bij optrekken": [
        {
            question: "Voel je schokken bij de eerste meters?",
            yesRemove: [],
            noRemove: ["Rollen plat"]
        },
        {
            question: "Is de scooter lang niet onderhouden?",
            yesRemove: [],
            noRemove: ["Koppeling vervuild"]
        }
    ],
    "Hoge toeren maar geen snelheid": [
        {
            question: "Gaat de scooter gillen bij optrekken?",
            yesRemove: [],
            noRemove: ["Snaar slipt"]
        },
        {
            question: "Ruikt het naar verbrande riem?",
            yesRemove: [],
            noRemove: ["Koppeling slipt"]
        }
    ],
    "Benzine loopt uit carburateur": [
        {
            question: "Druppelt er benzine onder de scooter?",
            yesRemove: [],
            noRemove: ["Vlotterkamer pakking lek"]
        },
        {
            question: "Komt het uit de vlotterkamer?",
            yesRemove: [],
            noRemove: ["Vlotternaald defect"]
        }
    ],
    "Scooter houdt in bij half gas": [
        {
            question: "Houdt de scooter in rond half gas?",
            yesRemove: [],
            noRemove: ["Te arm mengsel"]
        },
        {
            question: "Is het een 2-takt scooter?",
            yesRemove: [],
            noRemove: ["Membraan lekt"]
        }
    ],
    "Geen reactie op gas": [
        {
            question: "Reageert de scooter helemaal niet op gas?",
            yesRemove: [],
            noRemove: ["Gaskabel los"]
        },
        {
            question: "Voelt de gaskabel los of slap?",
            yesRemove: [],
            noRemove: ["Choke blijft hangen"]
        }
    ],
    "Scooter valt uit bij regen": [
        {
            question: "Gebeurt het alleen bij regen of nat weer?",
            yesRemove: [],
            noRemove: ["Bougiedop nat"]
        },
        {
            question: "Is de bougiedop nat of beschadigd?",
            yesRemove: [],
            noRemove: ["Bobine nat"]
        }
    ]
};

// STATE
let currentSymptom = null;
let currentStep = 0;
let activeCauses = [];

// START DIAGNOSE VANUIT KAART
function startDiagnosis(symptom) {
    currentSymptom = symptom;
    currentStep = 0;

    // kopie van alle oorzaken uit diagnoseData
    activeCauses = [...diagnoseData[symptom].oorzaken];

    document.querySelector(".symptom-cards").classList.add("hidden");
    document.getElementById("wizard").classList.remove("hidden");

    showQuestion();
}

// VRAAG TONEN
function showQuestion() {
    const wizard = document.getElementById("wizard");
    const questions = questionFlows[currentSymptom];

    if (!questions || currentStep >= questions.length) {
        showResult();
        return;
    }

    const questionText = questions[currentStep];

    wizard.innerHTML = `
        <div class="diagnose-container">
            <h2>${currentSymptom}</h2>
            <h3 class="question">Vraag ${currentStep + 1}</h3>
            <p>${questionText}</p>

            <div class="answer-buttons">
                <button class="answer-btn" onclick="answerQuestion('ja')">Ja</button>
                <button class="answer-btn" onclick="answerQuestion('nee')">Nee</button>
            </div>
        </div>
    `;
}

// ANTWOORD VERWERKEN + LOGICA
function answerQuestion(answer) {
    const rulesForSymptom = logic[currentSymptom];
    if (rulesForSymptom && rulesForSymptom[currentStep]) {
        const rules = rulesForSymptom[currentStep];

        if (answer === "ja") {
            activeCauses = activeCauses.filter(c => !rules.yesRemove.includes(c));
        } else {
            activeCauses = activeCauses.filter(c => !rules.noRemove.includes(c));
        }
    }

    currentStep++;
    showQuestion();
}

// RESULTAAT TONEN
function showResult() {
    const data = diagnoseData[currentSymptom];
    const wizard = document.getElementById("wizard");

    wizard.innerHTML = `
        <div class="diagnose-container">
            <h2>Resultaat voor: ${currentSymptom}</h2>

            <h3>Waarschijnlijke oorzaken</h3>
            <ul>${activeCauses.length ? activeCauses.map(o => `<li>${o}</li>`).join("") : "<li>Geen duidelijke oorzaak gevonden op basis van de antwoorden.</li>"}</ul>

            <h3>Aanbevolen tests</h3>
            <ul>${data.tests.map(t => `<li>${t}</li>`).join("")}</ul>

            <h3>Mogelijke oplossingen</h3>
            <ul>${data.oplossingen.map(o => `<li>${o}</li>`).join("")}</ul>

            <h3>Blok-specifieke info</h3>
            <ul>${data.blok.map(b => `<li>${b}</li>`).join("")}</ul>

            <div class="answer-buttons">
                <button class="answer-btn" onclick="location.reload()">Nieuwe diagnose</button>
            </div>
        </div>
    `;
}
