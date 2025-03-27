
import { ECodeData } from '../components/ECode';

// Sample data - this would normally come from an API or database
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
    code: 'E120',
    name: 'Cochineal / Carminic Acid',
    description: 'Red color extracted from the dried bodies of female insect Dactylopius coccus. Used in fruit drinks, sweets, and cosmetics.',
    status: 'doubtful',
    source: 'Insect-derived'
  },
  {
    code: 'E422',
    name: 'Glycerol / Glycerin',
    description: 'A sweet-tasting, colorless, thick liquid. Used as a sweetener, solvent, and preservative in food and pharmaceutical products.',
    status: 'doubtful',
    source: 'Can be derived from animal fats or vegetable oils'
  },
  {
    code: 'E471',
    name: 'Mono- and diglycerides of fatty acids',
    description: 'Emulsifiers used in baked goods, ice cream, chewing gum, shortening, whipped toppings, margarine.',
    status: 'doubtful',
    source: 'Can be derived from animal fats or vegetable oils'
  },
  {
    code: 'E160c',
    name: 'Paprika extract',
    description: 'A deep red spice made from dried and ground red peppers. Used as a natural coloring agent in various food products.',
    status: 'halal',
    source: 'Plant-based (paprika peppers)'
  },
  {
    code: 'E300',
    name: 'Ascorbic Acid (Vitamin C)',
    description: 'A natural antioxidant and nutrient. Used to maintain color, enhance shelf life, and add nutritional value.',
    status: 'halal',
    source: 'Chemical synthesis or fruit extracts'
  },
  {
    code: 'E904',
    name: 'Shellac',
    description: 'A resin secreted by the female lac bug. Used as glazing agent for pills, candy, and fruit coating.',
    status: 'doubtful',
    source: 'Insect-derived'
  },
  {
    code: 'E441',
    name: 'Gelatin',
    description: 'A translucent, colorless, flavorless food ingredient derived from collagen. Used in jellies, candies, and marshmallows.',
    status: 'doubtful',
    source: 'Animal-derived (usually from pig or cow)'
  },
  {
    code: 'E631',
    name: 'Sodium Inosinate',
    description: 'A flavor enhancer used in conjunction with monosodium glutamate (MSG) in many savory foods.',
    status: 'doubtful',
    source: 'Can be derived from animal or plant sources'
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
      resolve(ecodeDatabase.slice(0, 6));
    }, 500);
  });
};
