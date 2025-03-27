
import { ECodeData } from '../components/ECode';

// Database populated from the provided PDF source
const ecodeDatabase: ECodeData[] = [
  {
    code: 'E100',
    name: 'Curcumin',
    description: 'A natural yellow color extracted from turmeric root. Used in curry powders, mustards, broths, and other foods.',
    status: 'halal',
    source: 'Turmeric root (vegetable)'
  },
  {
    code: 'E101',
    name: 'Riboflavin (Vitamin B2)',
    description: 'A naturally occurring yellow to orange-yellow crystalline powder. Used in cereals, pastas, sauces, processed cheese, and fruit drinks.',
    status: 'halal',
    source: 'Chemical synthesis or fermentation'
  },
  {
    code: 'E102',
    name: 'Tartrazine',
    description: 'Synthetic yellow azo dye used in soft drinks, candies, and other food products.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E104',
    name: 'Quinoline Yellow',
    description: 'Synthetic yellow food coloring used in various food products.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E110',
    name: 'Sunset Yellow FCF',
    description: 'Orange-yellow synthetic food dye used in snack foods, cereals, and beverages.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E120',
    name: 'Cochineal / Carminic Acid',
    description: 'Red color extracted from the dried bodies of female insect Dactylopius coccus. Used in fruit drinks, sweets, and cosmetics.',
    status: 'doubtful',
    source: 'Insect-derived'
  },
  {
    code: 'E122',
    name: 'Azorubine / Carmoisine',
    description: 'Synthetic red food dye used in various food products.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E123',
    name: 'Amaranth',
    description: 'Synthetic deep red to purple food dye.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E124',
    name: 'Ponceau 4R',
    description: 'Synthetic red food coloring used in various food products.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E127',
    name: 'Erythrosine',
    description: 'Synthetic cherry-pink food dye used in candies and popsicles.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E129',
    name: 'Allura Red AC',
    description: 'Synthetic red food dye used in many food products.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E131',
    name: 'Patent Blue V',
    description: 'Synthetic blue food coloring used in various food products.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E132',
    name: 'Indigotine / Indigo Carmine',
    description: 'Synthetic blue food dye used in confectionery, ice cream, and baked goods.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E133',
    name: 'Brilliant Blue FCF',
    description: 'Synthetic blue food dye used in dairy products, sweets, and beverages.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E140',
    name: 'Chlorophyll',
    description: 'Natural green pigment found in plants used for coloring food products.',
    status: 'halal',
    source: 'Plant-based'
  },
  {
    code: 'E141',
    name: 'Copper Complexes of Chlorophyll',
    description: 'Modified form of chlorophyll used as a green food coloring.',
    status: 'halal',
    source: 'Plant-based with copper'
  },
  {
    code: 'E150a',
    name: 'Plain Caramel',
    description: 'Brown food coloring made by heating sugar, used in various food products.',
    status: 'halal',
    source: 'Sugar-based'
  },
  {
    code: 'E150b',
    name: 'Caustic Sulphite Caramel',
    description: 'Brown food coloring made with sulfites, used in various food products.',
    status: 'halal',
    source: 'Sugar-based with sulfites'
  },
  {
    code: 'E150c',
    name: 'Ammonia Caramel',
    description: 'Brown food coloring made with ammonia, commonly used in cola drinks.',
    status: 'halal',
    source: 'Sugar-based with ammonia'
  },
  {
    code: 'E150d',
    name: 'Sulphite Ammonia Caramel',
    description: 'Brown food coloring made with both sulfites and ammonia, used in various food products.',
    status: 'halal',
    source: 'Sugar-based with sulfites and ammonia'
  },
  {
    code: 'E151',
    name: 'Brilliant Black BN / Black PN',
    description: 'Synthetic black food dye used in various food products.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E153',
    name: 'Vegetable Carbon',
    description: 'Black food coloring made from carbonized vegetables.',
    status: 'halal',
    source: 'Plant-based'
  },
  {
    code: 'E160a',
    name: 'Alpha-carotene, Beta-carotene, Gamma-carotene',
    description: 'Orange food coloring found naturally in carrots and many plants.',
    status: 'halal',
    source: 'Plant-based'
  },
  {
    code: 'E160b',
    name: 'Annatto / Bixin / Norbixin',
    description: 'Orange-red food coloring extracted from the seeds of the achiote tree.',
    status: 'halal',
    source: 'Plant-based'
  },
  {
    code: 'E160c',
    name: 'Paprika extract',
    description: 'A deep red spice made from dried and ground red peppers. Used as a natural coloring agent in various food products.',
    status: 'halal',
    source: 'Plant-based (paprika peppers)'
  },
  {
    code: 'E160d',
    name: 'Lycopene',
    description: 'Red food coloring found naturally in tomatoes and other red fruits.',
    status: 'halal',
    source: 'Plant-based'
  },
  {
    code: 'E160e',
    name: 'Beta-apo-8′-carotenal',
    description: 'Orange-red food coloring related to carotene.',
    status: 'halal',
    source: 'Synthetic or natural'
  },
  {
    code: 'E161b',
    name: 'Lutein',
    description: 'Yellow food coloring found naturally in green vegetables and egg yolks.',
    status: 'halal',
    source: 'Plant-based'
  },
  {
    code: 'E161g',
    name: 'Canthaxanthin',
    description: 'Orange-pink food coloring used in various food products.',
    status: 'halal',
    source: 'Synthetic or natural'
  },
  {
    code: 'E162',
    name: 'Beetroot Red / Betanin',
    description: 'Natural red food coloring extracted from beetroot.',
    status: 'halal',
    source: 'Plant-based (beetroot)'
  },
  {
    code: 'E163',
    name: 'Anthocyanins',
    description: 'Natural purple food coloring found in berries and other plants.',
    status: 'halal',
    source: 'Plant-based'
  },
  {
    code: 'E170',
    name: 'Calcium Carbonate',
    description: 'White mineral used as a food color and anti-caking agent.',
    status: 'halal',
    source: 'Mineral'
  },
  {
    code: 'E171',
    name: 'Titanium Dioxide',
    description: 'White pigment used in confectionery and other food products.',
    status: 'halal',
    source: 'Mineral'
  },
  {
    code: 'E172',
    name: 'Iron Oxides and Hydroxides',
    description: 'Red, yellow, and black food colorings derived from iron.',
    status: 'halal',
    source: 'Mineral'
  },
  {
    code: 'E173',
    name: 'Aluminium',
    description: 'Silver-colored food decoration, primarily used for cake decoration.',
    status: 'halal',
    source: 'Mineral'
  },
  {
    code: 'E174',
    name: 'Silver',
    description: 'Silver-colored food decoration, primarily used for cake decoration.',
    status: 'halal',
    source: 'Mineral'
  },
  {
    code: 'E175',
    name: 'Gold',
    description: 'Gold-colored food decoration, primarily used for luxury confectionery.',
    status: 'halal',
    source: 'Mineral'
  },
  {
    code: 'E180',
    name: 'Litholrubine BK',
    description: 'Red food coloring used primarily for cheese rinds.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E200',
    name: 'Sorbic Acid',
    description: 'Preservative used to prevent mold and yeast growth in foods.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E202',
    name: 'Potassium Sorbate',
    description: 'Preservative used in many food products to inhibit molds and yeasts.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E210',
    name: 'Benzoic Acid',
    description: 'Preservative used in acidic foods to prevent bacterial growth.',
    status: 'halal',
    source: 'Synthetic or natural'
  },
  {
    code: 'E211',
    name: 'Sodium Benzoate',
    description: 'Common preservative used in acidic foods and beverages.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E214',
    name: 'Ethyl p-hydroxybenzoate',
    description: 'Preservative used in various food products.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E220',
    name: 'Sulphur Dioxide',
    description: 'Preservative and antioxidant used in wines and dried fruits.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E221',
    name: 'Sodium Sulphite',
    description: 'Preservative used in wines, dried fruits, and processed foods.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E300',
    name: 'Ascorbic Acid (Vitamin C)',
    description: 'A natural antioxidant and nutrient. Used to maintain color, enhance shelf life, and add nutritional value.',
    status: 'halal',
    source: 'Chemical synthesis or fruit extracts'
  },
  {
    code: 'E301',
    name: 'Sodium Ascorbate',
    description: 'Sodium salt of ascorbic acid, used as an antioxidant and preservative.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E306',
    name: 'Tocopherol-rich Extract (Vitamin E)',
    description: 'Natural antioxidant used to prevent oils from becoming rancid.',
    status: 'halal',
    source: 'Plant-based'
  },
  {
    code: 'E307',
    name: 'Alpha-tocopherol',
    description: 'Synthetic vitamin E used as an antioxidant in foods containing fats and oils.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E322',
    name: 'Lecithin',
    description: 'Emulsifier used in chocolate, baked goods, and margarine.',
    status: 'halal',
    source: 'Plant-based (usually soy)'
  },
  {
    code: 'E325',
    name: 'Sodium Lactate',
    description: 'Antioxidant and pH regulator used in various food products.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E330',
    name: 'Citric Acid',
    description: 'Common acid used in soft drinks and many processed foods.',
    status: 'halal',
    source: 'Fermentation or synthetic'
  },
  {
    code: 'E334',
    name: 'Tartaric Acid',
    description: 'Acid naturally found in grapes, used in baking powder and other foods.',
    status: 'halal',
    source: 'Plant-based or synthetic'
  },
  {
    code: 'E392',
    name: 'Rosemary extract',
    description: 'Natural antioxidant extracted from rosemary leaves.',
    status: 'halal',
    source: 'Plant-based (rosemary)'
  },
  {
    code: 'E406',
    name: 'Agar',
    description: 'Gelling agent derived from seaweed, used in desserts and confections.',
    status: 'halal',
    source: 'Seaweed'
  },
  {
    code: 'E407',
    name: 'Carrageenan',
    description: 'Thickener and stabilizer extracted from red seaweed.',
    status: 'halal',
    source: 'Seaweed'
  },
  {
    code: 'E410',
    name: 'Locust Bean Gum',
    description: 'Thickener and stabilizer made from carob seeds.',
    status: 'halal',
    source: 'Plant-based'
  },
  {
    code: 'E412',
    name: 'Guar Gum',
    description: 'Thickener made from guar beans, used in various food products.',
    status: 'halal',
    source: 'Plant-based'
  },
  {
    code: 'E413',
    name: 'Tragacanth',
    description: 'Thickener obtained from the sap of Middle Eastern legumes.',
    status: 'halal',
    source: 'Plant-based'
  },
  {
    code: 'E414',
    name: 'Acacia Gum / Gum Arabic',
    description: 'Stabilizer and emulsifier derived from the acacia tree.',
    status: 'halal',
    source: 'Plant-based'
  },
  {
    code: 'E415',
    name: 'Xanthan Gum',
    description: 'Thickener produced by bacterial fermentation, used in many food products.',
    status: 'halal',
    source: 'Bacterial fermentation'
  },
  {
    code: 'E422',
    name: 'Glycerol / Glycerin',
    description: 'A sweet-tasting, colorless, thick liquid. Used as a sweetener, solvent, and preservative in food and pharmaceutical products.',
    status: 'doubtful',
    source: 'Can be derived from animal fats or vegetable oils'
  },
  {
    code: 'E430',
    name: 'Polyoxyethylene (8) stearate',
    description: 'Emulsifier used in food processing.',
    status: 'doubtful',
    source: 'Can be derived from animal or plant sources'
  },
  {
    code: 'E431',
    name: 'Polyoxyethylene (40) stearate',
    description: 'Emulsifier used in food processing.',
    status: 'doubtful',
    source: 'Can be derived from animal or plant sources'
  },
  {
    code: 'E432',
    name: 'Polyoxyethylene (20) sorbitan monolaurate (Polysorbate 20)',
    description: 'Emulsifier used in bakery products and ice cream.',
    status: 'doubtful',
    source: 'Can be derived from animal or plant sources'
  },
  {
    code: 'E433',
    name: 'Polyoxyethylene (20) sorbitan monooleate (Polysorbate 80)',
    description: 'Emulsifier used in ice cream and other desserts.',
    status: 'doubtful',
    source: 'Can be derived from animal or plant sources'
  },
  {
    code: 'E434',
    name: 'Polyoxyethylene (20) sorbitan monopalmitate (Polysorbate 40)',
    description: 'Emulsifier used in various food products.',
    status: 'doubtful',
    source: 'Can be derived from animal or plant sources'
  },
  {
    code: 'E440',
    name: 'Pectin',
    description: 'Gelling agent naturally found in fruits, used in jams and jellies.',
    status: 'halal',
    source: 'Plant-based (fruit)'
  },
  {
    code: 'E441',
    name: 'Gelatin',
    description: 'A translucent, colorless, flavorless food ingredient derived from collagen. Used in jellies, candies, and marshmallows.',
    status: 'doubtful',
    source: 'Animal-derived (usually from pig or cow)'
  },
  {
    code: 'E442',
    name: 'Ammonium phosphatides',
    description: 'Emulsifier used in chocolate and cocoa-based confectionery.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E450',
    name: 'Diphosphates',
    description: 'Stabilizers and leavening agents used in baked goods and processed meats.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E460',
    name: 'Cellulose',
    description: 'Anti-caking agent, emulsifier, and thickener derived from plant fibers.',
    status: 'halal',
    source: 'Plant-based'
  },
  {
    code: 'E461',
    name: 'Methyl cellulose',
    description: 'Thickener and emulsifier derived from cellulose.',
    status: 'halal',
    source: 'Plant-based'
  },
  {
    code: 'E464',
    name: 'Hydroxypropyl methyl cellulose',
    description: 'Emulsifier and thickener derived from cellulose.',
    status: 'halal',
    source: 'Plant-based'
  },
  {
    code: 'E471',
    name: 'Mono- and diglycerides of fatty acids',
    description: 'Emulsifiers used in baked goods, ice cream, chewing gum, shortening, whipped toppings, margarine.',
    status: 'doubtful',
    source: 'Can be derived from animal fats or vegetable oils'
  },
  {
    code: 'E472a',
    name: 'Acetic acid esters of mono- and diglycerides of fatty acids',
    description: 'Emulsifier used in baked goods.',
    status: 'doubtful',
    source: 'Can be derived from animal or plant sources'
  },
  {
    code: 'E472b',
    name: 'Lactic acid esters of mono- and diglycerides of fatty acids',
    description: 'Emulsifier used in baked goods.',
    status: 'doubtful',
    source: 'Can be derived from animal or plant sources'
  },
  {
    code: 'E472e',
    name: 'Mono- and diacetyltartaric acid esters of mono- and diglycerides of fatty acids',
    description: 'Emulsifier used in bread and other baked goods.',
    status: 'doubtful',
    source: 'Can be derived from animal or plant sources'
  },
  {
    code: 'E473',
    name: 'Sucrose esters of fatty acids',
    description: 'Emulsifier used in baked goods and confectionery.',
    status: 'doubtful',
    source: 'Can be derived from animal or plant sources'
  },
  {
    code: 'E475',
    name: 'Polyglycerol esters of fatty acids',
    description: 'Emulsifier used in baked goods and frozen desserts.',
    status: 'doubtful',
    source: 'Can be derived from animal or plant sources'
  },
  {
    code: 'E476',
    name: 'Polyglycerol polyricinoleate',
    description: 'Emulsifier used in chocolate products.',
    status: 'halal',
    source: 'Plant-based (castor oil)'
  },
  {
    code: 'E481',
    name: 'Sodium stearoyl-2-lactylate',
    description: 'Emulsifier used in baked goods and processed foods.',
    status: 'doubtful',
    source: 'Can be derived from animal or plant sources'
  },
  {
    code: 'E491',
    name: 'Sorbitan monostearate',
    description: 'Emulsifier used in various food products.',
    status: 'doubtful',
    source: 'Can be derived from animal or plant sources'
  },
  {
    code: 'E500',
    name: 'Sodium carbonates',
    description: 'Raising agent and acidity regulator used in baked goods.',
    status: 'halal',
    source: 'Mineral'
  },
  {
    code: 'E501',
    name: 'Potassium carbonates',
    description: 'Acidity regulator used in cocoa products and baked goods.',
    status: 'halal',
    source: 'Mineral'
  },
  {
    code: 'E503',
    name: 'Ammonium carbonates',
    description: 'Raising agent used in flat baked goods like cookies.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E504',
    name: 'Magnesium carbonates',
    description: 'Anti-caking agent and acidity regulator.',
    status: 'halal',
    source: 'Mineral'
  },
  {
    code: 'E507',
    name: 'Hydrochloric acid',
    description: 'Acidity regulator used in food processing.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E508',
    name: 'Potassium chloride',
    description: 'Salt substitute and flavor enhancer.',
    status: 'halal',
    source: 'Mineral'
  },
  {
    code: 'E509',
    name: 'Calcium chloride',
    description: 'Firming agent used in canned vegetables, cheese, and brewing.',
    status: 'halal',
    source: 'Mineral'
  },
  {
    code: 'E551',
    name: 'Silicon dioxide',
    description: 'Anti-caking agent used in powdered foods and seasonings.',
    status: 'halal',
    source: 'Mineral'
  },
  {
    code: 'E621',
    name: 'Monosodium glutamate (MSG)',
    description: 'Flavor enhancer used in many processed foods.',
    status: 'halal',
    source: 'Fermentation'
  },
  {
    code: 'E631',
    name: 'Sodium Inosinate',
    description: 'A flavor enhancer used in conjunction with monosodium glutamate (MSG) in many savory foods.',
    status: 'doubtful',
    source: 'Can be derived from animal or plant sources'
  },
  {
    code: 'E635',
    name: 'Disodium 5'-ribonucleotides',
    description: 'Flavor enhancer used in savory foods.',
    status: 'doubtful',
    source: 'Can be derived from animal or plant sources'
  },
  {
    code: 'E901',
    name: 'Beeswax',
    description: 'Glazing agent used for fruit, confectionery, and some pharmaceuticals.',
    status: 'halal',
    source: 'Insect-derived (bees)'
  },
  {
    code: 'E904',
    name: 'Shellac',
    description: 'A resin secreted by the female lac bug. Used as glazing agent for pills, candy, and fruit coating.',
    status: 'doubtful',
    source: 'Insect-derived'
  },
  {
    code: 'E920',
    name: 'L-cysteine',
    description: 'Flour treatment agent used in baked goods.',
    status: 'doubtful',
    source: 'Can be derived from human hair, animal feathers, or synthetic'
  },
  {
    code: 'E951',
    name: 'Aspartame',
    description: 'Artificial sweetener used in diet sodas and low-calorie products.',
    status: 'halal',
    source: 'Synthetic'
  },
  {
    code: 'E966',
    name: 'Lactitol',
    description: 'Sweetener and texturizer used in sugar-free foods.',
    status: 'halal',
    source: 'Derived from lactose (milk sugar)'
  },
  {
    code: 'E1105',
    name: 'Lysozyme',
    description: 'Preservative used in cheese production.',
    status: 'doubtful',
    source: 'Usually derived from egg whites'
  }
];

// Search function that filters the database based on a query string
export const searchECodes = (query: string): Promise<ECodeData[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      if (!query) {
        resolve([]);
        return;
      }
      
      const normalizedQuery = query.toLowerCase().trim();
      
      const results = ecodeDatabase.filter(item => 
        item.code.toLowerCase().includes(normalizedQuery) || 
        item.name.toLowerCase().includes(normalizedQuery)
      );
      
      resolve(results);
    }, 500); // Simulate a 500ms API delay
  });
};

// Get all E-codes function
export const getAllECodes = (): Promise<ECodeData[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(ecodeDatabase);
    }, 500);
  });
};

// Get popular/featured E-codes function
export const getFeaturedECodes = (): Promise<ECodeData[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Return a subset of the database
      resolve(ecodeDatabase.slice(0, 12));
    }, 500);
  });
};
