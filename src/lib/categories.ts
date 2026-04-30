export interface ECodeCategory {
  slug: string;
  title: string;
  rangeStart: number;
  rangeEnd: number;
  rangeLabel: string;
  shortDescription: string;
  longDescription: string;
}

export const ECODE_CATEGORIES: ECodeCategory[] = [
  {
    slug: 'colours',
    title: 'Colours',
    rangeStart: 100,
    rangeEnd: 199,
    rangeLabel: 'E100–E199',
    shortDescription: 'Food colourings used to add or restore colour in foods.',
    longDescription:
      'Colours (E100–E199) are food additives used to enhance or restore the visual appearance of food. They include natural pigments such as curcumin and beetroot red as well as synthetic dyes like tartrazine and sunset yellow.',
  },
  {
    slug: 'preservatives',
    title: 'Preservatives',
    rangeStart: 200,
    rangeEnd: 299,
    rangeLabel: 'E200–E299',
    shortDescription: 'Additives that extend shelf life by preventing spoilage.',
    longDescription:
      'Preservatives (E200–E299) inhibit the growth of bacteria, yeasts and moulds, helping foods stay safe for longer. They include sorbates, benzoates, sulphites and nitrites.',
  },
  {
    slug: 'antioxidants',
    title: 'Antioxidants',
    rangeStart: 300,
    rangeEnd: 399,
    rangeLabel: 'E300–E399',
    shortDescription: 'Additives that prevent oxidation and rancidity in foods.',
    longDescription:
      'Antioxidants and acidity regulators (E300–E399) slow down the oxidation of fats and oils, preventing rancidity and discolouration. Common examples include ascorbic acid (vitamin C) and tocopherols (vitamin E).',
  },
  {
    slug: 'emulsifiers',
    title: 'Emulsifiers',
    rangeStart: 400,
    rangeEnd: 499,
    rangeLabel: 'E400–E499',
    shortDescription: 'Stabilisers, thickeners and emulsifiers that bind ingredients together.',
    longDescription:
      'Emulsifiers, stabilisers and thickeners (E400–E499) help maintain texture, blend oil and water, and improve consistency. They include alginates, lecithins, gums and mono- and diglycerides of fatty acids.',
  },
  {
    slug: 'acidity-regulators',
    title: 'Acidity Regulators',
    rangeStart: 500,
    rangeEnd: 599,
    rangeLabel: 'E500–E599',
    shortDescription: 'Additives that control the acidity or alkalinity of food.',
    longDescription:
      'Acidity regulators and anti-caking agents (E500–E599) control pH and prevent powdered ingredients from clumping. Common examples include sodium bicarbonate, calcium phosphates and silicon dioxide.',
  },
  {
    slug: 'flavour-enhancers',
    title: 'Flavour Enhancers',
    rangeStart: 600,
    rangeEnd: 699,
    rangeLabel: 'E600–E699',
    shortDescription: 'Additives that intensify the existing flavours of food.',
    longDescription:
      'Flavour enhancers (E600–E699) amplify the taste of foods without imparting their own flavour. The most familiar example is monosodium glutamate (MSG, E621), along with related glutamates, inosinates and guanylates.',
  },
  {
    slug: 'sweeteners-glazing-agents',
    title: 'Sweeteners & Glazing Agents',
    rangeStart: 900,
    rangeEnd: 999,
    rangeLabel: 'E900–E999',
    shortDescription: 'Artificial sweeteners, glazing agents, propellants and flour treatment agents.',
    longDescription:
      'The E900–E999 range covers a broad mix of additives, including artificial sweeteners (such as aspartame E951, acesulfame K E950, sucralose E955 and saccharin E954), glazing agents like beeswax and shellac, propellants and gases, and flour treatment agents. Many of these are commonly searched by Muslims checking the halal status of sugar-free products and confectionery.',
  },
  {
    slug: 'modified-starches',
    title: 'Modified Starches',
    rangeStart: 1400,
    rangeEnd: 1499,
    rangeLabel: 'E1400–E1499',
    shortDescription: 'Chemically or physically modified starches used as thickeners and stabilisers.',
    longDescription:
      'Modified starches (E1400–E1499) are starches that have been physically, enzymatically or chemically altered to improve their performance as thickeners, stabilisers and texture enhancers. They are widely used in sauces, soups, baby foods and ready meals and are usually plant-based, though halal status can depend on the processing aids used.',
  },
];

export const getCategoryBySlug = (slug: string | undefined): ECodeCategory | undefined =>
  ECODE_CATEGORIES.find((c) => c.slug === slug);

export const getCategoryForCode = (code: string): ECodeCategory | undefined => {
  const num = parseInt(code.replace(/[^0-9]/g, ''), 10);
  if (Number.isNaN(num)) return undefined;
  return ECODE_CATEGORIES.find((c) => num >= c.rangeStart && num <= c.rangeEnd);
};
