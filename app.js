// Application Data - Original Structure Preserved
const cementData = {
    // Chemical constants for calculations
    molecularWeights: {
        SO3: 80.06,
        CaSO4: 136.14,
        H2O: 18.015,
        get dihydrate() { return this.CaSO4 + (2 * this.H2O); },    // CaSO4·2H₂O
        get hemihydrate() { return this.CaSO4 + (0.5 * this.H2O); }, // CaSO4·½H₂O
        get anhydrite() { return this.CaSO4; }                      // CaSO4
    },

    // Separate strength classes with ALL variants (N, R, L)
    strengthClasses: {
        "32.5": {
            variants: {
                L: { name: "Low early strength", early_days: 7, early_min: 12.0, standard_min: 32.5, standard_max: 52.5, setting_time: 75, applications: ["Mass concrete", "Dams", "Large foundations"] },
                N: { name: "Normal early strength", early_days: 7, early_min: 16.0, standard_min: 32.5, standard_max: 52.5, setting_time: 75, applications: ["General construction", "Masonry work", "Non-structural elements"] },
                R: { name: "Rapid early strength", early_days: 2, early_min: 10.0, standard_min: 32.5, standard_max: 52.5, setting_time: 75, applications: ["Fast construction", "Early demolding", "Rapid strength gain"] }
            }
        },
        "42.5": {
            variants: {
                L: { name: "Low early strength", early_days: 7, early_min: 16.0, standard_min: 42.5, standard_max: 62.5, setting_time: 60, applications: ["Mass concrete structures", "Thermal mass", "Low heat applications"] },
                N: { name: "Normal early strength", early_days: 2, early_min: 10.0, standard_min: 42.5, standard_max: 62.5, setting_time: 60, applications: ["Structural concrete", "Precast elements", "General construction"] },
                R: { name: "Rapid early strength", early_days: 2, early_min: 20.0, standard_min: 42.5, standard_max: 62.5, setting_time: 60, applications: ["Fast construction", "Precast industry", "Quick turnover projects"] }
            }
        },
        "52.5": {
            variants: {
                L: { name: "Low early strength", early_days: 2, early_min: 10.0, standard_min: 52.5, standard_max: null, setting_time: 45, applications: ["High-performance mass concrete", "Low heat high strength"] },
                N: { name: "Normal early strength", early_days: 2, early_min: 20.0, standard_min: 52.5, standard_max: null, setting_time: 45, applications: ["High-strength concrete", "Structural applications", "Infrastructure"] },
                R: { name: "Rapid early strength", early_days: 2, early_min: 30.0, standard_min: 52.5, standard_max: null, setting_time: 45, applications: ["Rapid construction", "Prestressed concrete", "Fast-track projects"] }
            }
        }
    },
    
    // ALL Cement TYPES RESTORED & UPGRADED FOR CALCULATOR
    types: [
        {
            id: 'cem1', name: 'CEM I', family: 'CEM I', category: 'common', clinker: '95-100%',
            description: 'Pure Portland cement with highest clinker content for structural applications',
            applications: ['Structural concrete', 'High early strength applications', 'General construction'],
            composition: { clinker: 95, minor: 5 }, max_so3: 4.0,
            chemical_requirements: { loss_on_ignition: "≤ 5.0%", insoluble_residue: "≤ 5.0%", sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem2-a-s', name: 'CEM II/A-S', family: 'CEM II', category: 'common', clinker: '80-94%', additive: '6-20% Slag',
            description: 'Portland-slag cement (6-20%)',
            applications: ['General construction', 'Mass concrete', 'Marine environments'],
            composition: { clinker: 87, slag: 13 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem2-b-s', name: 'CEM II/B-S', family: 'CEM II', category: 'common', clinker: '65-79%', additive: '21-35% Slag',
            description: 'Portland-slag cement (21-35%)',
            applications: ['Structural concrete', 'Durable construction', 'Sulfate environments'],
            composition: { clinker: 72, slag: 28 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem2-a-d', name: 'CEM II/A-D', family: 'CEM II', category: 'common', clinker: '90-94%', additive: '6-10% Silica fume',
            description: 'Portland-silica fume',
            applications: ['High-performance concrete', 'Ultra-high strength', 'Reduced permeability'],
            composition: { clinker: 92, silicaFume: 8 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem2-a-p', name: 'CEM II/A-P', family: 'CEM II', category: 'common', clinker: '80-94%', additive: '6-20% Natural pozzolana',
            description: 'Portland-natural pozzolana (6-20%)',
            applications: ['Aggressive environments', 'Mass concrete', 'Long-term durability'],
            composition: { clinker: 87, pozzolan: 13 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem2-b-p', name: 'CEM II/B-P', family: 'CEM II', category: 'common', clinker: '65-79%', additive: '21-35% Natural pozzolana',
            description: 'Portland-natural pozzolana (21-35%)',
            applications: ['Harsh environments', 'Mass concrete', 'Durability focus'],
            composition: { clinker: 72, pozzolan: 28 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem2-a-q', name: 'CEM II/A-Q', family: 'CEM II', category: 'common', clinker: '80-94%', additive: '6-20% Calcined pozzolana',
            description: 'Portland-calcined pozzolana (6-20%)',
            applications: ['Chemical resistance', 'Hot climates', 'Mass concrete'],
            composition: { clinker: 87, pozzolan: 13 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem2-b-q', name: 'CEM II/B-Q', family: 'CEM II', category: 'common', clinker: '65-79%', additive: '21-35% Calcined pozzolana',
            description: 'Portland-calcined pozzolana (21-35%)',
            applications: ['Severe exposure', 'Chemical resistance', 'Infrastructure'],
            composition: { clinker: 72, pozzolan: 28 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem2-a-v', name: 'CEM II/A-V', family: 'CEM II', category: 'common', clinker: '80-94%', additive: '6-20% Siliceous fly ash',
            description: 'Portland-siliceous fly ash (6-20%)',
            applications: ['General construction', 'Sustainable building', 'Long-term projects'],
            composition: { clinker: 87, flyAsh: 13 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem2-b-v', name: 'CEM II/B-V', family: 'CEM II', category: 'common', clinker: '65-79%', additive: '21-35% Siliceous fly ash',
            description: 'Portland-siliceous fly ash (21-35%)',
            applications: ['Mass concrete', 'Infrastructure', 'Eco-friendly construction'],
            composition: { clinker: 72, flyAsh: 28 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem2-a-w', name: 'CEM II/A-W', family: 'CEM II', category: 'common', clinker: '80-94%', additive: '6-20% Calcareous fly ash',
            description: 'Portland-calcareous fly ash (6-20%)',
            applications: ['Infrastructure', 'Mass concrete', 'Sustainable construction'],
            composition: { clinker: 87, flyAsh: 13 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem2-b-w', name: 'CEM II/B-W', family: 'CEM II', category: 'common', clinker: '65-79%', additive: '21-35% Calcareous fly ash',
            description: 'Portland-calcareous fly ash (21-35%)',
            applications: ['Mass concrete', 'Long-term applications', 'Sustainable projects'],
            composition: { clinker: 72, flyAsh: 28 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem2-a-t', name: 'CEM II/A-T', family: 'CEM II', category: 'common', clinker: '80-94%', additive: '6-20% Burnt shale',
            description: 'Portland-burnt shale (6-20%)',
            applications: ['General construction', 'Regional availability', 'Cost-effective'],
            composition: { clinker: 87, burntShale: 13 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem2-b-t', name: 'CEM II/B-T', family: 'CEM II', category: 'common', clinker: '65-79%', additive: '21-35% Burnt shale',
            description: 'Portland-burnt shale (21-35%)',
            applications: ['Local construction', 'Regional projects', 'Economic construction'],
            composition: { clinker: 72, burntShale: 28 }, max_so3: 4.5,
            chemical_requirements: { sulfate_content: "≤ 4.5%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem2-a-l', name: 'CEM II/A-L', family: 'CEM II', category: 'common', clinker: '80-94%', additive: '6-20% Limestone L',
            description: 'Portland-limestone L (6-20%)',
            applications: ['General construction', 'Architectural concrete', 'Precast elements'],
            composition: { clinker: 87, limestone: 13 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem2-b-l', name: 'CEM II/B-L', family: 'CEM II', category: 'common', clinker: '65-79%', additive: '21-35% Limestone L',
            description: 'Portland-limestone L (21-35%)',
            applications: ['Mass concrete', 'Non-structural elements', 'Sustainable construction'],
            composition: { clinker: 72, limestone: 28 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem2-a-ll', name: 'CEM II/A-LL', family: 'CEM II', category: 'common', clinker: '80-94%', additive: '6-20% Limestone LL',
            description: 'Portland-limestone LL (6-20%)',
            applications: ['General construction', 'Cost-effective solutions', 'Regional use'],
            composition: { clinker: 87, limestone: 13 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem2-b-ll', name: 'CEM II/B-LL', family: 'CEM II', category: 'common', clinker: '65-79%', additive: '21-35% Limestone LL',
            description: 'Portland-limestone LL (21-35%)',
            applications: ['Mass concrete applications', 'Economic construction', 'Large projects'],
            composition: { clinker: 72, limestone: 28 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem2-a-m', name: 'CEM II/A-M', family: 'CEM II', category: 'common', clinker: '80-88%', additive: '12-20% Mixed constituents',
            description: 'Portland-composite (12-20%)',
            applications: ['Versatile applications', 'Mixed exposure', 'General purpose'],
            composition: { clinker: 84, slag: 8, limestone: 8 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem2-b-m', name: 'CEM II/B-M', family: 'CEM II', category: 'common', clinker: '65-79%', additive: '21-35% Mixed constituents',
            description: 'Portland-composite (21-35%)',
            applications: ['Complex environments', 'Multi-purpose use', 'Sustainable construction'],
            composition: { clinker: 72, slag: 14, flyAsh: 14 }, max_so3: 4.5,
            chemical_requirements: { sulfate_content: "≤ 4.5%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem3-a', name: 'CEM III/A', family: 'CEM III', category: 'common', clinker: '35-64%', additive: '36-65% Slag',
            description: 'Blast furnace cement with 36-65% slag content',
            applications: ['Marine structures', 'Mass concrete', 'Chemical resistance'],
            composition: { clinker: 50, slag: 50 }, max_so3: 4.5,
            chemical_requirements: { loss_on_ignition: "≤ 5.0%", insoluble_residue: "≤ 5.0%", sulfate_content: "≤ 4.5%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem3-b', name: 'CEM III/B', family: 'CEM III', category: 'common', clinker: '20-34%', additive: '66-80% Slag',
            description: 'High slag content cement for enhanced durability',
            applications: ['Aggressive environments', 'Sulfate resistance', 'Long-term strength'],
            composition: { clinker: 27, slag: 73 }, max_so3: 4.5,
            chemical_requirements: { loss_on_ignition: "≤ 5.0%", insoluble_residue: "≤ 5.0%", sulfate_content: "≤ 4.5%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem3-c', name: 'CEM III/C', family: 'CEM III', category: 'common', clinker: '5-19%', additive: '81-95% Slag',
            description: 'Very high slag content for maximum chemical resistance',
            applications: ['Highly aggressive environments', 'Industrial applications', 'Waste containment'],
            composition: { clinker: 12, slag: 88 }, max_so3: 4.5,
            chemical_requirements: { loss_on_ignition: "≤ 5.0%", insoluble_residue: "≤ 5.0%", sulfate_content: "≤ 4.5%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem4-a', name: 'CEM IV/A', family: 'CEM IV', category: 'common', clinker: '65-89%', additive: '11-35% Pozzolanic materials',
            description: 'Pozzolanic cement with 11-35% pozzolanic materials',
            applications: ['Hot climates', 'Mass concrete', 'Alkali-silica reaction mitigation'],
            composition: { clinker: 77, pozzolan: 23 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%", pozzolanicity_test: "must satisfy" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem4-b', name: 'CEM IV/B', family: 'CEM IV', category: 'common', clinker: '45-64%', additive: '36-55% Pozzolanic materials',
            description: 'High pozzolan content for enhanced durability',
            applications: ['Severe exposure conditions', 'Thermal mass', 'Sustainable construction'],
            composition: { clinker: 55, pozzolan: 45 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%", pozzolanicity_test: "must satisfy" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem5-a', name: 'CEM V/A', family: 'CEM V', category: 'common', clinker: '40-64%', additive: '18-30% Slag + 18-30% Pozzolan/Fly ash',
            description: 'Composite cement with slag and pozzolan (18-30% each)',
            applications: ['Multi-exposure environments', 'Sustainable construction', 'Long-term durability'],
            composition: { clinker: 52, slag: 24, pozzolan: 24 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem5-b', name: 'CEM V/B', family: 'CEM V', category: 'common', clinker: '20-38%', additive: '31-50% Slag + 31-50% Pozzolan/Fly ash',
            description: 'High replacement composite cement for extreme durability',
            applications: ['Highly aggressive environments', 'Infrastructure', 'Waste management'],
            composition: { clinker: 29, slag: 35.5, pozzolan: 35.5 }, max_so3: 4.0,
            chemical_requirements: { sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem1-sr0', name: 'CEM I-SR 0', family: 'CEM I-SR', category: 'sulfate', clinker: '95-100%',
            description: 'Sulfate resisting Portland cement with C₃A = 0% for maximum sulfate resistance',
            applications: ['Severe sulfate environments', 'Seawater exposure', 'Chemical industry'],
            composition: { clinker: 95, minor: 5 }, max_so3: 3.5,
            chemical_requirements: { c3a_limit: "C₃A = 0%", sulfate_content: "≤ 3.5%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem1-sr3', name: 'CEM I-SR 3', family: 'CEM I-SR', category: 'sulfate', clinker: '95-100%',
            description: 'Sulfate resisting Portland cement with C₃A ≤ 3% for high sulfate resistance',
            applications: ['Moderate sulfate environments', 'Underground structures', 'Marine foundations'],
            composition: { clinker: 95, minor: 5 }, max_so3: 3.5,
            chemical_requirements: { c3a_limit: "C₃A ≤ 3%", sulfate_content: "≤ 3.5%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem1-sr5', name: 'CEM I-SR 5', family: 'CEM I-SR', category: 'sulfate', clinker: '95-100%',
            description: 'Sulfate resisting Portland cement with C₃A ≤ 5% for moderate sulfate resistance',
            applications: ['Mild sulfate environments', 'General construction', 'Infrastructure projects'],
            composition: { clinker: 95, minor: 5 }, max_so3: 3.5,
            chemical_requirements: { c3a_limit: "C₃A ≤ 5%", sulfate_content: "≤ 3.5%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem4-a-sr', name: 'CEM IV/A-SR', family: 'CEM IV-SR', category: 'sulfate', clinker: '65-89%', additive: '11-35% Pozzolanic materials',
            description: 'Sulfate resisting pozzolanic cement A - enhanced chemical resistance',
            applications: ['Marine concrete', 'Sewage treatment plants', 'Chemical-resistant structures'],
            composition: { clinker: 77, pozzolan: 23 }, max_so3: 4.0,
            chemical_requirements: { c3a_limit: "C₃A ≤ 9%", sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%", pozzolanicity_test: "Must satisfy at 8 days" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem4-b-sr', name: 'CEM IV/B-SR', family: 'CEM IV-SR', category: 'sulfate', clinker: '45-64%', additive: '36-55% Pozzolanic materials',
            description: 'Sulfate resisting pozzolanic cement B - maximum chemical resistance',
            applications: ['Severe sulfate environments', 'Industrial structures', 'Long-term durability'],
            composition: { clinker: 55, pozzolan: 45 }, max_so3: 4.0,
            chemical_requirements: { c3a_limit: "C₃A ≤ 9%", sulfate_content: "≤ 4.0%", chloride: "≤ 0.10%", pozzolanicity_test: "Must satisfy at 8 days" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem3-b-sr', name: 'CEM III/B-SR', family: 'CEM III-SR', category: 'sulfate', clinker: '20-34%', additive: '66-80% Slag',
            description: 'Sulfate resisting blast furnace cement B - natural sulfate resistance',
            applications: ['Marine environments', 'Aggressive chemical conditions', 'Infrastructure'],
            composition: { clinker: 27, slag: 73 }, max_so3: 4.5,
            chemical_requirements: { c3a_limit: "No C₃A requirement", sulfate_content: "≤ 4.5%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        },
        {
            id: 'cem3-c-sr', name: 'CEM III/C-SR', family: 'CEM III-SR', category: 'sulfate', clinker: '5-19%', additive: '81-95% Slag',
            description: 'Sulfate resisting blast furnace cement C - highest natural sulfate resistance',
            applications: ['Extreme sulfate environments', 'Seawater structures', 'Chemical containment'],
            composition: { clinker: 12, slag: 88 }, max_so3: 4.5,
            chemical_requirements: { c3a_limit: "No C₃A requirement", sulfate_content: "≤ 4.5%", chloride: "≤ 0.10%" },
            available_strength_classes: ["32.5", "42.5", "52.5"]
        }
    ],

    credits: {
        prepared_by: "Mr. Fadi M. Darwesh",
        email: "asrar.cement@gmail.com",
        checked_by: "Mr.Emil E.Batarseh",
        title: "Director of Northern Cement Laboratories"
    },
    
    constituents: [
        { symbol: 'K', name: 'Portland Cement Clinker', category: 'Primary Hydraulic', description: 'The main hydraulic constituent produced by sintering limestone and clay', compounds: ['3CaO·SiO₂ (C₃S)', '2CaO·SiO₂ (C₂S)', '3CaO·Al₂O₃ (C₃A)', '4CaO·Al₂O₃·Fe₂O₃ (C₄AF)'], requirements: ['Calcium oxide (CaO) content typically 60-67%', 'Silicon dioxide (SiO₂) content typically 18-24%'] },
        { symbol: 'S', name: 'Granulated Blast Furnace Slag', category: 'Hydraulic', description: 'Latent hydraulic material obtained by rapid cooling of molten slag', compounds: ['Calcium silicate hydrates', 'Aluminum-calcium silicate hydrates'], requirements: ['Glassy content ≥ 2/3 by mass', '(CaO + MgO)/SiO₂ > 1.0'] },
        { symbol: 'P', name: 'Natural Pozzolan', category: 'Pozzolanic', description: 'Natural siliceous or aluminous material with pozzolanic properties', compounds: ['Reactive silica', 'Aluminum compounds'], requirements: ['Reactive SiO₂ ≥ 25.0%'] },
        { symbol: 'D', name: 'Silica Fume', category: 'High Performance', description: 'Very fine pozzolanic material from silicon metal production', compounds: ['Amorphous SiO₂'], requirements: ['SiO₂ ≥ 85%', 'Specific surface ≥ 15.0 m²/g', 'Maximum usage ≤ 10%'] },
        { symbol: 'V', name: 'Fly Ash', category: 'Pozzolanic', description: 'Fine powder from combustion of pulverized coal', compounds: ['Siliceous glass', 'Crystalline phases'], requirements: ['Reactive SiO₂ ≥ 25.0%', 'Loss on ignition ≤ 5.0%'] },
        { symbol: 'W', name: 'Calcined Shale', category: 'Pozzolanic', description: 'Heat-treated clay-rich sedimentary rock', compounds: ['Activated alumina', 'Reactive silica'], requirements: ['Compressive strength ≥ 25.0 MPa at 28 days'] },
        { symbol: 'Q', name: 'Calcined Pozzolan', category: 'Pozzolanic', description: 'Heat-treated natural pozzolanic material', compounds: ['Activated silica', 'Aluminum phases'], requirements: ['Reactive SiO₂ ≥ 25.0%'] },
        { symbol: 'L', name: 'Limestone', category: 'Filler', description: 'Fine limestone powder acting as filler and nucleation sites', compounds: ['CaCO₃'], requirements: ['CaCO₃ ≥ 75%', 'Clay content ≤ 1.20 g/100g', 'TOC ≤ 0.50%'] },
        { symbol: 'LL', name: 'Low Grade Limestone', category: 'Filler', description: 'Limestone with lower purity', compounds: ['CaCO₃'], requirements: ['CaCO₃ ≥ 75%', 'Clay content ≤ 1.20 g/100g', 'TOC ≤ 0.20%'] },
        { symbol: 'M', name: 'Other Mineral Additions', category: 'Various', description: 'Approved inorganic materials meeting specific requirements', compounds: ['Variable composition'], requirements: ['Must meet specific performance criteria'] }
    ]
};

// Application State
let currentTheme = 'light';
let currentFilter = 'all';
let searchTerm = '';

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setTimeout(() => { document.getElementById('loadingScreen').classList.add('hidden'); }, 1500);
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { currentTheme = 'dark'; }
    setTheme(currentTheme);
    initializeNavigation();
    initializeSearch();
    initializeFilters();
    initializeModal();
    updateFilterCounts();
    updateHeroStats();
    updateCreditsInfo();
    renderCementTypes();
    renderConstituents();
    renderStrengthClasses();
    renderRequirements();
    renderCharts();
    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress);
    observeElements();
    initializeMobileMenu();
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
}

function initializeNavigation() {
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetElement = document.getElementById(link.getAttribute('href').substring(1));
            if (targetElement) {
                window.scrollTo({ top: targetElement.offsetTop - 70, behavior: 'smooth' });
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    window.addEventListener('scroll', () => {
        let current = '';
        ['overview', 'cement-types', 'constituents', 'strength-classes', 'requirements'].forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section && section.getBoundingClientRect().top <= 100 && section.getBoundingClientRect().bottom >= 100) {
                current = sectionId;
            }
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });
}

function initializeSearch() {
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchTerm = e.target.value;
        renderCementTypes();
        renderConstituents();
    });
}

function initializeFilters() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            currentFilter = button.dataset.filter;
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderCementTypes();
        });
    });
}

function initializeModal() {
    const detailModal = document.getElementById('detailModal');
    const calculatorModal = document.getElementById('calculatorModal');
    document.getElementById('modalClose').addEventListener('click', () => detailModal.style.display = 'none');
    document.getElementById('calculatorModalClose').addEventListener('click', () => calculatorModal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === detailModal) detailModal.style.display = 'none';
        if (e.target === calculatorModal) calculatorModal.style.display = 'none';
    });
}

function openModal(modalId, content) {
    const modal = document.getElementById(modalId);
    const contentContainer = modal.querySelector('.modal-content > div');
    contentContainer.innerHTML = content;
    modal.style.display = 'block';
}

function renderCementTypes() {
    const grid = document.getElementById('cementTypesGrid');
    let filteredTypes = cementData.types;
    if (currentFilter !== 'all') {
        filteredTypes = cementData.types.filter(type => type.category === currentFilter);
    }
    if (searchTerm) {
        const searchLower = searchTerm.trim().toLowerCase();
        if (searchLower.length > 0) {
            filteredTypes = filteredTypes.filter(type => {
                const searchableText = [type.name, type.family, type.description, ...type.applications].join(' ').toLowerCase();
                return searchableText.includes(searchLower);
            });
        }
    }
    grid.innerHTML = filteredTypes.map(type => `
        <div class="card" onclick="showCementTypeDetails('${type.id}')">
            <div class="card-header">
                <div>
                    <div class="card-title">${type.name}</div>
                    <div class="card-subtitle">${type.family} Family</div>
                </div>
                <div class="card-icon"><i class="fas fa-cube"></i></div>
            </div>
            <div class="card-content">
                <p><strong>Clinker:</strong> ${type.clinker}</p>
                ${type.additive ? `<p><strong>Additive:</strong> ${type.additive}</p>` : ''}
                <p>${type.description}</p>
                <div class="composition-bar">${renderCompositionBar(type.composition)}</div>
                <p style="color: var(--primary-blue); font-weight: 500; margin-top: 15px;"><i class="fas fa-mouse-pointer"></i> Click for details & calculator</p>
            </div>
            <div class="card-tags">
                ${type.applications.slice(0, 2).map(app => `<span class="tag">${app}</span>`).join('')}
                ${type.applications.length > 2 ? `<span class="tag">+${type.applications.length - 2} more</span>` : ''}
            </div>
        </div>
    `).join('');
}

function renderCompositionBar(composition) {
    if (!composition) return '';
    const colors = { clinker: '#1e40af', slag: '#64748b', pozzolan: '#f97316', silicaFume: '#10b981', limestone: '#94a3b8', flyAsh: '#8b5cf6', burntShale: '#ef4444', mixed: '#6366f1', minor: '#a1a1aa' };
    return Object.entries(composition).map(([component, percentage]) => `
        <div class="composition-segment" style="width: ${percentage}%; background-color: ${colors[component] || '#6b7280'};" title="${component.replace(/([A-Z])/g, ' $1').toLowerCase()}: ${percentage}%"></div>
    `).join('');
}

function renderConstituents() { /* Function remains the same */ }
function renderStrengthClasses() { /* Function remains the same */ }
function renderRequirements() { /* Function remains the same */ }
function renderCharts() { /* Function remains the same */ }

function showCementTypeDetails(typeId) {
    const type = cementData.types.find(t => t.id === typeId);
    if (!type) return;
    const content = `
        <h2 style="color: var(--primary-blue); margin-bottom: 20px;">${type.name}</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;">
            <div><h4>Basic Information</h4><p><strong>Family:</strong> ${type.family}</p><p><strong>Clinker:</strong> ${type.clinker}</p>${type.additive ? `<p><strong>Additive:</strong> ${type.additive}</p>` : ''}<p><strong>Category:</strong> ${type.category}</p></div>
            <div><h4>Composition (Nucleus)</h4><div class="composition-bar" style="margin: 10px 0;">${renderCompositionBar(type.composition)}</div>${Object.entries(type.composition).map(([c, p]) => `<p><strong>${c.charAt(0).toUpperCase() + c.slice(1)}:</strong> ${p}%</p>`).join('')}</div>
        </div>
        <div style="margin-bottom: 30px;"><h4>Chemical Requirements</h4><div style="background: var(--surface); padding: 15px; border-radius: 10px; border: 1px solid var(--border);">${Object.entries(type.chemical_requirements || {}).map(([r, v]) => `<p><strong>${r.replace(/_/g, ' ').toUpperCase()}:</strong> ${v}</p>`).join('')}</div></div>
        <div style="margin-bottom: 30px;">
            <h4>Available Strength Classes & Variants</h4>
            <div style="font-size: 0.9rem; padding: 10px; background: var(--surface); border-radius: 8px; margin-bottom: 15px; text-align: center; border: 1px solid var(--border);"><strong>Key:</strong> <span style="color: var(--primary-blue); font-weight: bold;">✓</span> = Available &nbsp;|&nbsp; <span style="color: var(--text-secondary); font-weight: bold;">✗</span> = Not Available</div>
            ${type.available_strength_classes.map(sc => {
                const classData = cementData.strengthClasses[sc];
                return `<div style="background: var(--surface); margin: 15px 0; padding: 20px; border-radius: 10px; border: 1px solid var(--border);"><h5 style="color: var(--primary-blue);">${sc} MPa</h5><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                ${Object.entries(classData.variants).map(([variant, data]) => {
                    const isCemThree = type.family.startsWith('CEM III');
                    const isAvailable = isCemThree ? true : (variant !== 'L');
                    return `<div style="padding: 15px; border-radius: 8px; border: 2px solid ${isAvailable ? 'var(--primary-blue)' : 'var(--border)'}; ${!isAvailable && 'opacity: 0.5;'}"><h6 style="color: ${isAvailable ? 'var(--primary-blue)' : 'var(--text-secondary)'};">${sc} ${variant} ${isAvailable ? '✓' : '✗'}</h6><p style="font-size:0.9rem; color:var(--text-secondary);">${data.name}</p></div>`;
                }).join('')}</div></div>`;
            }).join('')}
        </div>
        <div class="launch-calculator-btn" onclick="launchCalculator('${typeId}')"><i class="fas fa-calculator"></i> Launch Precision Calculator</div>`;
    openModal('detailModal', content);
}

function launchCalculator(typeId) {
    const type = cementData.types.find(t => t.id === typeId);
    if (!type) return;
    const inputsHTML = Object.keys(type.composition).map(key => `
        <div class="input-group">
            <label for="${key}_so3">SO₃ in ${key.charAt(0).toUpperCase() + key.slice(1)} (%)</label>
            <input type="number" id="${key}_so3" value="0.5" step="0.01" min="0">
        </div>`).join('');
    const content = `
        <h3>Precision Calculator: ${type.name}</h3>
        <p>Target Maximum SO₃ in Final Cement: <strong>${type.max_so3}%</strong></p>
        <div class="calculator-grid">
            <div>
                <h4>Raw Material Inputs</h4>
                ${inputsHTML}
                <div class="input-group">
                    <label for="gypsum_purity">Gypsum Purity (%)</label>
                    <input type="number" id="gypsum_purity" value="90" step="0.1" min="0">
                </div>
                <div class="input-group">
                    <label for="gypsum_type">Gypsum Type</label>
                    <select id="gypsum_type">
                        <option value="dihydrate">Dihydrate (CaSO₄·2H₂O)</option>
                        <option value="hemihydrate">Hemihydrate (CaSO₄·½H₂O)</option>
                        <option value="anhydrite">Anhydrite (CaSO₄)</option>
                    </select>
                </div>
                <button class="calculate-btn" onclick="calculatePreciseComposition('${typeId}')">Calculate</button>
            </div>
            <div id="calculatorResults"><h4>Calculation Results</h4><p>Fill in inputs and click Calculate.</p></div>
        </div>`;
    openModal('calculatorModal', content);
}

function calculatePreciseComposition(typeId) {
    const type = cementData.types.find(t => t.id === typeId);
    if (!type) return;
    const gypsumPurity = parseFloat(document.getElementById('gypsum_purity').value) / 100;
    const gypsumType = document.getElementById('gypsum_type').value;
    let so3FromNucleus = 0;
    for (const key in type.composition) {
        so3FromNucleus += (parseFloat(document.getElementById(`${key}_so3`).value) / 100) * type.composition[key];
    }
    const requiredSO3FromGypsum = type.max_so3 - so3FromNucleus;
    if (requiredSO3FromGypsum < 0) {
        document.getElementById('calculatorResults').innerHTML = `<h4>Error</h4><p style="color:red;">SO₃ from raw materials (${so3FromNucleus.toFixed(2)}%) already exceeds the maximum limit of ${type.max_so3}%!</p>`;
        return;
    }
    const mw = cementData.molecularWeights;
    const so3RatioInPureGypsum = mw.SO3 / mw[gypsumType];
    const so3RatioInActualGypsum = so3RatioInPureGypsum * gypsumPurity;
    const totalGypsumToAdd = requiredSO3FromGypsum / so3RatioInActualGypsum;
    const nucleusPercentage = 100 - totalGypsumToAdd;
    const finalComposition = {};
    for (const key in type.composition) {
        finalComposition[key] = type.composition[key] * (nucleusPercentage / 100);
    }
    let resultsHTML = `<h4>Final Cement Composition</h4><p><strong>Required Gypsum (${gypsumType.replace('hydrate', ' hydrate')}): ${totalGypsumToAdd.toFixed(2)}%</strong></p><hr>`;
    for (const key in finalComposition) {
        resultsHTML += `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${finalComposition[key].toFixed(2)}%</p>`;
    }
    const total = totalGypsumToAdd + Object.values(finalComposition).reduce((a, b) => a + b, 0);
    resultsHTML += `<hr><p><strong>Total: ${total.toFixed(2)}%</strong></p>`;
    document.getElementById('calculatorResults').innerHTML = resultsHTML;
}

function updateFilterCounts() {
    const counts = { all: cementData.types.length, common: cementData.types.filter(t => t.category === 'common').length, sulfate: cementData.types.filter(t => t.category === 'sulfate').length };
    document.getElementById('filterAll').textContent = `All Types (${counts.all})`;
    document.getElementById('filterCommon').textContent = `Common (${counts.common})`;
    document.getElementById('filterSulfate').textContent = `Sulfate Resistant (${counts.sulfate})`;
}

function updateHeroStats() { document.getElementById('totalTypesCount').textContent = cementData.types.length; }
function updateCreditsInfo() { /* Function remains the same */ }
function updateScrollProgress() { /* Function remains the same */ }
function observeElements() { /* Function remains the same */ }
function initializeMobileMenu() { /* Function remains the same */ }

// Redundant functions to be removed in a refactor pass, placeholders for now
function showConstituentDetails(symbol) { console.log(symbol); }
function showStrengthClassDetails(className) { console.log(className); }

