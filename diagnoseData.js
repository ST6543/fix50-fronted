const diagnoseData = {
    "Start niet": {
        oorzaken: [
            "Geen vonk", "Geen brandstof", "Lage compressie",
            "Verkeerde timing", "Verstopte carburateur",
            "Startmotor draait niet/ te langzaam"
        ],
        tests: [
            "Bougie eruit, vonk checken",
            "Brandstofslang los, flow check",
            "Compressietest",
            "Carburateur inspectie",
            "Startmotor op 12V testen"
        ],
        oplossingen: [
            "Bobine/CDI/bougie vervangen",
            "Carburateur reinigen",
            "Kleppen stellen (4T)",
            "Cilinder/zuiger vervangen",
            "Startmotor reviseren"
        ],
        blok: [
            "GY6: klepspeling, choke, vacuüm",
            "Piaggio 2T: membraan, keerringen",
            "AM6: keerring versnellingsbakzijde",
            "Tomos: punten/condensator"
        ]
    },

    "Slaat af bij gas geven": {
        oorzaken: ["Te arm mengsel", "Vacuümlek", "Carburateur vervuild", "Te weinig brandstofaanvoer"],
        tests: ["Remmenreiniger rond spruitstuk", "Sproeiers controleren", "Brandstofdoorstroming testen"],
        oplossingen: ["Carburateur reinigen", "Spruitstuk vervangen", "Brandstofkraan/pomp vervangen"],
        blok: ["GY6: vacuümpomp/choke", "Piaggio 2T: membraanplaatjes", "Tomos: sproeier verstopt door mengsmering"]
    },

    "Loopt slecht stationair": {
        oorzaken: ["Te arm mengsel", "Valse lucht", "Stationair sproeier verstopt", "Slechte bougie"],
        tests: ["Stationair schroef reactie", "Remmenreiniger rond spruitstuk", "Bougie kleur check"],
        oplossingen: ["Carburateur reinigen", "Spruitstuk vervangen", "Bougie vervangen"],
        blok: ["4T: klepspeling", "2T: keerringen", "AM6: membraan"]
    },

    "Rijdt niet harder dan 20–30 km/h": {
        oorzaken: ["Variateur problemen", "V-snaar versleten", "Carburateur te arm", "Uitlaat verstopt"],
        tests: ["Variateur inspectie", "Snaar meten", "Sproeier checken"],
        oplossingen: ["Rollen/snaar vervangen", "Carburateur afstellen", "Uitlaat reinigen/vervangen"],
        blok: ["GY6: variateurbus, snaar", "Piaggio 2T: uitlaat verstopt", "Tomos: koppeling slipt"]
    },

    "Tikkend/ratelend geluid": {
        oorzaken: ["Klepspeling fout (4T)", "Lagers versleten", "Koppeling versleten"],
        tests: ["Klepspeling meten", "Zijdeksel eraf, speling controleren"],
        oplossingen: ["Kleppen stellen", "Lagers/koppeling vervangen"],
        blok: ["AM6: krukaslagers", "GY6: kleppen tikken", "Tomos: koppeling ratelt"]
    },

    "Rookt extreem": {
        oorzaken: ["Te veel olie (2T)", "Versleten zuigerveren", "Oliepomp verkeerd afgesteld", "Klepseals (4T)"],
        tests: ["Compressie", "Oliepomp markeringen", "Oliepeil"],
        oplossingen: ["Oliepomp afstellen", "Zuiger/veren vervangen", "Klepseals vervangen"],
        blok: ["Piaggio 2T: oliepomp tandwiel", "Tomos: mengsmering te rijk"]
    },

    "Trilt bij optrekken": {
        oorzaken: ["Variateur", "Koppeling", "Snaar", "Motorsteunen"],
        tests: ["Variateur/koppeling inspectie", "Snaarspanning", "Motorsteunen checken"],
        oplossingen: ["Rollen/koppeling/snaar vervangen", "Motorsteunen vervangen"],
        blok: ["GY6: koppeling ongelijk afgesleten", "Piaggio 2T: snaar slijt snel"]
    },

    "Ploffend geluid / backfire": {
        oorzaken: ["Te arm mengsel", "Valse lucht", "Kleppen verkeerd afgesteld (4T)", "Uitlaatpakking lek"],
        tests: ["Bougie kleur", "Remmenreiniger test", "Klepspeling meten"],
        oplossingen: ["Mengsel afstellen", "Pakking vervangen", "Kleppen stellen"],
        blok: ["GY6: choke blijft hangen", "4T: kleppen stellen"]
    },

    "Wordt te warm": {
        oorzaken: ["Koelvloeistof laag", "Waterpomp defect", "Thermostaat vast", "Te arm mengsel"],
        tests: ["Koelvloeistofniveau", "Waterpomp werking", "Bougie kleur"],
        oplossingen: ["Bijvullen", "Waterpomp/thermostaat vervangen", "Mengsel afstellen"],
        blok: ["Piaggio LC: waterpomp keerring", "AM6: waterpomp tandwiel"]
    },

    "Slaat af stationair maar rijdt goed": {
        oorzaken: ["Stationair sproeier verstopt", "Valse lucht", "Klepspeling (4T)"],
        tests: ["Stationair kanaal check", "Remmenreiniger test", "Klepspeling meten"],
        oplossingen: ["Carburateur reinigen", "Spruitstuk vervangen", "Kleppen stellen"],
        blok: ["GY6: veel voorkomend bij warme motor"]
    },

    "Verliest vermogen warm": {
        oorzaken: ["Bobine/CDI defect warm", "Klepspeling te klein", "Keerringen lekken warm"],
        tests: ["Vonk warm checken", "Klepspeling meten", "Compressie warm"],
        oplossingen: ["Bobine/CDI vervangen", "Kleppen stellen", "Keerringen vervangen"],
        blok: ["GY6: bobine warm defect", "2T: keerringen lekken warm"]
    },

    "Onregelmatig vonkbeeld": {
        oorzaken: ["Pickup sensor", "Massa", "Vliegwiel magneten"],
        tests: ["Pickup weerstand", "Massa meten", "Vliegwiel inspectie"],
        oplossingen: ["Pickup vervangen", "Massa verbeteren", "Vliegwiel vervangen"],
        blok: ["Tomos: vliegwiel magneten zwak"]
    },

    "Koppeling pakt laat": {
        oorzaken: ["Versleten koppelingsveren", "Gladde platen"],
        tests: ["Koppeling demonteren", "Veerspanning meten"],
        oplossingen: ["Koppelingsveren/platen vervangen"],
        blok: ["Tomos: veelvoorkomend bij oudere modellen"]
    },

    "Scooter schokt bij optrekken": {
        oorzaken: ["Rollen plat", "Koppeling vervuild"],
        tests: ["Variateur inspectie", "Koppelingshuis checken"],
        oplossingen: ["Rollen vervangen", "Koppeling reinigen"],
        blok: ["GY6: veelvoorkomend bij goedkope rollen"]
    },

    "Hoge toeren maar geen snelheid": {
        oorzaken: ["Snaar slipt", "Koppeling slipt"],
        tests: ["Snaar inspectie", "Koppeling checken"],
        oplossingen: ["Snaar/koppeling vervangen"],
        blok: ["GY6: snaar rekt snel uit"]
    },

    "Benzine loopt uit carburateur": {
        oorzaken: ["Vlotternaald defect", "Vlotterkamer pakking lek"],
        tests: ["Vlotterhoogte checken", "Pakking inspecteren"],
        oplossingen: ["Vlotternaald/pakking vervangen"],
        blok: ["Universeel probleem bij oudere carburateurs"]
    },

    "Scooter houdt in bij half gas": {
        oorzaken: ["Te arm mengsel", "Sproeier te klein", "Membraan lekt"],
        tests: ["Sproeiermaat checken", "Membraan inspectie"],
        oplossingen: ["Sproeier vergroten", "Membraan vervangen"],
        blok: ["Piaggio 2T: membraanplaatjes vaak oorzaak"]
    },

    "Geen reactie op gas": {
        oorzaken: ["Gaskabel los", "Carburateur vacuüm", "Choke blijft hangen"],
        tests: ["Gaskabel checken", "Vacuüm meten", "Choke inspecteren"],
        oplossingen: ["Kabel herstellen", "Choke vervangen"],
        blok: ["GY6: automatische choke vaak oorzaak"]
    },

    "Scooter valt uit bij regen": {
        oorzaken: ["Bougiedop nat", "Bobine nat", "Slechte massa"],
        tests: ["Bougiedop controleren", "Bobine schoonmaken", "Massa checken"],
        oplossingen: ["Bougiedop/bobine vervangen", "Massa verbeteren"],
        blok: ["Tomos: open ontsteking gevoelig voor vocht"]
    }
};
