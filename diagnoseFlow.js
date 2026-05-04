function startDiagnosis(symptom) {
    const data = diagnoseData[symptom];

    document.querySelector(".symptom-cards").classList.add("hidden");

    const wizard = document.getElementById("wizard");
    wizard.classList.remove("hidden");

    wizard.innerHTML = `
        <div class="diagnose-container">
            <h2>${symptom}</h2>

            <h3>Test 1</h3>
            <p>${data.tests[0]}</p>

            <div class="answer-buttons">
                <button class="answer-btn" onclick="showTest2('${symptom}')">Ja</button>
                <button class="answer-btn" onclick="showTest2('${symptom}')">Nee</button>
            </div>
        </div>
    `;
}

function showTest2(symptom) {
    const data = diagnoseData[symptom];
    const wizard = document.getElementById("wizard");

    wizard.innerHTML = `
        <div class="diagnose-container">
            <h2>${symptom}</h2>

            <h3>Test 2</h3>
            <p>${data.tests[1]}</p>

            <div class="answer-buttons">
                <button class="answer-btn" onclick="showTest3('${symptom}')">Ja</button>
                <button class="answer-btn" onclick="showTest3('${symptom}')">Nee</button>
            </div>
        </div>
    `;
}

function showTest3(symptom) {
    const data = diagnoseData[symptom];
    const wizard = document.getElementById("wizard");

    wizard.innerHTML = `
        <div class="diagnose-container">
            <h2>${symptom}</h2>

            <h3>Test 3</h3>
            <p>${data.tests[2] || "Geen extra test nodig"}</p>

            <div class="answer-buttons">
                <button class="answer-btn" onclick="showResult('${symptom}')">Volgende</button>
            </div>
        </div>
    `;
}

function showResult(symptom) {
    const data = diagnoseData[symptom];
    const wizard = document.getElementById("wizard");

    wizard.innerHTML = `
        <div class="diagnose-container">
            <h2>Resultaat</h2>

            <h3>Waarschijnlijke oorzaken</h3>
            <ul>${data.oorzaken.map(o => `<li>${o}</li>`).join("")}</ul>

            <h3>Tests uitgevoerd</h3>
            <ul>${data.tests.map(t => `<li>${t}</li>`).join("")}</ul>

            <h3>Oplossingen</h3>
            <ul>${data.oplossingen.map(o => `<li>${o}</li>`).join("")}</ul>

            <h3>Blok-specifieke info</h3>
            <ul>${data.blok.map(b => `<li>${b}</li>`).join("")}</ul>

            <div class="answer-buttons">
                <button class="answer-btn" onclick="location.reload()">Nieuwe diagnose</button>
            </div>
        </div>
    `;
}
// 1. Logische vraagflows per symptoom (korte versie)
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
    ]
    // Je kunt hier ALLE 19 flows toevoegen
};

// 2. Variabelen
let currentSymptom = null;
let currentStep = 0;

// 3. Start diagnose vanuit kaart
function startDiagnosis(symptom) {
    currentSymptom = symptom;
    currentStep = 0;

    document.querySelector(".symptom-cards").classList.add("hidden");
    document.getElementById("wizard").classList.remove("hidden");

    showQuestion();
}

// 4. Toon vraag
function showQuestion() {
    const wizard = document.getElementById("wizard");
    const questions = questionFlows[currentSymptom];

    // Als er geen vragen meer zijn → resultaat tonen
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

// 5. Verwerk antwoord
function answerQuestion(answer) {
    // Later kunnen we hier logica toevoegen (oorzaken wegstrepen)
    currentStep++;
    showQuestion();
}

// 6. Toon eindresultaat
function showResult() {
    const data = diagnoseData[currentSymptom];
    const wizard = document.getElementById("wizard");

    wizard.innerHTML = `
        <div class="diagnose-container">
            <h2>Resultaat voor: ${currentSymptom}</h2>

            <h3>Waarschijnlijke oorzaken</h3>
            <ul>${data.oorzaken.map(o => `<li>${o}</li>`).join("")}</ul>

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
