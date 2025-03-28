import { ECodeData } from '../components/ECode';

// Database populated from the provided schema structure
const rawEcodeDatabase = [
  {
    "E-Code": "E100",
    "Chemical_Name": "Curcumin",
    "Description": "Natural color",
    "Remarks": "A natural yellow color extracted from turmeric root. Used in curry powders, mustards, broths, and other foods.",
    "HALAL": true
  },
  {
    "E-Code": "E101",
    "Chemical_Name": "Riboflavin (Vitamin B2)",
    "Description": "Natural color",
    "Remarks": "A naturally occurring yellow to orange-yellow crystalline powder. Used in cereals, pastas, sauces, processed cheese, and fruit drinks.",
    "HALAL": true
  },
  {
    "E-Code": "E102",
    "Chemical_Name": "Tartrazine",
    "Description": "Synthetic color",
    "Remarks": "Synthetic yellow azo dye used in soft drinks, candies, and other food products.",
    "HALAL": true
  },
  {
    "E-Code": "E104",
    "Chemical_Name": "Quinoline Yellow",
    "Description": "Synthetic color",
    "Remarks": "Synthetic yellow food coloring used in various food products.",
    "HALAL": true
  },
  {
    "E-Code": "E110",
    "Chemical_Name": "Sunset Yellow FCF",
    "Description": "Synthetic color",
    "Remarks": "Orange-yellow synthetic food dye used in snack foods, cereals, and beverages.",
    "HALAL": true
  },
  {
    "E-Code": "E120",
    "Chemical_Name": "Cochineal / Carminic Acid",
    "Description": "Natural color",
    "Remarks": "Red color extracted from the dried bodies of female insect Dactylopius coccus. Used in fruit drinks, sweets, and cosmetics.",
    "HALAL": false
  },
  {
    "E-Code": "E122",
    "Chemical_Name": "Azorubine / Carmoisine",
    "Description": "Synthetic color",
    "Remarks": "Synthetic red food dye used in various food products.",
    "HALAL": true
  },
  {
    "E-Code": "E123",
    "Chemical_Name": "Amaranth",
    "Description": "Synthetic color",
    "Remarks": "Synthetic deep red to purple food dye.",
    "HALAL": true
  },
  {
    "E-Code": "E124",
    "Chemical_Name": "Ponceau 4R",
    "Description": "Synthetic color",
    "Remarks": "Synthetic red food coloring used in various food products.",
    "HALAL": true
  },
  {
    "E-Code": "E127",
    "Chemical_Name": "Erythrosine",
    "Description": "Synthetic color",
    "Remarks": "Synthetic cherry-pink food dye used in candies and popsicles.",
    "HALAL": true
  },
  {
    "E-Code": "E129",
    "Chemical_Name": "Allura Red AC",
    "Description": "Synthetic color",
    "Remarks": "Synthetic red food dye used in many food products.",
    "HALAL": true
  },
  {
    "E-Code": "E131",
    "Chemical_Name": "Patent Blue V",
    "Description": "Synthetic color",
    "Remarks": "Synthetic blue food coloring used in various food products.",
    "HALAL": true
  },
  {
    "E-Code": "E635",
    "Chemical_Name": "Disodium 5'-ribonucleotides",
    "Description": "Flavor enhancer",
    "Remarks": "Used in savory foods. Can be derived from animal or plant sources.",
    "HALAL": false
  },
  {
    "E-Code": "E636", 
    "Chemical_Name": "MaltoI",
    "Description": "Flavour Enhancer",
    "Remarks": "Occurs naturally in the bark of larch trees, pine needles and roasted malt. May also be obtained by the alkaline hydrolysis of streptomycin salt",
    "HALAL": true
  }
  // ... additional entries would follow the same pattern
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
