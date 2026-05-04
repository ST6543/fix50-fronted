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
