import { ECodeData } from '../components/ECode';

// Database populated from the provided schema structure
const rawEcodeDatabase = [
    {
      "E-Code": "E100",
      "Chemical_Name": "Curcumin (C.I. 75300)",
      "Description": "Colouring",
      "Remarks": "Orange-yellow colouring extracted from the rhizome of a plant of the ginger family called *Curcuma longa* (turmeric)",
      "HALAL": true
    },
    {
      "E-Code": "E101",
      "Chemical_Name": "Riboflavin/Lactofavin/Vitamin B2 *",
      "Description": "Colouring/ Vitamin",
      "Remarks": "Yellow or orange-yellow colouring manufactured from yeast or other fermenting organisms. May also be synthesised from xylene, ribose or alloxan",
      "HALAL": false
    },
    {
      "E-Code": "E102",
      "Chemical_Name": "Tartrazine/FD&C Yellow 5 (C.I. 19140)",
      "Description": "Colouring",
      "Remarks": "Synthetic yellow colouring",
      "HALAL": true
    },
    {
      "E-Code": "E104",
      "Chemical_Name": "Quinoline Yellow (C.I. 47005)",
      "Description": "Colouring",
      "Remarks": "Synthetic dull yellow colouring",
      "HALAL": true
    },
    {
      "E-Code": "E107",
      "Chemical_Name": "Yellow 2G (C.I. 18965)",
      "Description": "Colouring",
      "Remarks": "Synthetic yellow colouring",
      "HALAL": true
    },
    {
      "E-Code": "E110",
      "Chemical_Name": "Sunset Yellow FCF/FD&C Yellow 6 (C.I. 15985)",
      "Description": "Colouring",
      "Remarks": "Synthetic yellow colouring",
      "HALAL": true
    },
    {
      "E-Code": "E120",
      "Chemical_Name": "Cochineal/Carmines (C.I. 75470)",
      "Description": "Colouring",
      "Remarks": "Natural red colouring which may be extracted from the bodies of female insects called *Dactilopius coccus*",
      "HALAL": true
    },
    {
      "E-Code": "E122",
      "Chemical_Name": "Carmoisine/Azorubine (C.I. 14720)",
      "Description": "Colouring",
      "Remarks": "Synthetic red colouring",
      "HALAL": true
    },
    {
      "E-Code": "E123",
      "Chemical_Name": "Amaranth/FD&C Red 2 (C.I. 16185)",
      "Description": "Colouring",
      "Remarks": "Synthetic purplish red colouring",
      "HALAL": true
    },
    {
      "E-Code": "E124",
      "Chemical_Name": "Ponceau 4R/Cochineal Red A (C.I. 16255)",
      "Description": "Colouring",
      "Remarks": "Synthetic red colouring",
      "HALAL": true
    },
    {
      "E-Code": "E127",
      "Chemical_Name": "Erythrosine/FD&C Red 3 (C.I. 45430)",
      "Description": "Colouring",
      "Remarks": "Synthetic cherry pink to red colouring",
      "HALAL": true
    },
    {
      "E-Code": "E128",
      "Chemical_Name": "Red 2G (C.I. 18050)",
      "Description": "Colouring",
      "Remarks": "Synthetic red colouring",
      "HALAL": true
    },
    {
      "E-Code": "E129",
      "Chemical_Name": "Allura Red AC/Food Red 17/FD&C Red 40 (C.I. 16035)",
      "Description": "Colouring",
      "Remarks": "Synthetic red colouring",
      "HALAL": true
    },
    {
      "E-Code": "E131",
      "Chemical_Name": "Patent Blue V (C.I. 42051)",
      "Description": "Colouring",
      "Remarks": "Synthetic dark bluish-violet colour",
      "HALAL": true
    },
    {
      "E-Code": "E132",
      "Chemical_Name": "Indigo Carmine/Indigotine/FD&C Blue 2 (C.I. 73015)",
      "Description": "Colouring",
      "Remarks": "Synthetic blue colouring",
      "HALAL": true
    },
    {
      "E-Code": "E133",
      "Chemical_Name": "Brilliant Blue FCF/FD&C Blue 1 (C.I. 42090)",
      "Description": "Colouring",
      "Remarks": "Synthetic blue colouring",
      "HALAL": true
    },
    {
      "E-Code": "E140",
      "Chemical_Name": "Chlorophyll (C.I. 75810)*",
      "Description": "Colouring",
      "Remarks": "Natural olive to dark green colouring found in many plants. Solvents such as ethanol are used in the extraction of chlorophyll",
      "HALAL": false
    },
    {
      "E-Code": "E141",
      "Chemical_Name": "Copper Complexes of Chlorophyll (C.I. 75810)*",
      "Description": "Colouring",
      "Remarks": "Olive-green colouring which is derived from the substitution of magnesium ion in chlorophyll with copper",
      "HALAL": false
    },
    {
      "E-Code": "E142",
      "Chemical_Name": "Green S/Acid Brilliant Green BS/Food green S/Lissamine green (C.I.44090)",
      "Description": "Colouring",
      "Remarks": "Synthetic green colouring",
      "HALAL": true
    },
    {
      "E-Code": "E150",
      "Chemical_Name": "Caramel",
      "Description": "Colouring",
      "Remarks": "Dark brown colouring prepared by the controlled heat treatment of carbohydrates (e.g. glucose syrup, sucrose)",
      "HALAL": true
    },
    {
      "E-Code": "E151",
      "Chemical_Name": "Brilliant Black BN (C.I. 28440)",
      "Description": "Colouring",
      "Remarks": "Synthetic black colouring",
      "HALAL": true
    },
    {
      "E-Code": "E153",
      "Chemical_Name": "Carbon Black/Vegetable Carbon*",
      "Description": "Colouring",
      "Remarks": "Black colouring which may be prepared from animal charcoal or vegetable sources. The commercial source is mainly from plant material",
      "HALAL": false
    },
    {
      "E-Code": "E154",
      "Chemical_Name": "Brown FK/Food Brown",
      "Description": "Colouring",
      "Remarks": "Synthetic brown colouring",
      "HALAL": true
    },
    {
      "E-Code": "E155",
      "Chemical_Name": "Brown HT/Chocolate Brown HT (C.I. 20285)",
      "Description": "Colouring",
      "Remarks": "Synthetic brown colouring",
      "HALAL": true
    },
    {
      "E-Code": "E160a",
      "Chemical_Name": "Alpha-/Beta-/Gamma-Carotene (C.I. 75130)*",
      "Description": "Colouring",
      "Remarks": "Orange-yellow colouring which is naturally found in many plants including in carrots. May be commercially synthesised in the laboratory",
      "HALAL": false
    },
    {
      "E-Code": "E160b",
      "Chemical_Name": "Annatto/Bixin/Norbixin (C.I. 75120)*",
      "Description": "Colouring",
      "Remarks": "Yellow to peach colouring naturally found in the pericarp (seed coat) of the Annato tree. May be extracted by means of water-soluble or oil-soluble methods",
      "HALAL": false
    },
    {
      "E-Code": "E160c",
      "Chemical_Name": "Capsanthin/Capsorubin/Paprika extract*",
      "Description": "Colouring",
      "Remarks": "Red to orange colouring prepared by solvent extraction of the fruit pods and seeds of *Capsicum annuum*",
      "HALAL": false
    },
    {
      "E-Code": "E160d",
      "Chemical_Name": "Lycopene (C.I. 75125)*",
      "Description": "Colouring",
      "Remarks": "Natural red colouring extracted from tomatoes",
      "HALAL": false
    },
    {
      "E-Code": "E160e",
      "Chemical_Name": "Beta-apo-8'-carotenal/Beta-8’-apocarotenal*",
      "Description": "Colouring",
      "Remarks": "Synthetic orange to yellowish-red colouring",
      "HALAL": false
    },
    {
      "E-Code": "E160f",
      "Chemical_Name": "Ethyl ester of Beta-apo-8-carotenoic acid*",
      "Description": "Colouring",
      "Remarks": "Synthetic orange to yellow colouring",
      "HALAL": false
    },
    {
      "E-Code": "E161a",
      "Chemical_Name": "Flavoxanthin*",
      "Description": "Colouring",
      "Remarks": "Yellow colouring which is a derivative of carotene (E160a). May contain other substances such as oils and fats derived from the source material",
      "HALAL": false
    },
    {
      "E-Code": "E161b",
      "Chemical_Name": "Lutein*",
      "Description": "Colouring",
      "Remarks": "Natural yellow to reddish colouring taken from plant extract. May also be obtained from the same source as chlorophyll (E140)",
      "HALAL": false
    },
    {
      "E-Code": "E161c",
      "Chemical_Name": "Cryptoxanthin*",
      "Description": "Colouring",
      "Remarks": "Yellow colouring present in plants, orange rind, egg yolk and butter",
      "HALAL": false
    },
    {
      "E-Code": "E161d",
      "Chemical_Name": "Rubixanthin*",
      "Description": "Colouring",
      "Remarks": "Yellow colouring present in rosehips",
      "HALAL": false
    },
    {
      "E-Code": "E161e",
      "Chemical_Name": "Violaxanthin*",
      "Description": "Colouring",
      "Remarks": "Yellow colouring taken from plants e.g. yellow pansies",
      "HALAL": false
    },
    {
      "E-Code": "E161f",
      "Chemical_Name": "Rhodoxanthin*",
      "Description": "Colouring",
      "Remarks": "Yellow colouring found in the seeds of the yew tree",
      "HALAL": false
    },
    {
      "E-Code": "E161g",
      "Chemical_Name": "Canthaxanthin (C.I. 40850)*",
      "Description": "Colouring",
      "Remarks": "Orange colouring isolated from some mushrooms. May be commercially produced as part of the synthesis of carotene (E160a)",
      "HALAL": false
    },
    {
      "E-Code": "E162",
      "Chemical_Name": "Beet Red/Betanin/Betanidin",
      "Description": "Colouring",
      "Remarks": "Deep purplish-red colouring extracted from beetroot",
      "HALAL": true
    },
    {
      "E-Code": "E163",
      "Chemical_Name": "Anthocyanins*",
      "Description": "Colouring",
      "Remarks": "Red, blue colouring extracted from grape-skin extract and/or red cabbage by means of water, methanol or ethanol",
      "HALAL": false
    },
    {
      "E-Code": "E170",
      "Chemical_Name": "Calcium Carbonate/Chalk (C.I. 77220)*",
      "Description": "Inorganic colouring",
      "Remarks": "May be extracted from naturally occurring white mineral or animal bones",
      "HALAL": false
    },
    {
      "E-Code": "E171",
      "Chemical_Name": "Titanium Dioxide (C.I. 77891)",
      "Description": "Inorganic colouring",
      "Remarks": "White colouring prepared from naturally occurring mineral ilmenite",
      "HALAL": true
    },
    {
      "E-Code": "E172",
      "Chemical_Name": "Iron Oxides/Red: 77491/Black: 77499 (Yellow: C.I. 77492)",
      "Description": "Inorganic colouring",
      "Remarks": "Yellow, red, orange, brown and black colouring from naturally occurring pigments or iron",
      "HALAL": true
    },
    {
      "E-Code": "E173",
      "Chemical_Name": "Aluminium (C.I. 77000)",
      "Description": "Inorganic colouring",
      "Remarks": "Naturally occurring metallic colour from bauxite",
      "HALAL": true
    },
    {
      "E-Code": "E174",
      "Chemical_Name": "Silver (C.I. 77820)",
      "Description": "Inorganic colouring",
      "Remarks": "Metallic colour from naturally occurring metal",
      "HALAL": true
    },
    {
      "E-Code": "E175",
      "Chemical_Name": "Gold (C.I. 77480)",
      "Description": "Inorganic colouring",
      "Remarks": "Metallic colour from naturally occurring metal",
      "HALAL": true
    },
    {
      "E-Code": "E180",
      "Chemical_Name": "Pigment Rubine/Lithol Rubine BK (C.I. 15850)",
      "Description": "Inorganic colouring",
      "Remarks": "Synthetic red colouring",
      "HALAL": true
    },
    {
      "E-Code": "E200",
      "Chemical_Name": "Sorbic Acid",
      "Description": "Preservative",
      "Remarks": "Naturally occurring in some fruits. May be synthetically manufactured from ketene",
      "HALAL": true
    },
    {
      "E-Code": "E201",
      "Chemical_Name": "Sodium Sorbate",
      "Description": "Preservative",
      "Remarks": "Manufactured by neutralisation of sorbic acid (E200)",
      "HALAL": true
    },
    {
      "E-Code": "E202",
      "Chemical_Name": "Potassium Sorbate",
      "Description": "Preservative",
      "Remarks": "Manufactured by neutralisation of sorbic acid (E200)",
      "HALAL": true
    },
    {
      "E-Code": "E203",
      "Chemical_Name": "Calcium Sorbate",
      "Description": "Preservative",
      "Remarks": "Manufactured by neutralisation of sorbic acid (E200)",
      "HALAL": true
    },
    {
      "E-Code": "E210",
      "Chemical_Name": "Benzoic Acid",
      "Description": "Preservative",
      "Remarks": "Naturally occurring in many edible berries, fruits and vegetables. May also be synthetically produced",
      "HALAL": true
    },
    {
      "E-Code": "E211",
      "Chemical_Name": "Sodium Benzoate",
      "Description": "Preservative",
      "Remarks": "Sodium salt of benzoic acid (E210)",
      "HALAL": true
    },
    {
      "E-Code": "E212",
      "Chemical_Name": "Potassium Benzoate",
      "Description": "Preservative",
      "Remarks": "Potassium salt of benzoic acid (E210)",
      "HALAL": true
    },
    {
      "E-Code": "E213",
      "Chemical_Name": "Calcium Benzoate",
      "Description": "Preservative",
      "Remarks": "Calcium salt of benzoic acid (E210)",
      "HALAL": true
    },
    {
      "E-Code": "E214",
      "Chemical_Name": "Ethyl 4-hydroxybenzoate/Ethyl para-hydroxybenzoate",
      "Description": "Preservative",
      "Remarks": "Manufactured from benzoic acid (E210)",
      "HALAL": true
    },
    {
      "E-Code": "E215",
      "Chemical_Name": "Ethyl 4-hydroxybenzoate, Sodium Salt/Sodium ethyl para-hydroxybenzoate",
      "Description": "Preservative",
      "Remarks": "Manufactured from benzoic acid (E210)",
      "HALAL": true
    },
    {
      "E-Code": "E216",
      "Chemical_Name": "Propyl 4-hydroxybenzoate/Propylparaben",
      "Description": "Preservative",
      "Remarks": "Manufactured from benzoic acid (E210)",
      "HALAL": true
    },
    {
      "E-Code": "E217",
      "Chemical_Name": "Propyl 4-hydroxybenzoate, Sodium Salt",
      "Description": "Preservative",
      "Remarks": "Manufactured from benzoic acid (E210)",
      "HALAL": true
    },
    {
      "E-Code": "E218",
      "Chemical_Name": "Methyl 4-hydroxybenzoate/Methylparaben",
      "Description": "Preservative",
      "Remarks": "Manufactured from benzoic acid (E210)",
      "HALAL": true
    },
    {
      "E-Code": "E219",
      "Chemical_Name": "Methyl 4-hydroxybenzoate, Sodium Salt",
      "Description": "Preservative",
      "Remarks": "Manufactured from benzoic acid (E210)",
      "HALAL": true
    },
    {
      "E-Code": "E220",
      "Chemical_Name": "Sulphur Dioxide",
      "Description": "Preservative",
      "Remarks": "Manufactured chemically by the combustion of sulphur or gypsum",
      "HALAL": true
    },
    {
      "E-Code": "E221",
      "Chemical_Name": "Sodium Sulphite",
      "Description": "Preservative",
      "Remarks": "Sodium salt of sulphurous acid",
      "HALAL": true
    },
    {
      "E-Code": "E222",
      "Chemical_Name": "Sodium Hydrogen Sulphite/Sodium Bisulphite",
      "Description": "Preservative",
      "Remarks": "Sodium salt of sulphurous acid",
      "HALAL": true
    },
    {
      "E-Code": "E223",
      "Chemical_Name": "Sodium Metabisulphite",
      "Description": "Preservative",
      "Remarks": "Sodium salt of sulphurous acid",
      "HALAL": true
    },
    {
      "E-Code": "E224",
      "Chemical_Name": "Potassium Metabisulphite/Potassium Pyrosulphite",
      "Description": "Preservative",
      "Remarks": "Potassium salt of sulphurous acid",
      "HALAL": true
    },
    {
      "E-Code": "E225",
      "Chemical_Name": "Potassium Sulphite",
      "Description": "Preservative",
      "Remarks": "Potassium salt of sulphurous acid",
      "HALAL": true
    },
    {
      "E-Code": "E226",
      "Chemical_Name": "Calcium Sulphite",
      "Description": "Preservative",
      "Remarks": "Calcium salt of sulphurous acid",
      "HALAL": true
    },
    {
      "E-Code": "E227",
      "Chemical_Name": "Calcium Hydrogen Sulphite/Calcium Bisulphite",
      "Description": "Preservative",
      "Remarks": "Calcium salt of sulphurous acid",
      "HALAL": true
    },
    {
      "E-Code": "E230",
      "Chemical_Name": "Biphenyl/Diphenyl",
      "Description": "Preservative",
      "Remarks": "Synthetically produced by action of heat on benzene",
      "HALAL": true
    },
    {
      "E-Code": "E231",
      "Chemical_Name": "2-Hydroxybiphenyl",
      "Description": "Preservative",
      "Remarks": "Manufactured from phenyl ether or dibenzofuran",
      "HALAL": true
    },
    {
      "E-Code": "E232",
      "Chemical_Name": "Sodium Biphenyl-2-yl-oxide",
      "Description": "Preservative",
      "Remarks": "Synthetically produced",
      "HALAL": true
    },
    {
      "E-Code": "E233",
      "Chemical_Name": "2-(Thiazol-4-yl) Benzimidazole",
      "Description": "Preservative",
      "Remarks": "Chemically synthesised",
      "HALAL": true
    },
    {
      "E-Code": "E234",
      "Chemical_Name": "Nisin*",
      "Description": "Preservative",
      "Remarks": "Produced by the growth of a bacterium called Streptococcus lactis.",
      "HALAL": false
    },
    {
      "E-Code": "E235",
      "Chemical_Name": "Natamycin/Pimaricin*",
      "Description": "Preservative",
      "Remarks": "Produced by the growth of a bacterium called Strepmycess natalensis",
      "HALAL": false
    },
    {
      "E-Code": "E236",
      "Chemical_Name": "Formic Acid",
      "Description": "Preservative",
      "Remarks": "Produced commercially by heating carbon monoxide and sodium hydroxide under pressure and decomposing the resulting sodium formate with sulphuric acid",
      "HALAL": true
    },
    {
      "E-Code": "E237",
      "Chemical_Name": "Sodium Formate",
      "Description": "Preservative",
      "Remarks": "Sodium salt of formic acid (E236)",
      "HALAL": true
    },
    {
      "E-Code": "E238",
      "Chemical_Name": "Calcium Formate",
      "Description": "Preservative",
      "Remarks": "Calcium salt of formic acid (E236)",
      "HALAL": true
    },
    {
      "E-Code": "E239",
      "Chemical_Name": "Hexamine",
      "Description": "Preservative",
      "Remarks": "Manufactured from formaldehyde and ammonia",
      "HALAL": true
    },
    {
      "E-Code": "E249",
      "Chemical_Name": "Potassium Nitrite",
      "Description": "Preservative",
      "Remarks": "Potassium salt of nitrous acid",
      "HALAL": true
    },
    {
      "E-Code": "E250",
      "Chemical_Name": "Sodium Nitrite",
      "Description": "Preservative",
      "Remarks": "Manufactured from sodium nitrate by bacterial or chemical actions",
      "HALAL": true
    },
    {
      "E-Code": "E251",
      "Chemical_Name": "Sodium Nitrate",
      "Description": "Preservative",
      "Remarks": "Naturally occurring mineral",
      "HALAL": true
    },
    {
      "E-Code": "E252",
      "Chemical_Name": "Potassium Nitrate/Saltpetre*",
      "Description": "Preservative",
      "Remarks": "Naturally occurring mineral. May also be artificially produced from vegetable material and waste animal",
      "HALAL": false
    },
    {
      "E-Code": "E260",
      "Chemical_Name": "Acetic Acid*",
      "Description": "Food Acid",
      "Remarks": "Commercially manufactured by the action of methanol and carbon monoxide. The acetic acid in vinegar may be produced by the action of bacterium Acetobacter on alcohol",
      "HALAL": false
    },
    {
      "E-Code": "E261",
      "Chemical_Name": "Potassium Acetate",
      "Description": "Food Acid",
      "Remarks": "Potassium salt of acetic acid (E260)",
      "HALAL": true
    },
    {
      "E-Code": "E262",
      "Chemical_Name": "Sodium Acetate",
      "Description": "Food Acid",
      "Remarks": "Sodium salt of acetic acid (E260)",
      "HALAL": true
    },
    {
      "E-Code": "E263",
      "Chemical_Name": "Calcium Acetate",
      "Description": "Food Acid",
      "Remarks": "Calcium salt of acetic acid (E260)",
      "HALAL": true
    },
    {
      "E-Code": "E264",
      "Chemical_Name": "Ammonium Acetate",
      "Description": "Food Acid",
      "Remarks": "Ammonium salt of acetic acid (E260)",
      "HALAL": true
    },
    {
      "E-Code": "E270",
      "Chemical_Name": "Lactic Acid*",
      "Description": "Food Acid",
      "Remarks": "Commercially produced by heat treatment of carbohydrate, such as whey, and fermented by bacteria such as Bacillus acidilacti, Lactobacillus delbueckii or L. bulgaricus",
      "HALAL": false
    },
    {
      "E-Code": "E280",
      "Chemical_Name": "Propionic Acid*",
      "Description": "Preservative",
      "Remarks": "May be commercially derived from natural gas or from wood pulp waste liquor by the fermentation activity of Propionibacteria",
      "HALAL": false
    },
    {
      "E-Code": "E281",
      "Chemical_Name": "Sodium Propionate*",
      "Description": "Preservative",
      "Remarks": "Sodium salt of propionic acid (E280)",
      "HALAL": false
    },
    {
      "E-Code": "E282",
      "Chemical_Name": "Calcium Propionate*",
      "Description": "Preservative",
      "Remarks": "Calcium salt of propionic acid (E280)",
      "HALAL": false
    },
    {
      "E-Code": "E283",
      "Chemical_Name": "Potassium Propionate*",
      "Description": "Preservative",
      "Remarks": "Potassium salt of propionic acid (E280)",
      "HALAL": false
    },
    {
      "E-Code": "E290",
      "Chemical_Name": "Carbon Dioxide",
      "Description": "Propellant",
      "Remarks": "Naturally occuring. May also be produced by way of fermentation or acid-carbonate reaction",
      "HALAL": true
    },
    {
      "E-Code": "E296",
      "Chemical_Name": "Malic Acid (DL- or L-)",
      "Description": "Food Acid",
      "Remarks": "Commercially synthesised by means of heating malic with sulphuric acid",
      "HALAL": true
    },
    {
      "E-Code": "E297",
      "Chemical_Name": "Fumaric Acid*",
      "Description": "Food Acid",
      "Remarks": "Commercially prepared by glucose fermentation using fungi such as Rhizopus nigricans",
      "HALAL": false
    },
    {
      "E-Code": "E300",
      "Chemical_Name": "L-Ascorbic Acid/Vitamin C*",
      "Description": "Antioxidant/ Vitamin",
      "Remarks": "Occurs naturally in many fruits and vegetables. May be synthesised from the hydrogenation of glucose to sorbitol and its eventual conversion to ascorbic acid. May also be biologically synthesised through means of fermentation",
      "HALAL": false
    },
    {
      "E-Code": "E301",
      "Chemical_Name": "Sodium Ascorbate",
      "Description": "Antioxidant/ Vitamin",
      "Remarks": "Synthetic sodium salt of ascorbic acid (E300)",
      "HALAL": true
    },
    {
      "E-Code": "E302",
      "Chemical_Name": "Calcium Ascorbate",
      "Description": "Antioxidant/ Vitamin",
      "Remarks": "Synthetic calcium salt of ascorbic acid (E300)",
      "HALAL": true
    },
    {
      "E-Code": "E303",
      "Chemical_Name": "Potassium Ascorbate",
      "Description": "Antioxidant/ Vitamin",
      "Remarks": "Synthetic potassium salt of ascorbic acid (E300)",
      "HALAL": true
    },
    {
      "E-Code": "E304",
      "Chemical_Name": "Ascorbyl Palmitate*",
      "Description": "Antioxidant/ Vitamin",
      "Remarks": "Ascorbic acid ester comprising ascorbic acid and palmitic acid",
      "HALAL": false
    },
    {
      "E-Code": "E306",
      "Chemical_Name": "Tocopherol Concentrate, Mixed/Vitamin E",
      "Description": "Antioxidant/ Vitamin",
      "Remarks": "Extracts from soya bean oil, rice germ, wheat germ, maize and green leaves",
      "HALAL": true
    },
    {
      "E-Code": "E307",
      "Chemical_Name": "Synthetic Alpha-Tocopherol",
      "Description": "Antioxidant/ Vitamin",
      "Remarks": "Manufactured by chemical synthesis",
      "HALAL": true
    },
    {
      "E-Code": "E308",
      "Chemical_Name": "Synthetic Gamma-Tocopherol",
      "Description": "Antioxidant/ Vitamin",
      "Remarks": "Manufactured by chemical synthesis",
      "HALAL": true
    },
    {
      "E-Code": "E309",
      "Chemical_Name": "Synthetic Delta-Tocopherol",
      "Description": "Antioxidant/ Vitamin",
      "Remarks": "Manufactured by chemical synthesis",
      "HALAL": true
    },
    {
      "E-Code": "E310",
      "Chemical_Name": "Propyl Gallate",
      "Description": "Antioxidant",
      "Remarks": "Manufactured from gallic acid found in the tannins of nut galls. May also be produced from the hydrolysis of tannase, which may occur in spent fungal broth",
      "HALAL": true
    },
    {
      "E-Code": "E311",
      "Chemical_Name": "Octyl Gallate",
      "Description": "Antioxidant",
      "Remarks": "Manufactured from gallic acid found in the tannins of nut galls. May also be produced from the hydrolysis of tannase, which may occur in spent fungal broth",
      "HALAL": true
    },
    {
      "E-Code": "E312",
      "Chemical_Name": "Dodecyl Gallate",
      "Description": "Antioxidant",
      "Remarks": "Manufactured from gallic acid found in the tannins of nut galls. May also be produced from the hydrolysis of tannase, which may occur in spent fungal broth",
      "HALAL": true
    },
    {
      "E-Code": "E317",
      "Chemical_Name": "Erythorbic Acid/Iso-ascorbic Acid*",
      "Description": "Antioxidant",
      "Remarks": "Commercially produced from sucrose by fermentation with Penicillinum sp.",
      "HALAL": false
    },
    {
      "E-Code": "E318",
      "Chemical_Name": "Sodium Erythorbate/Sodium Iso-Ascorbate*",
      "Description": "Antioxidant",
      "Remarks": "Sodium salt of erythorbic acid (E317)",
      "HALAL": false
    },
    {
      "E-Code": "E319",
      "Chemical_Name": "tert-Butylhydroquinone/TBHQ*",
      "Description": "Antioxidant",
      "Remarks": "Derived from petroleum",
      "HALAL": false
    },
    {
      "E-Code": "E320",
      "Chemical_Name": "Butylated Hydroxyanisole (BHA)*",
      "Description": "Antioxidant",
      "Remarks": "Commercially prepared from p-methoxyphenol and isobutene",
      "HALAL": false
    },
    {
      "E-Code": "E321",
      "Chemical_Name": "Butylated Hydroxytoluene (BHT)*",
      "Description": "Antioxidant",
      "Remarks": "Prepared synthetically from p-cresol and isobutylene",
      "HALAL": false
    },
    {
      "E-Code": "E322",
      "Chemical_Name": "Lecithins*",
      "Description": "Emulsifier/Antioxidant",
      "Remarks": "Obtained from animal or vegetable materials through physical procedures. Most lecithin are commercially obtained from soya beans",
      "HALAL": false
    },
    {
      "E-Code": "E325",
      "Chemical_Name": "Sodium Lactate*",
      "Description": "Food Acid",
      "Remarks": "Sodium salt of lactic acid (E270)",
      "HALAL": false
    },
    {
      "E-Code": "E326",
      "Chemical_Name": "Potassium Lactate*",
      "Description": "Food Acid",
      "Remarks": "Potassium salt of lactic acid (E270)",
      "HALAL": false
    },
    {
      "E-Code": "E327",
      "Chemical_Name": "Calcium Lactate*",
      "Description": "Food Acid",
      "Remarks": "Calcium salt of lactic acid (E270)",
      "HALAL": false
    },
    {
      "E-Code": "E328",
      "Chemical_Name": "Ammonium Lactate*",
      "Description": "Food Acid",
      "Remarks": "Ammonium salt of lactic acid (E270)",
      "HALAL": false
    },
    {
      "E-Code": "E329",
      "Chemical_Name": "Magnesium Lactate*",
      "Description": "Food Acid",
      "Remarks": "Magnesium salt of lactic acid (E270)",
      "HALAL": false
    },
    {
      "E-Code": "E330",
      "Chemical_Name": "Citric Acid*",
      "Description": "Food Acid",
      "Remarks": "Commercially prepared by the fermentation of molasses with fungal strains of Aspergillus niger. May also be isolated from pineapple by-products and low-grade lemons",
      "HALAL": false
    },
    {
      "E-Code": "E331",
      "Chemical_Name": "Sodium Citrates*",
      "Description": "Food Acid",
      "Remarks": "Sodium salt of citric acid (E330)",
      "HALAL": false
    },
    {
      "E-Code": "E332",
      "Chemical_Name": "Potassium Citrates*",
      "Description": "Food Acid",
      "Remarks": "Potassium salt of citric acid (E330)",
      "HALAL": false
    },
    {
      "E-Code": "E333",
      "Chemical_Name": "Calcium Citrates*",
      "Description": "Food Acid",
      "Remarks": "Calcium salt of citric acid (E330)",
      "HALAL": false
    },
    {
      "E-Code": "E334",
      "Chemical_Name": "Tartaric Acid*",
      "Description": "Food Acid",
      "Remarks": "Most commercially available tartaric acid is manufactured as a by-product of the wide industry. May also be extracted from tamarind pulp",
      "HALAL": false
    },
    {
      "E-Code": "E335",
      "Chemical_Name": "Sodium Tartrate*",
      "Description": "Food Acid",
      "Remarks": "Sodium salt of tartaric acid (E334)",
      "HALAL": false
    },
    {
      "E-Code": "E336",
      "Chemical_Name": "Potassium Tartrate/Potassium Hydrogen Tartrate/Cream of Tartar *",
      "Description": "Food Acid",
      "Remarks": "By-product of the wine industry",
      "HALAL": false
    },
    {
      "E-Code": "E337",
      "Chemical_Name": "Potassium Sodium Tartrate*",
      "Description": "Food Acid",
      "Remarks": "Derivative of tartaric acid (E334)",
      "HALAL": false
    },
    {
      "E-Code": "E338",
      "Chemical_Name": "Phosphoric Acid/Orthophosphoric Acid",
      "Description": "Miscellaneous",
      "Remarks": "Manufactured from phosphate ore",
      "HALAL": true
    },
    {
      "E-Code": "E339",
      "Chemical_Name": "Sodium Phosphates",
      "Description": "Mineral Salt",
      "Remarks": "Sodium salt of phosphoric acid (E338)",
      "HALAL": true
    },
    {
      "E-Code": "E340",
      "Chemical_Name": "Potassium Phosphates",
      "Description": "Mineral Salt",
      "Remarks": "Potassium salt of phosphoric acid (E338)",
      "HALAL": true
    },
    {
      "E-Code": "E341",
      "Chemical_Name": "Calcium Phosphates",
      "Description": "Mineral Salt",
      "Remarks": "Calcium salt of phosphoric acid (E338)",
      "HALAL": true
    },
    {
      "E-Code": "E343",
      "Chemical_Name": "Magnesium Phosphates",
      "Description": "Mineral Salt",
      "Remarks": "Naturally occurring mineral",
      "HALAL": true
    },
    {
      "E-Code": "E350",
      "Chemical_Name": "Sodium Malate/Sodium Hydrogen Malate",
      "Description": "Food Acid",
      "Remarks": "Sodium salt of malic acid (E296)",
      "HALAL": true
    },
    {
      "E-Code": "E351",
      "Chemical_Name": "Potassium Malate",
      "Description": "Food Acid",
      "Remarks": "Potassium salt of malic acid (E296)",
      "HALAL": true
    },
    {
      "E-Code": "E352",
      "Chemical_Name": "Calcium Malate/Calcium Hydrogen Malate",
      "Description": "Food Acid",
      "Remarks": "Calcium salt of malic acid (E296)",
      "HALAL": true
    },
    {
      "E-Code": "E353",
      "Chemical_Name": "Metatartaric Acid*",
      "Description": "Sequestrant",
      "Remarks": "Prepared from tartaric acid (E334)",
      "HALAL": false
    },
    {
      "E-Code": "E355",
      "Chemical_Name": "Adipic Acid/Hexanedioic Acid",
      "Description": "Buffer",
      "Remarks": "Commercially produced by oxidising cyclohexanol with concentrated nitric acid",
      "HALAL": true
    },
    {
      "E-Code": "E357",
      "Chemical_Name": "Potassium Adipate",
      "Description": "Buffer",
      "Remarks": "Potassium salt of adipic acid (E355)",
      "HALAL": true
    },
    {
      "E-Code": "E363",
      "Chemical_Name": "Succinic Acid*",
      "Description": "Buffer/Food Acid*",
      "Remarks": "Commercially prepared from acetic acid (E260)",
      "HALAL": false
    },
    {
      "E-Code": "E365",
      "Chemical_Name": "Sodium Fumarate*",
      "Description": "Food Acid",
      "Remarks": "Sodium salt of fumaric acid (E297)",
      "HALAL": false
    },
    {
      "E-Code": "E366",
      "Chemical_Name": "Potassium Fumarate*",
      "Description": "Food Acid",
      "Remarks": "Potassium salt of fumaric acid (E297)",
      "HALAL": false
    },
    {
      "E-Code": "E367",
      "Chemical_Name": "Calcium Fumarate*",
      "Description": "Food Acid",
      "Remarks": "Calcium salt of fumaric acid (E297)",
      "HALAL": false
    },
    {
      "E-Code": "E370",
      "Chemical_Name": "1,4-Heptonolactone",
      "Description": "Sequestrant",
      "Remarks": "Prepared from hydroxycarboxylic acid",
      "HALAL": true
    },
    {
      "E-Code": "E375",
      "Chemical_Name": "Niacin/Nicotinic Acid/Nicotinamide",
      "Description": "Vitamin",
      "Remarks": "Commercially prepared by the oxidation of nicotine with concentrated nitric acid",
      "HALAL": true
    },
    {
      "E-Code": "E380",
      "Chemical_Name": "Triammonium Citrate*",
      "Description": "Buffer",
      "Remarks": "Ammonium salt of citric acid (E330)",
      "HALAL": false
    },
    {
      "E-Code": "E381",
      "Chemical_Name": "Ammonium Ferric Citrate*",
      "Description": "Dietary Supplement",
      "Remarks": "Prepared from citric acid (E330)",
      "HALAL": false
    },
    {
      "E-Code": "E385",
      "Chemical_Name": "Calcium Disodium EDTA",
      "Description": "Chelating Agent",
      "Remarks": "Synthetically prepared",
      "HALAL": true
    },
    {
      "E-Code": "E400",
      "Chemical_Name": "Alginic Acid",
      "Description": "Vegetable Gum",
      "Remarks": "Extracted from brown seaweeds such as the species of Laminaria, Macrocystis and Ascophyllum",
      "HALAL": true
    },
    {
      "E-Code": "E401",
      "Chemical_Name": "Sodium Alginate",
      "Description": "Vegetable Gum",
      "Remarks": "Sodium salt of alginic acid (E400)",
      "HALAL": true
    },
    {
      "E-Code": "E402",
      "Chemical_Name": "Potassium Alginate",
      "Description": "Vegetable Gum",
      "Remarks": "Potassium salt of alginic acid (E400)",
      "HALAL": true
    },
    {
      "E-Code": "E403",
      "Chemical_Name": "Ammonium Alginate",
      "Description": "Vegetable Gum",
      "Remarks": "Ammonium salt of alginic acid (E400)",
      "HALAL": true
    },
    {
      "E-Code": "E404",
      "Chemical_Name": "Calcium Alginate",
      "Description": "Vegetable Gum",
      "Remarks": "Calcium salt of alginic acid (E400)",
      "HALAL": true
    },
    {
      "E-Code": "E405",
      "Chemical_Name": "Propane-1,2-Diol Alginate/Propylene Glycol Alginate/Alginate Ester",
      "Description": "Vegetable Gum",
      "Remarks": "Propylene glycol ester of alginic acid (E400)",
      "HALAL": true
    },
    {
      "E-Code": "E406",
      "Chemical_Name": "Agar/Agar-Agar/Japanese Isinglass",
      "Description": "Vegetable Gum",
      "Remarks": "Extracted from red seaweeds such as the Gelidium amansii. May also be taken from members of the related red algae Rhodophyceae",
      "HALAL": true
    },
    {
      "E-Code": "E407",
      "Chemical_Name": "Carrageenan/Irish Moss",
      "Description": "Vegetable Gum",
      "Remarks": "Occurs naturally in red seaweeds belonging to the Gigartinaceae, Solieriaceae, Hypnaceae and Furcellariaceae families",
      "HALAL": true
    },
    {
      "E-Code": "E410",
      "Chemical_Name": "Locust Bean Gum/Carob Bean Gum",
      "Description": "Vegetable Gum",
      "Remarks": "Taken from the Locust or Carob tree (Ceratonia siliqua), which is an evergreen tree belonging to the Leguminoseae or pea family",
      "HALAL": true
    },
    {
      "E-Code": "E412",
      "Chemical_Name": "Guar Gum",
      "Description": "Vegetable Gum",
      "Remarks": "Extracted from the seeds of Cyanopsis tetragonolobus, or C. psoraloides, a member of the pea family",
      "HALAL": true
    },
    {
      "E-Code": "E413",
      "Chemical_Name": "Tragacanth/Gum Tragacanth",
      "Description": "Vegetable Gum",
      "Remarks": "Extracted from the trunk and branches of Astragalus gummifier and other species of the pea family",
      "HALAL": true
    },
    {
      "E-Code": "E414",
      "Chemical_Name": "Acacia/Gum Arabic",
      "Description": "Vegetable Gum",
      "Remarks": "Occurs naturally in the stems and branches of Acacia senegal and members of the pea family",
      "HALAL": true
    },
    {
      "E-Code": "E415",
      "Chemical_Name": "Xanthan Gum/Corn Sugar Gum*",
      "Description": "Vegetable Gum",
      "Remarks": "Produced by the fermentation of carbohydrate using a bacterium known as Xanthomonas campestris",
      "HALAL": false
    },
    {
      "E-Code": "E416",
      "Chemical_Name": "Karaya Gum/Sterculia Gum",
      "Description": "Vegetable Gum",
      "Remarks": "Occurs naturally in the trunk and stem of the tree Sterculia urens",
      "HALAL": true
    },
    {
      "E-Code": "E420",
      "Chemical_Name": "Sorbitol/Sorbitol Syrup*",
      "Description": "Humectant",
      "Remarks": "Commercially produced from glucose by hydrogenation or electrolytic reduction",
      "HALAL": false
    },
    {
      "E-Code": "E421",
      "Chemical_Name": "Mannitol/Manna Sugar",
      "Description": "Humectant",
      "Remarks": "Prepared from seaweed or manna, the dried exudate of Fraxinus omus. May be commercially prepared by the hydrogenation of invert sugar, monosaccharides and sucrose",
      "HALAL": true
    },
    {
      "E-Code": "E422",
      "Chemical_Name": "Glycerol/Glycerin*",
      "Description": "Humectant",
      "Remarks": "Industrial by-product in the manufacture of soaps, candles and fatty acids from oils and fats. May also be synthesised from propylene or by the fermentation of sugars",
      "HALAL": false
    },
    {
      "E-Code": "E430",
      "Chemical_Name": "Polyoxyethylene (8) Stearate*",
      "Description": "Emulsifier",
      "Remarks": "Synthesised using stearic acid (E570)",
      "HALAL": false
    },
    {
      "E-Code": "E431",
      "Chemical_Name": "Polyoxyethylene (40) Stearate*",
      "Description": "Emulsifier",
      "Remarks": "Synthesised using stearic acid (E570)",
      "HALAL": false
    },
    {
      "E-Code": "E432",
      "Chemical_Name": "Polyoxyethylene (20) Sorbitan Monolaurate/Polysorbate 20/Tween 20*",
      "Description": "Emulsifier",
      "Remarks": "Lauric ester of sorbitol and sorbitol anhydride",
      "HALAL": false
    },
    {
      "E-Code": "E433",
      "Chemical_Name": "Polyoxyethylene (20) Sorbitan Mono-Oleate/Polysorbate 80/Tween 80*",
      "Description": "Emulsifier",
      "Remarks": "Oleic ester of sorbitol and sorbitol anhydride",
      "HALAL": false
    },
    {
      "E-Code": "E434",
      "Chemical_Name": "Polyoxyethylene (20) Sorbitan Monopalmitate/Polysorbate 40/Tween 40*",
      "Description": "Emulsifier",
      "Remarks": "Palmitate ester of sorbitol and sorbitol anhydride",
      "HALAL": false
    },
    {
      "E-Code": "E435",
      "Chemical_Name": "Polyoxyethylene (20) Sorbitan Monostearate/Polysorbate 60/Tween 60*",
      "Description": "Emulsifier",
      "Remarks": "Stearic acid ester of sorbitol and sorbitol anhydride",
      "HALAL": false
    },
    {
      "E-Code": "E436",
      "Chemical_Name": "Polyoxyethylene (20) Sorbitan Tristearate/Polysorbate 65/Tween 65*",
      "Description": "Emulsifier",
      "Remarks": "Stearic acid ester of sorbitol and sorbitol anhydride",
      "HALAL": false
    },
    {
      "E-Code": "E440a",
      "Chemical_Name": "Pectin",
      "Description": "Stabiliser/Thickening Agent",
      "Remarks": "Apple residues and orange pith are commercial sources of pectin",
      "HALAL": true
    },
    {
      "E-Code": "E440b",
      "Chemical_Name": "Amidated Pectin",
      "Description": "Emulsifier/Stabiliser",
      "Remarks": "Derived from the treatment of pectin (E440a) with ammonia",
      "HALAL": true
    },
    {
      "E-Code": "E441",
      "Chemical_Name": "Gelatine*",
      "Description": "Emulsifier/Stabiliser",
      "Remarks": "Obtained by boiling animal skin (usually cattle or pig's), ligaments, bones, or any tissue that contains collagen",
      "HALAL": false
    },
    {
      "E-Code": "E442",
      "Chemical_Name": "Ammonium Phosphatides/Emulsifier YN",
      "Description": "Emulsifier/Stabiliser",
      "Remarks": "Prepared synthetically",
      "HALAL": true
    },
    {
      "E-Code": "E450",
      "Chemical_Name": "Sodium and Potassium Metaphosphates, Polyphosphates and Pyrophosphates",
      "Description": "Mineral Salt",
      "Remarks": "Sodium and potassium salt of phosphoric acid (E338)",
      "HALAL": true
    },
    {
      "E-Code": "E460",
      "Chemical_Name": "Microcrystalline Cellulose/Powdered Cellulose",
      "Description": "Anticaking Agent",
      "Remarks": "Prepared from the cellulose component of plant cell wall",
      "HALAL": true
    },
    {
      "E-Code": "E461",
      "Chemical_Name": "Methylcellulose/Cologel/Methocel",
      "Description": "Vegetable Gum",
      "Remarks": "Prepared from plant cellulose",
      "HALAL": true
    },
    {
      "E-Code": "E463",
      "Chemical_Name": "Hydroxypropylcellulose",
      "Description": "Vegetable Gum",
      "Remarks": "Prepared from plant cellulose",
      "HALAL": true
    },
    {
      "E-Code": "E464",
      "Chemical_Name": "Hydroxypropyl-Methylcellulose",
      "Description": "Vegetable Gum",
      "Remarks": "Prepared from plant cellulose",
      "HALAL": true
    },
    {
      "E-Code": "E465",
      "Chemical_Name": "Ethylmethylcellulose",
      "Description": "Vegetable Gum",
      "Remarks": "Prepared from plant cellulose",
      "HALAL": true
    },
    {
      "E-Code": "E466",
      "Chemical_Name": "Sodium Carboxymethylcellulose/CMC",
      "Description": "Vegetable Gum",
      "Remarks": "Prepared from plant cellulose",
      "HALAL": true
    },
    {
      "E-Code": "E469",
      "Chemical_Name": "Sodium Caseinate",
      "Description": "Emulsifier/Stabiliser",
      "Remarks": "Derived from the protein of cow's milk",
      "HALAL": true
    },
    {
      "E-Code": "E470",
      "Chemical_Name": "Sodium, Potassium and Calcium Salts of Fatty Acids*",
      "Description": "Emulsifier/Stabiliser",
      "Remarks": "Prepared from fatty acids",
      "HALAL": false
    },
    {
      "E-Code": "E471",
      "Chemical_Name": "Mono-and Diglycerides of Fatty Acids*",
      "Description": "Emulsifier/Stabiliser",
      "Remarks": "Commercially prepared from glycerin (E422) and fatty acids",
      "HALAL": false
    },
    {
      "E-Code": "E472",
      "Chemical_Name": "Various Esters of Glycerol*",
      "Description": "Emulsifier/Stabiliser",
      "Remarks": "Prepared from esters of glycerol and fatty acids",
      "HALAL": false
    },
    {
      "E-Code": "E473",
      "Chemical_Name": "Sucrose Esters of Fatty Acids*",
      "Description": "Emulsifier/Stabiliser",
      "Remarks": "Prepared from esters of glycerol and sucrose",
      "HALAL": false
    },
    {
      "E-Code": "E474",
      "Chemical_Name": "Sucroglycerides*",
      "Description": "Emulsifier/Stabiliser",
      "Remarks": "Prepared by the action of sucrose on natural triglycerides (from lard, tallow, palm oil, etc)",
      "HALAL": false
    },
    {
      "E-Code": "E475",
      "Chemical_Name": "Polyglycerol Esters of Fatty Acids*",
      "Description": "Emulsifier/Stabiliser",
      "Remarks": "Prepared in the laboratory",
      "HALAL": false
    },
    {
      "E-Code": "E476",
      "Chemical_Name": "Polyglycerol Polyricinoleate*",
      "Description": "Emulsifier/Stabiliser",
      "Remarks": "Prepared from castor oil and glycerol esters",
      "HALAL": false
    },
    {
      "E-Code": "E477",
      "Chemical_Name": "Propane-1,2-Diol Esters of Fatty Acids*",
      "Description": "Emulsifier/Stabiliser",
      "Remarks": "Prepared from propylene glycol",
      "HALAL": false
    },
    {
      "E-Code": "E481",
      "Chemical_Name": "Sodium Stearoyl-2-Lactylate*",
      "Description": "Emulsifier/Stabiliser",
      "Remarks": "Prepared from lactic acid (E270)",
      "HALAL": false
    },
    {
      "E-Code": "E482",
      "Chemical_Name": "Calcium Stearoyl-2-Lactylate*",
      "Description": "Emulsifier/Stabiliser",
      "Remarks": "Prepared from lactic acid (E270)",
      "HALAL": false
    },
    {
      "E-Code": "E483",
      "Chemical_Name": "Stearyl Tartrate*",
      "Description": "Emulsifier/ Stabiliser",
      "Remarks": "Prepared from tartaric acid (E334)",
      "HALAL": false
    },
    {
      "E-Code": "E491",
      "Chemical_Name": "Sorbitan Monostearate*",
      "Description": "Emulsifier/ Stabiliser",
      "Remarks": "Prepared synthetically from stearic acid (E570) and sorbitol (E420)",
      "HALAL": false
    },
    {
      "E-Code": "E492",
      "Chemical_Name": "Sorbitan Tristearate/Span 65*",
      "Description": "Emulsifier/ Stabiliser",
      "Remarks": "Prepared synthetically from stearic acid (E570) and sorbitol (E420)",
      "HALAL": false
    },
    {
      "E-Code": "E493",
      "Chemical_Name": "Sorbitan Monolaurate/Span 20*",
      "Description": "Emulsifier/ Stabiliser",
      "Remarks": "Prepared synthetically from sorbitol (E420) and lauric acid",
      "HALAL": false
    },
    {
      "E-Code": "E494",
      "Chemical_Name": "Sorbitan Monooleate/Span 80*",
      "Description": "Emulsifier/ Stabiliser",
      "Remarks": "Prepared synthetically from sorbitol (E420) and oleic acid",
      "HALAL": false
    },
    {
      "E-Code": "E495",
      "Chemical_Name": "Sorbitan Monopalmitate/Span 40*",
      "Description": "Emulsifier/ Stabiliser",
      "Remarks": "Prepared synthetically from sorbitol (E420) and palmitic acid",
      "HALAL": false
    },
    {
      "E-Code": "E500",
      "Chemical_Name": "Sodium Carbonate/Sodium Bicarbonate/Baking Soda",
      "Description": "Mineral Salt",
      "Remarks": "Synthetically prepared. May also be manufactured by the Solvay process or electrolytically from sea water",
      "HALAL": true
    },
    {
      "E-Code": "E501",
      "Chemical_Name": "Potassium Carbonate/Potassium Hydrogen Carbonate",
      "Description": "Mineral Salt",
      "Remarks": "Prepared by saturating a concentrated solution of potassium carbonate with carbon dioxide",
      "HALAL": true
    },
    {
      "E-Code": "E503",
      "Chemical_Name": "Ammonium Bicarbonate/Ammonium Hydrogen Carbonate",
      "Description": "Mineral Salt",
      "Remarks": "Prepared by passing excess carbon dioxide through concentrated ammonia water",
      "HALAL": true
    },
    {
      "E-Code": "E504",
      "Chemical_Name": "Magnesium Carbonate",
      "Description": "Mineral Salt",
      "Remarks": "May be prepared by mixing boiling concentrated solutions of magnesium sulphate and sodium carbonate",
      "HALAL": true
    },
    {
      "E-Code": "E507",
      "Chemical_Name": "Hydrochloric Acid",
      "Description": "Food Acid",
      "Remarks": "Industrially produced by the reaction of sodium chloride and sulphuric acid",
      "HALAL": true
    },
    {
      "E-Code": "E508",
      "Chemical_Name": "Potassium Chloride",
      "Description": "Salt Substitute",
      "Remarks": "Naturally occurs as a saline residue associated with rock salt",
      "HALAL": true
    },
    {
      "E-Code": "E509",
      "Chemical_Name": "Calcium Chloride",
      "Description": "Mineral Salt",
      "Remarks": "Obtained as a by-product of the Solvay process and is also a product from natural salt brines",
      "HALAL": true
    },
    {
      "E-Code": "E510",
      "Chemical_Name": "Ammonium Chloride",
      "Description": "Flour Treatment Agent",
      "Remarks": "Synthetically prepared",
      "HALAL": true
    },
    {
      "E-Code": "E511",
      "Chemical_Name": "Magnesium Chloride",
      "Description": "Firming Agent",
      "Remarks": "Prepared from magnesium ammonium chloride hexahydrate, in the presence of hydrochloric acid",
      "HALAL": true
    },
    {
      "E-Code": "E513",
      "Chemical_Name": "Sulphuric Acid",
      "Description": "Food Acid",
      "Remarks": "Commercially prepared by the 'contact' or 'chamber' process",
      "HALAL": true
    },
    {
      "E-Code": "E514",
      "Chemical_Name": "Sodium Sulphate",
      "Description": "Diluent",
      "Remarks": "Naturally occurring",
      "HALAL": true
    },
    {
      "E-Code": "E515",
      "Chemical_Name": "Potassium Sulphate",
      "Description": "Salt Substitute",
      "Remarks": "Naturally occurring",
      "HALAL": true
    },
    {
      "E-Code": "E516",
      "Chemical_Name": "Calcium Sulphate",
      "Description": "Flour Treatment Agent",
      "Remarks": "Naturally occurring",
      "HALAL": true
    },
    {
      "E-Code": "E518",
      "Chemical_Name": "Magnesium Sulphate",
      "Description": "Dietary Supplement/ Firming Agent",
      "Remarks": "Naturally occurring",
      "HALAL": true
    },
    {
      "E-Code": "E519",
      "Chemical_Name": "Cupric Sulphate/Copper Sulphate",
      "Description": "Preservative/ Colour Fixative",
      "Remarks": "Industrially prepared by spraying hot dilute sulphuric acid on to scrap copper in a lead-lined tower",
      "HALAL": true
    },
    {
      "E-Code": "E524",
      "Chemical_Name": "Sodium Hydroxide",
      "Description": "Neutralising Agent",
      "Remarks": "Prepared by electrolysis from brine, or precipitated from sodium carbonate and lime solution",
      "HALAL": true
    },
    {
      "E-Code": "E525",
      "Chemical_Name": "Potassium Hydroxide",
      "Description": "Oxidising Agent",
      "Remarks": "Industrially prepared by electrolysis of potassium chloride",
      "HALAL": true
    },
    {
      "E-Code": "E526",
      "Chemical_Name": "Calcium Hydroxide",
      "Description": "Neutralising Agent",
      "Remarks": "Prepared by the hydration of lime",
      "HALAL": true
    },
    {
      "E-Code": "E527",
      "Chemical_Name": "Ammonium Hydroxide",
      "Description": "Alkali",
      "Remarks": "Prepared from ammonia gas",
      "HALAL": true
    },
    {
      "E-Code": "E528",
      "Chemical_Name": "Magnesium Hydroxide",
      "Description": "Alkali",
      "Remarks": "Commercially prepared from magnesite ores",
      "HALAL": true
    },
    {
      "E-Code": "E529",
      "Chemical_Name": "Calcium Oxide",
      "Description": "Alkali",
      "Remarks": "Prepared from limestone",
      "HALAL": true
    },
    {
      "E-Code": "E530",
      "Chemical_Name": "Magnesium Oxide",
      "Description": "Alkali",
      "Remarks": "Commercially prepared from magnesite ores",
      "HALAL": true
    },
    {
      "E-Code": "E535",
      "Chemical_Name": "Sodium Ferrocyanide",
      "Description": "Anticaking Agent",
      "Remarks": "Synthetically produced",
      "HALAL": true
    },
    {
      "E-Code": "E536",
      "Chemical_Name": "Potassium Ferrocyanide",
      "Description": "Anticaking Agent",
      "Remarks": "Commercially prepared as a by-product in the purification of coal gas",
      "HALAL": true
    },
    {
      "E-Code": "E540",
      "Chemical_Name": "Dicalcium Diphosphate",
      "Description": "Buffer",
      "Remarks": "Naturally occurring mineral. May also be synthetically produced",
      "HALAL": true
    },
    {
      "E-Code": "E541",
      "Chemical_Name": "Sodium Aluminium Phosphate",
      "Description": "Aerator/ Emulsifying Salt",
      "Remarks": "Prepared from phosphoric acid (E338)",
      "HALAL": true
    },
    {
      "E-Code": "E542",
      "Chemical_Name": "Edible Bone Phosphate/Bone Meal*",
      "Description": "Anticaking Agent",
      "Remarks": "Extract from animal bones",
      "HALAL": false
    },
    {
      "E-Code": "E544",
      "Chemical_Name": "Calcium Polyphosphates*",
      "Description": "Emulsifying Salt",
      "Remarks": "Calcium salts of polyphosphoric acid",
      "HALAL": false
    },
    {
      "E-Code": "E545",
      "Chemical_Name": "Ammonium Polyphosphates",
      "Description": "Emulsifying Salt",
      "Remarks": "Ammonium salts of polyphosphoric acid",
      "HALAL": true
    },
    {
      "E-Code": "E551",
      "Chemical_Name": "Silicon Dioxide/Silica Salt",
      "Description": "Anticaking Agent",
      "Remarks": "Rock-forming mineral and sand which is composed mainly of quartz or flint",
      "HALAL": true
    },
    {
      "E-Code": "E552",
      "Chemical_Name": "Calcium Silicate",
      "Description": "Anticaking Agent",
      "Remarks": "Commercially prepared from lime and diatomaceous earth",
      "HALAL": true
    },
    {
      "E-Code": "E553a",
      "Chemical_Name": "Magnesium Silicate/Magnesium Trisilicate",
      "Description": "Anticaking Agent",
      "Remarks": "Synthetic compound of magnesium oxide and silicon dioxide. May also be prepared from sodium silicate and magnesium sulphate",
      "HALAL": true
    },
    {
      "E-Code": "E553b",
      "Chemical_Name": "Talc",
      "Description": "Anticaking Agent",
      "Remarks": "Naturally occurring mineral",
      "HALAL": true
    },
    {
      "E-Code": "E554",
      "Chemical_Name": "Aluminium Sodium Silicate/Sodium Aluminosilicate",
      "Description": "Anticaking Agent",
      "Remarks": "Prepared synthetically from quartz and gibbsite",
      "HALAL": true
    },
    {
      "E-Code": "E556",
      "Chemical_Name": "Aluminium Calcium Silicate",
      "Description": "Anticaking Agent",
      "Remarks": "Naturally occurring mineral",
      "HALAL": true
    },
    {
      "E-Code": "E558",
      "Chemical_Name": "Bentonite",
      "Description": "Anticaking Agent",
      "Remarks": "Naturally occurring",
      "HALAL": true
    },
    {
      "E-Code": "E559",
      "Chemical_Name": "Kaolin",
      "Description": "Anticaking Agent",
      "Remarks": "Naturally occurring",
      "HALAL": true
    },
    {
      "E-Code": "E570",
      "Chemical_Name": "Stearic Acid*",
      "Description": "Anticaking Agent",
      "Remarks": "Naturally occurring fatty acid found in all animal fats and vegetable oils. May be prepared synthetically for commercial use",
      "HALAL": false
    },
    {
      "E-Code": "E572",
      "Chemical_Name": "Magnesium Stearate*",
      "Description": "Anticaking Agent",
      "Remarks": "Magnesium salt of stearic acid (E570)",
      "HALAL": false
    },
    {
      "E-Code": "E575",
      "Chemical_Name": "Glucono Delta-Lactone*",
      "Description": "Sequestrant",
      "Remarks": "Prepared by the oxidation of glucose",
      "HALAL": false
    },
    {
      "E-Code": "E576",
      "Chemical_Name": "Sodium Gluconate",
      "Description": "Sequestrant",
      "Remarks": "Sodium salt of gluconic acid",
      "HALAL": true
    },
    {
      "E-Code": "E577",
      "Chemical_Name": "Potassium Gluconate",
      "Description": "Sequestrant",
      "Remarks": "Potassium salt of gluconic acid",
      "HALAL": true
    },
    {
      "E-Code": "E578",
      "Chemical_Name": "Calcium Gluconate",
      "Description": "Sequestrant",
      "Remarks": "Calcium salt of gluconic acid",
      "HALAL": true
    },
    {
      "E-Code": "E579",
      "Chemical_Name": "Ferrous Gluconate",
      "Description": "Colouring/Flavouring",
      "Remarks": "Prepared from barium gluconate and ferrous sulphate",
      "HALAL": true
    },
    {
      "E-Code": "E620",
      "Chemical_Name": "L-Glutamic Acid*",
      "Description": "Flavour Enhancer",
      "Remarks": "Commercially prepared by the fermentation of carbohydrate by a bacterium e.g. Micrococcus glutamicus",
      "HALAL": false
    },
    {
      "E-Code": "E621",
      "Chemical_Name": "Monosodium Glutamate/MSG*",
      "Description": "Flavour Enhancer",
      "Remarks": "Sodium salt of glutamic acid (E620)",
      "HALAL": false
    },
    {
      "E-Code": "E622",
      "Chemical_Name": "Monopotassium Glutamate*",
      "Description": "Flavour Enhancer",
      "Remarks": "Potassium salt of glutamic acid (E620)",
      "HALAL": false
    },
    {
      "E-Code": "E623",
      "Chemical_Name": "Calcium Glutamate*",
      "Description": "Flavour Enhancer",
      "Remarks": "Calcium salt of glutamic acid (E620)",
      "HALAL": false
    },
    {
      "E-Code": "E627",
      "Chemical_Name": "Disodium Guanylate*",
      "Description": "Flavour Enhancer",
      "Remarks": "Sodium salt of guanylic acid, a widely occurring nucleotide found in yeast extract and sardines. May be synthetically prepared from commercial use",
      "HALAL": false
    },
    {
      "E-Code": "E631",
      "Chemical_Name": "Disodium Inosinate*",
      "Description": "Flavour Enhancer",
      "Remarks": "Sodium salt of inosinic acid, found in meat extract and sardines",
      "HALAL": false
    },
    {
      "E-Code": "E635",
      "Chemical_Name": "Sodium 5'-Ribonucleotide*",
      "Description": "Flavour Enhancer",
      "Remarks": "Mixture of disodium guanylate (E627) and disodium inosinate (E631)",
      "HALAL": false
    },
    {
      "E-Code": "E636",
      "Chemical_Name": "MaltoI",
      "Description": "Flavour Enhancer",
      "Remarks": "Occurs naturally in the bark of larch trees, pine needles and roasted malt. May also be obtained by the alkaline hydrolysis of streptomycin salt",
      "HALAL": true
    },
    {
      "E-Code": "E637",
      "Chemical_Name": "Ethyl MaltoI",
      "Description": "Flavour Enhancer",
      "Remarks": "Prepared from maltoI (E636)",
      "HALAL": true
    },
    {
      "E-Code": "E900",
      "Chemical_Name": "Dimethylpolysiloxane/Dimethicone",
      "Description": "Antifoaming Agent",
      "Remarks": "A mixture of liquid dimethylpolysiloxane and silicon gel or silicon dioxide",
      "HALAL": true
    },
    {
      "E-Code": "E901",
      "Chemical_Name": "Beeswax*",
      "Description": "Glazing Agent",
      "Remarks": "Naturally occurring from bee honeycomb. White beeswax is bleached and purified",
      "HALAL": false
    },
    {
      "E-Code": "E903",
      "Chemical_Name": "Carnauba Wax",
      "Description": "Glazing Agent",
      "Remarks": "Obtained from the surface of leaves of Copernicia cerifera, a Brazilian wax palm",
      "HALAL": true
    },
    {
      "E-Code": "E904",
      "Chemical_Name": "Shellac*",
      "Description": "Glazing Agent",
      "Remarks": "Obtained from the resin produced by lac insect (Laccifer lacca)",
      "HALAL": false
    },
    {
      "E-Code": "E905",
      "Chemical_Name": "Mineral Oil/Petrolatum",
      "Description": "Glazing Agent",
      "Remarks": "Derived from petroleum",
      "HALAL": true
    },
    {
      "E-Code": "E907",
      "Chemical_Name": "Refined Microcrystalline Wax",
      "Description": "Glazing Agent",
      "Remarks": "Derived from petroleum",
      "HALAL": true
    },
    {
      "E-Code": "E920",
      "Chemical_Name": "L-Cysteine Hydrochloride*",
      "Description": "Flour Treatment Agent",
      "Remarks": "Manufactured from animal hair and chicken feathers",
      "HALAL": false
    },
    {
      "E-Code": "E924",
      "Chemical_Name": "Potassium Bromate",
      "Description": "Flour Treatment Agent",
      "Remarks": "Synthetically produced",
      "HALAL": true
    },
    {
      "E-Code": "E925",
      "Chemical_Name": "Chlorine",
      "Description": "Preservative/ Bleaching Agent",
      "Remarks": "Commercially produced by electrolysis",
      "HALAL": true
    },
    {
      "E-Code": "E926",
      "Chemical_Name": "Chlorine Dioxide",
      "Description": "Bleaching Agent/ Improving Agent",
      "Remarks": "Synthetically prepared",
      "HALAL": true
    },
    {
      "E-Code": "E927",
      "Chemical_Name": "Azodicarbonamide/Azoformamide",
      "Description": "Improving Agent",
      "Remarks": "Synthetically prepared",
      "HALAL": true
    },
    {
      "E-Code": "E928",
      "Chemical_Name": "Benzoyl Peroxide/Dibenzoyl Peroxide",
      "Description": "Bleaching Agent",
      "Remarks": "Synthetically prepared",
      "HALAL": true
    },
    {
      "E-Code": "E931",
      "Chemical_Name": "Nitrogen",
      "Description": "Propellant",
      "Remarks": "Industrially produced by the reduction of ammonia or by the fractional distillation of liquid air",
      "HALAL": true
    },
    {
      "E-Code": "E932",
      "Chemical_Name": "Nitrous Oxide",
      "Description": "Propellant",
      "Remarks": "Industrially produced by the thermal decomposition of ammonium nitrate",
      "HALAL": true
    },
    {
      "E-Code": "E950",
      "Chemical_Name": "Acesulphame Potassium/Sunett",
      "Description": "Artificial Sweetener",
      "Remarks": "Potassium salt of 6-methyl-1,2,3-oxathiazin-4(3H)-1,2,2-dioxide",
      "HALAL": true
    },
    {
      "E-Code": "E951",
      "Chemical_Name": "Aspartame/Nutrasweet*",
      "Description": "Artificial Sweetener",
      "Remarks": "Commercially produced by combining two amino acids together, namely L-phenylalanine and L-aspartic acid",
      "HALAL": false
    },
    {
      "E-Code": "E952",
      "Chemical_Name": "Cyclamic and its Calcium and Sodium Salts",
      "Description": "Artificial Sweetener",
      "Remarks": "Manufactured by many different methods",
      "HALAL": true
    },
    {
      "E-Code": "E954",
      "Chemical_Name": "Saccharin and its Calcium and Sodium Salts",
      "Description": "Artificial Sweetener",
      "Remarks": "Manufactured by many different methods",
      "HALAL": true
    },
    {
      "E-Code": "E957",
      "Chemical_Name": "Thaumatin",
      "Description": "Artificial Sweetener",
      "Remarks": "Derived from an African plant called Thaumococcus danielli",
      "HALAL": true
    },
    {
      "E-Code": "E965",
      "Chemical_Name": "Hydrogenated Glucose Syrup*",
      "Description": "Humectant",
      "Remarks": "Derived from starches, which originate from many different sources, and broken down by enzymes and water to form glucose, oligosaccharides, followed by maltitol and sorbitol (E420)",
      "HALAL": false
    },
    {
      "E-Code": "E967",
      "Chemical_Name": "Xylitol",
      "Description": "Sweetener",
      "Remarks": "Commercially produced as a waste product of the pulp industry",
      "HALAL": true
    },
    {
      "E-Code": "E1200",
      "Chemical_Name": "Polydextrose*",
      "Description": "Miscellaneous",
      "Remarks": "Manufactured from glucose, citric acid and sorbitol",
      "HALAL": false
    },
    {
      "E-Code": "E1201",
      "Chemical_Name": "Polyvinylpyrrolidone",
      "Description": "Miscellaneous",
      "Remarks": "Commercially produced from acetylene, hydrogen, formaldehyde and ammonia",
      "HALAL": true
    },
    {
      "E-Code": "E1202",
      "Chemical_Name": "Polyvinyl Polypyrrolidone",
      "Description": "Miscellaneous",
      "Remarks": "It is the insoluble form of polyvinylpyrrolidone (E1201)",
      "HALAL": true
    },
    {
      "E-Code": "E1400",
      "Chemical_Name": "Dextrin",
      "Description": "Thickener",
      "Remarks": "May be produced by the dry heating of unmodified starch or in the presence of acids and buffers. Starches used are mainly from corn (maize) and tapioca",
      "HALAL": true
    },
    {
      "E-Code": "E1403",
      "Chemical_Name": "Bleached Starch",
      "Description": "Thickener",
      "Remarks": "May be obtained by treating native starch with various chemicals including hydrogen peroxide, sodium chlorite or sulphur dioxide",
      "HALAL": true
    },
    {
      "E-Code": "E1404",
      "Chemical_Name": "Oxidised Starch",
      "Description": "Thickener",
      "Remarks": "Produced by treating native starch with sodium hypochlorite",
      "HALAL": true
    },
    {
      "E-Code": "E1405",
      "Chemical_Name": "Enzyme-treated Starch*",
      "Description": "Thickener",
      "Remarks": "Produced by subjecting corn starch to acid-enzyme treatment to yield glucose, maltose and higher oligosaccharides",
      "HALAL": false
    },
    {
      "E-Code": "E1410",
      "Chemical_Name": "Monostarch Phosphate",
      "Description": "Thickener",
      "Remarks": "Produced by the esterification of native starch with orthophosphoric acid, sodium or potassium orthophosphate, or sodium tripolyphosphate",
      "HALAL": true
    },
    {
      "E-Code": "E1412",
      "Chemical_Name": "Distarch Phosphate",
      "Description": "Thickener",
      "Remarks": "Produced by the esterification of native starch with sodium trimetaphosphate or phosphorus oxychloride",
      "HALAL": true
    },
    {
      "E-Code": "E1413",
      "Chemical_Name": "Phosphated Distarch Phosphate",
      "Description": "Thickener",
      "Remarks": "Produced by the esterification of native starch with phosphate, and dually stabilised with a 'monosubstituent group' of phosphate",
      "HALAL": true
    },
    {
      "E-Code": "E1414",
      "Chemical_Name": "Acetylated Distarch Phosphate",
      "Description": "Thickener",
      "Remarks": "Produced by the esterification of native starch with sodium trimetaphosphate or phosphorus oxychloride, and stabilised with a 'monosubstituent group' of acetate",
      "HALAL": true
    },
    {
      "E-Code": "E1420",
      "Chemical_Name": "Starch Acetate Esterified with Acetic Anhydride",
      "Description": "Thickener",
      "Remarks": "Produced by the esterification of native starch with a mixed anhydride of adipic and acetic anhydride, and stabilised with a 'monosubstituent group' of acetate",
      "HALAL": true
    },
    {
      "E-Code": "E1421",
      "Chemical_Name": "Starch Acetate Esterified with Vinyl Acetate",
      "Description": "Thickener",
      "Remarks": "Produced by the esterification of native starch with monosubstituent groups of vinyl acetate",
      "HALAL": true
    },
    {
      "E-Code": "E1422",
      "Chemical_Name": "Acetylated Distarch Adipate",
      "Description": "Thickener",
      "Remarks": "Produced by the esterification of native starch with a mixed anhydride of adipic and acetic anhydride",
      "HALAL": true
    },
    {
      "E-Code": "E1440",
      "Chemical_Name": "Hydroxypropyl Starch",
      "Description": "Thickener",
      "Remarks": "Produced by treating native starch with the hydroxypropyl group",
      "HALAL": true
    },
    {
      "E-Code": "E1442",
      "Chemical_Name": "Hydroxypropyl Distarch Phosphate",
      "Description": "Thickener",
      "Remarks": "Produced by the esterification of native starch with phosphate, and stabilised with a monosubstituent hydroxyl group",
      "HALAL": true
    },
    {
      "E-Code": "E1450",
      "Chemical_Name": "Starch, Sodium Octenylsuccinate",
      "Description": "Thickener",
      "Remarks": "Produced by treating native starch with an octenylsuccinate half ester monosubstituent group",
      "HALAL": true
    },
    {
      "E-Code": "E1505",
      "Chemical_Name": "Triethyl Citrate/Ethyl Citrate",
      "Description": "Miscellaneous",
      "Remarks": "Bitter oily liquid which is soluble in water and can be mixed with alcohol",
      "HALAL": true
    },
    {
      "E-Code": "E1510",
      "Chemical_Name": "Ethyl Alcohol/Ethanol*",
      "Description": "Miscellaneous",
      "Remarks": "Produced by the fermentation of carbohydrates. May also be obtained from ethylene, acetylene or liquors from waste sulphites. Other manufacturing process includes hydrolysis of ethyl sulphate or by the oxidation of methane",
      "HALAL": false
    },
    {
      "E-Code": "E1518",
      "Chemical_Name": "Triacetin/Glycerol Triacetate*",
      "Description": "Miscellaneous",
      "Remarks": "Produced by the acetylation of glycerol",
      "HALAL": false
    },
    {
      "E-Code": "E1520",
      "Chemical_Name": "Propylene Glycol*",
      "Description": "Miscellaneous",
      "Remarks": "Commercially produced from propylene, or by heating glycerol with sodium hydroxide, or by reacting propylene oxide with water",
      "HALAL": false
    }
  ];

// Map the raw database to our application's ECodeData format
const ecodeDatabase: ECodeData[] = rawEcodeDatabase.map(item => ({
  code: item["E-Code"],
  name: item["Chemical_Name"],
  description: `${item["Description"]}. ${item["Remarks"]}`,
  status: item["HALAL"] ? 'halal' : 'doubtful',
  source: extractSourceFromRemarks(item["Remarks"])
}));

// Helper function to extract source information from remarks
function extractSourceFromRemarks(remarks: string): string {
  // A simple extraction logic - this can be made more sophisticated based on the actual data
  if (remarks.includes("derived from")) {
    const derivedIndex = remarks.indexOf("derived from");
    return remarks.substring(derivedIndex);
  }
  
  // Look for other potential source indicators
  if (remarks.includes("from ")) {
    const fromIndex = remarks.indexOf("from ");
    // Extract a reasonable portion after "from"
    const sourceText = remarks.substring(fromIndex + 5);
    // Return up to the first period or the whole string if no period
    return sourceText.includes(".") ? sourceText.substring(0, sourceText.indexOf(".")) : sourceText;
  }
  
  return "";
}

// Search function that filters the database based on multiple query strings
export const searchECodes = (query: string): Promise<ECodeData[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      if (!query) {
        resolve([]);
        return;
      }
      
      // Split the query by commas and clean up each term
      const searchTerms = query.split(',')
        .map(term => term.trim().toLowerCase())
        .filter(term => term.length > 0);
      
      if (searchTerms.length === 0) {
        resolve([]);
        return;
      }
      
      // For each search term, find matching E-codes
      let results: ECodeData[] = [];
      
      // If only one search term, use the original logic
      if (searchTerms.length === 1) {
        const normalizedQuery = searchTerms[0];
        results = ecodeDatabase.filter(item => 
          item.code.toLowerCase().includes(normalizedQuery) || 
          item.name.toLowerCase().includes(normalizedQuery)
        );
      } else {
        // For multiple terms, combine the results (union)
        const uniqueResults = new Map<string, ECodeData>();
        
        searchTerms.forEach(term => {
          ecodeDatabase.forEach(item => {
            if (
              item.code.toLowerCase().includes(term) || 
              item.name.toLowerCase().includes(term)
            ) {
              uniqueResults.set(item.code, item);
            }
          });
        });
        
        results = Array.from(uniqueResults.values());
      }
      
      resolve(results);
    }, 500); // Simulate a 500ms API delay
  });
};

export const getAllECodes = (): ECodeData[] => (ecodeDatabase);
export const getFeaturedECodes = (): ECodeData[] => (ecodeDatabase);
