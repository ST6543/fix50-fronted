// COMPLETE DIAGNOSEDATA — EXACT ZOALS JE OUDE SYSTEEM

const diagnoseData = {
    "Start niet": {
        oorzaken: [
            "Startmotor draait niet/ te langzaam",
            "Geen vonk",
            "Geen brandstof",
            "Verstopte carburateur",
            "Lage compressie",
            "Verkeerde timing"
        ],
        tests: [
            "Meet spanning op startmotor",
            "Controleer bougie op vonk",
            "Controleer brandstofkraan/vacuüm",
            "Controleer carburateur op verstopping"
        ],
        oplossingen: [
            "Startmotor reviseren",
            "Bougie vervangen",
            "Carburateur reinigen",
            "Brandstofsysteem controleren"
        ],
        blok: [
            "Controleer klepspeling (4T)",
            "Controleer compressie"
        ]
    },

    "Slaat af bij gas geven": {
        oorzaken: [
            "Te weinig brandstofaanvoer",
            "Carburateur vervuild",
            "Vacuümlek",
            "Te arm mengsel"
        ],
        tests: [
            "Controleer vacuümslangen",
            "Test met choke",
            "Controleer sproeiers"
        ],
        oplossingen: [
            "Carburateur reinigen",
            "Vacuümslangen vervangen",
            "Stationair afstellen"
        ],
        blok: [
            "Controleer membraan",
            "Controleer luchtfilter"
        ]
    },

    "Loopt slecht stationair": {
        oorzaken: [
            "Stationair sproeier verstopt",
            "Valse lucht",
            "Te arm mengsel"
        ],
        tests: [
            "Test met remmenreiniger rond spruitstuk",
            "Stationair-schroef testen",
            "Controleer sproeiers"
        ],
        oplossingen: [
            "Carburateur reinigen",
            "Spruitstuk vervangen",
            "Stationair afstellen"
        ],
        blok: [
            "Controleer luchtfilter",
            "Controleer membraan"
        ]
    },

    "Rijdt niet harder dan 20–30 km/h": {
        oorzaken: [
            "Carburateur te arm",
            "Uitlaat verstopt",
            "V-snaar versleten",
            "Variateur problemen"
        ],
        tests: [
            "Controleer uitlaat op verstopping",
            "Controleer snaar",
            "Controleer variateurrollen"
        ],
        oplossingen: [
            "Uitlaat reinigen/vervangen",
            "Snaar vervangen",
            "Variateur reviseren"
        ],
        blok: [
            "Controleer koppeling",
            "Controleer luchtfilter"
        ]
    },

    "Tikkend/ratelend geluid": {
        oorzaken: [
            "Koppeling versleten",
            "Klepspeling fout (4T)",
            "Lagers versleten"
        ],
        tests: [
            "Luister bij warme motor",
            "Controleer koppeling",
            "Controleer klepspeling"
        ],
        oplossingen: [
            "Koppeling vervangen",
            "Kleppen stellen",
            "Lagers vervangen"
        ],
        blok: [
            "Controleer variateur",
            "Controleer snaar"
        ]
    },

    "Rookt extreem": {
        oorzaken: [
            "Te veel olie (2T)",
            "Klepseals (4T)",
            "Oliepomp verkeerd afgesteld"
        ],
        tests: [
            "Controleer oliepeil",
            "Controleer rookkleur",
            "Controleer oliepomp"
        ],
        oplossingen: [
            "Oliepomp afstellen",
            "Klepseals vervangen",
            "Oliepeil corrigeren"
        ],
        blok: [
            "Controleer luchtfilter",
            "Controleer carburateur"
        ]
    },

    "Trilt bij optrekken": {
        oorzaken: [
            "Motorsteunen",
            "Variateur",
            "Koppeling"
        ],
        tests: [
            "Controleer motorsteunen",
            "Controleer variateur",
            "Controleer koppeling"
        ],
        oplossingen: [
            "Motorsteunen vervangen",
            "Variateur reviseren",
            "Koppeling reinigen/vervangen"
        ],
        blok: [
            "Controleer snaar",
            "Controleer rollen"
        ]
    },

    "Ploffend geluid / backfire": {
        oorzaken: [
            "Kleppen verkeerd afgesteld (4T)",
            "Uitlaatpakking lek",
            "Te arm mengsel",
            "Valse lucht"
        ],
        tests: [
            "Controleer uitlaatpakking",
            "Controleer klepspeling",
            "Controleer spruitstuk"
        ],
        oplossingen: [
            "Kleppen stellen",
            "Uitlaatpakking vervangen",
            "Spruitstuk vervangen"
        ],
        blok: [
            "Controleer carburateur",
            "Controleer luchtfilter"
        ]
    },

    "Wordt te warm": {
        oorzaken: [
            "Koelvloeistof laag",
            "Thermostaat vast",
            "Waterpomp defect"
        ],
        tests: [
            "Controleer koelvloeistof",
            "Test thermostaat",
            "Controleer waterpomp"
        ],
        oplossingen: [
            "Koelvloeistof bijvullen",
            "Thermostaat vervangen",
            "Waterpomp reviseren"
        ],
        blok: [
            "Controleer radiateur",
            "Controleer slangen"
        ]
    },

    "Slaat af stationair maar rijdt goed": {
        oorzaken: [
            "Stationair sproeier verstopt",
            "Valse lucht",
            "Klepspeling (4T)"
        ],
        tests: [
            "Test met remmenreiniger",
            "Controleer sproeiers",
            "Controleer klepspeling"
        ],
        oplossingen: [
            "Carburateur reinigen",
            "Spruitstuk vervangen",
            "Kleppen stellen"
        ],
        blok: [
            "Controleer luchtfilter",
            "Controleer carburateur"
        ]
    },

    "Verliest vermogen warm": {
        oorzaken: [
            "Bobine/CDI defect bij warmte",
            "Klepspeling te klein",
            "Keerringen lekken warm"
        ],
        tests: [
            "Test vonk warm",
            "Controleer klepspeling",
            "Controleer keerringen"
        ],
        oplossingen: [
            "Bobine/CDI vervangen",
            "Kleppen stellen",
            "Keerringen vervangen"
        ],
        blok: [
            "Controleer carburateur",
            "Controleer luchtfilter"
        ]
    },

    "Onregelmatig vonkbeeld": {
        oorzaken: [
            "Pickup sensor",
            "Massa",
            "Vliegwiel magneten"
        ],
        tests: [
            "Controleer pickup sensor",
            "Controleer massa",
            "Controleer vliegwiel"
        ],
        oplossingen: [
            "Pickup vervangen",
            "Massa herstellen",
            "Vliegwiel vervangen"
        ],
        blok: [
            "Controleer CDI",
            "Controleer bobine"
        ]
    },

    "Koppeling pakt laat": {
        oorzaken: [
            "Versleten koppelingsveren",
            "Gladde platen"
        ],
        tests: [
            "Controleer koppelingshuis",
            "Controleer veren"
        ],
        oplossingen: [
            "Veren vervangen",
            "Platen vervangen"
        ],
        blok: [
            "Controleer snaar",
            "Controleer variateur"
        ]
    },

    "Scooter schokt bij optrekken": {
        oorzaken: [
            "Rollen plat",
            "Koppeling vervuild"
        ],
        tests: [
            "Controleer rollen",
            "Controleer koppeling"
        ],
        oplossingen: [
            "Rollen vervangen",
            "Koppeling reinigen"
        ],
        blok: [
            "Controleer snaar",
            "Controleer variateur"
        ]
    },

    "Hoge toeren maar geen snelheid": {
        oorzaken: [
            "Snaar slipt",
            "Koppeling slipt"
        ],
        tests: [
            "Controleer snaar",
            "Controleer koppeling"
        ],
        oplossingen: [
            "Snaar vervangen",
            "Koppeling reviseren"
        ],
        blok: [
            "Controleer variateur",
            "Controleer rollen"
        ]
    },

    "Benzine loopt uit carburateur": {
        oorzaken: [
            "Vlotterkamer pakking lek",
            "Vlotternaald defect"
        ],
        tests: [
            "Controleer vlotterkamer",
            "Controleer vlotternaald"
        ],
        oplossingen: [
            "Pakking vervangen",
            "Vlotternaald vervangen"
        ],
        blok: [
            "Controleer carburateur",
            "Controleer brandstofslang"
        ]
    },

    "Scooter houdt in bij half gas": {
        oorzaken: [
            "Te arm mengsel",
            "Membraan lekt"
        ],
        tests: [
            "Controleer sproeiers",
            "Controleer membraan"
        ],
        oplossingen: [
            "Carburateur afstellen",
            "Membraan vervangen"
        ],
        blok: [
            "Controleer luchtfilter",
            "Controleer spruitstuk"
        ]
    },

    "Geen reactie op gas": {
        oorzaken: [
            "Gaskabel los",
            "Choke blijft hangen"
        ],
        tests: [
            "Controleer gaskabel",
            "Controleer choke"
        ],
        oplossingen: [
            "Gaskabel vastzetten",
            "Choke vervangen"
        ],
        blok: [
            "Controleer carburateur",
            "Controleer luchtfilter"
        ]
    },

    "Scooter valt uit bij regen": {
        oorzaken: [
            "Bougiedop nat",
            "Bobine nat"
        ],
        tests: [
            "Controleer bougiedop",
            "Controleer bobine"
        ],
        oplossingen: [
            "Bougiedop vervangen",
            "Bobine afdichten"
        ],
        blok: [
            "Controleer kabelboom",
            "Controleer CDI"
        ]
    }
};
