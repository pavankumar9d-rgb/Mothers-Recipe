import { MealBase, PalateProfile, BitePairing } from '../types';

export const MEAL_BASES: MealBase[] = [
  {
    id: 'rice-ghee',
    name: 'Steamed Rice & Desi Ghee',
    description: 'Hot fragrant sona masoori or basmati grains bathed in melted golden cow ghee.',
    culinaryContext: 'The canonical South Indian comfort foundation — ghee mellows intense heat while lifting aromatic spices.',
    iconName: 'Soup'
  },
  {
    id: 'laccha-paratha',
    name: 'Crisp Laccha Paratha',
    description: 'Multi-layered tawa-toasted wheat flatbread with blistered golden crusts.',
    culinaryContext: 'A North Indian staple whose flaky richness begs for sharp, mustard-steeped piquant pickles.',
    iconName: 'Flame'
  },
  {
    id: 'idli-dosa',
    name: 'Soft Idli & Crispy Dosa',
    description: 'Fermented stone-ground rice & urad dal cakes or paper-thin fermented crepes.',
    culinaryContext: 'Gentle lactic acidity that pairs magnificently with tangy gongura, ginger, or piquant tomato pickles.',
    iconName: 'CircleDot'
  },
  {
    id: 'dal-khichdi',
    name: 'Moong Dal Khichdi',
    description: 'Slow-simmered rice and split yellow lentils tempered with cumin and hing.',
    culinaryContext: 'India’s ultimate soul bowl — the soothing neutrality of khichdi comes alive with a sharp spoonful of achaar.',
    iconName: 'Sparkles'
  },
  {
    id: 'mathri-snacks',
    name: 'Savoury Mathri & Thepla',
    description: 'Spiced fenugreek flatbreads, crisp ajwain crackers, and evening teatime savouries.',
    culinaryContext: 'Dry, travel-friendly bites elevated by sweet-and-sour choondo or stuffed red chilli pickle.',
    iconName: 'Coffee'
  }
];

export const PALATE_PROFILES: PalateProfile[] = [
  {
    id: 'fiery-pungent',
    name: 'Fiery & Pungent',
    subtitle: 'Guntur Sun-Dried Chillies & Mustard Shock',
    intensity: 'Intense',
    character: 'High-voltage spice kick followed by the deep, lingering sharpness of cold-pressed mustard oil.'
  },
  {
    id: 'sweet-tangy',
    name: 'Sun-Cured Sweet & Tangy',
    subtitle: 'Shredded Mango, Cumin & Warm Jaggery',
    intensity: 'Mild',
    character: 'Slow solar crystallization that balances raw sourness with caramelized warmth and warming cloves.'
  },
  {
    id: 'roasted-garlic',
    name: 'Roasted Garlic & Piquant',
    subtitle: 'Whole Allium Cloves & Ground Fenugreek',
    intensity: 'Bold',
    character: 'Savory depth, toasted pungency, and a mellow garlicky warmth that spreads across the palate.'
  },
  {
    id: 'earthy-mustard',
    name: 'Earthy Mustard Oil & Tangy',
    subtitle: 'Traditional Punjabi Style with Whole Spices',
    intensity: 'Bold',
    character: 'Aromatic kalonji, saunf, and firm green mango wedges soaked in raw pungent mustard oil.'
  }
];

export const BITE_PAIRINGS: BitePairing[] = [
  {
    mealId: 'rice-ghee',
    palateId: 'fiery-pungent',
    productSlug: 'andhra-avakaya-pickle-200-gm',
    pickleTitle: 'Andhra Avakaya Pickle (200g)',
    servingImage: '/assets/editorial/serving/serving-meal-rice-thali.jpg',
    dishName: 'Annam Muddha with Andhra Avakaya & Pure Ghee',
    culinaryRationale: 'The steaming hot rice melts the ghee, creating a rich lipid shield that allows the fiery Guntur chilli and pungent mustard powder to release their aromatics without overwhelming your palate.',
    tastingNotes: ['Fiery Red Heat', 'Mustard Pungency', 'Rich Melted Ghee', 'Raw Mango Crunch']
  },
  {
    mealId: 'rice-ghee',
    palateId: 'sweet-tangy',
    productSlug: 'andhra-tomato-pickle-200-gm',
    pickleTitle: 'Andhra Tomato Pickle (200g)',
    servingImage: '/assets/editorial/serving/serving-meal-rice-thali.jpg',
    dishName: 'Ghee Rice with Sun-Ripened Andhra Tomato Achaar',
    culinaryRationale: 'Concentrated sun-dried tomato umami cuts through the silkiness of melted cow ghee, creating an addictive sweet-sour interplay with a lingering hint of fenugreek and asafoetida.',
    tastingNotes: ['Tomato Umami', 'Subtle Tamarind Tang', 'Fenugreek Bittersweet', 'Velvety Oil Texture']
  },
  {
    mealId: 'rice-ghee',
    palateId: 'roasted-garlic',
    productSlug: 'andhra-ginger-pickle-200-gm',
    pickleTitle: 'Andhra Ginger Pickle (200g)',
    servingImage: '/assets/editorial/serving/serving-meal-rice-thali.jpg',
    dishName: 'Curd Rice & Ghee with Piquant Allam Pachadi (Ginger)',
    culinaryRationale: 'Zesty ground ginger provides a fiery digestive spark. Paired with warm ghee rice or cool curd rice, it delivers a rejuvenating balance of warmth, sour tamarind, and jaggery undertones.',
    tastingNotes: ['Zesty Fresh Ginger', 'Tamarind Tang', 'Warming Heat', 'Balanced Sweet Note']
  },
  {
    mealId: 'rice-ghee',
    palateId: 'earthy-mustard',
    productSlug: 'punjabi-mango-pickle-400-gm',
    pickleTitle: 'Punjabi Mango Pickle (400g)',
    servingImage: '/assets/editorial/serving/serving-meal-rice-thali.jpg',
    dishName: 'Comforting Rice Plate with Punjabi Mango & Whole Kalonji',
    culinaryRationale: 'The deep, pungent fragrance of raw mustard oil and nigella seeds cuts through the starch of rice, transforming a simple everyday lunch into a feast of northern heritage.',
    tastingNotes: ['Mustard Oil Aromatics', 'Firm Mango Flesh', 'Kalonji Notes', 'Traditional North Spice']
  },
  {
    mealId: 'laccha-paratha',
    palateId: 'fiery-pungent',
    productSlug: 'green-chilli-pickle-200-gm',
    pickleTitle: 'Green Chilli Pickle (200g)',
    servingImage: '/assets/editorial/serving/serving-meal-paratha-pickle.jpg',
    dishName: 'Layered Paratha with Piquant Slit Green Chilli Pickle',
    culinaryRationale: 'Flaky, butter-rich layers of paratha cradle the razor-sharp heat of tender green chillies cured with mustard seeds and lemon juice, giving an exhilarating crackle of spice in every tear.',
    tastingNotes: ['Crisp Chilli Crunch', 'Mustard Seed Crackle', 'Citrus Zing', 'Direct Sharp Heat']
  },
  {
    mealId: 'laccha-paratha',
    palateId: 'sweet-tangy',
    productSlug: 'punjabi-mango-pickle-200-gm',
    pickleTitle: 'Punjabi Mango Pickle (200g)',
    servingImage: '/assets/editorial/serving/serving-meal-paratha-pickle.jpg',
    dishName: 'Tawa Laccha Paratha with Punjabi Mango Achaar',
    culinaryRationale: 'The classic dhaba union: buttery crisp wheat layers rolled around thick mango masala packed with fennel (saunf) and fenugreek seeds, delivering earthy comfort and sweet-sour joy.',
    tastingNotes: ['Saunf & Methi Aroma', 'Buttery Dough Harmony', 'Deep Mustard Oil', 'Tender Rind']
  },
  {
    mealId: 'laccha-paratha',
    palateId: 'roasted-garlic',
    productSlug: 'stuffed-red-chilli-pickle-200-gm',
    pickleTitle: 'Banarasi Stuffed Red Chilli Pickle (200g)',
    servingImage: '/assets/editorial/serving/serving-meal-paratha-pickle.jpg',
    dishName: 'Crisp Paratha with Spiced Banarasi Bharwa Lal Mirch',
    culinaryRationale: 'Thick fleshy red pepper pods stuffed with coarse dry-roasted spices and mustard oil provide a juicy, textured bite that spreads seamlessly across crisp hot flatbreads.',
    tastingNotes: ['Thick Succulent Pepper', 'Dry-Roasted Masala', 'Mellowed Heat', 'Aromatic Amchur']
  },
  {
    mealId: 'laccha-paratha',
    palateId: 'earthy-mustard',
    productSlug: 'mothers-recipe-red-stuffed-chilli-pickle-500gm',
    pickleTitle: 'Red Stuffed Chilli Pickle (500g Jar)',
    servingImage: '/assets/editorial/serving/serving-meal-paratha-pickle.jpg',
    dishName: 'Grand Dhaba Paratha with Handcrafted Stuffed Chilli Pods',
    culinaryRationale: 'A hearty feast pairing: the smoky wheat exterior contrasts the unctuous spiced interior of the Banarasi red pod, bursting with mustard seed pungent notes.',
    tastingNotes: ['Robust Mustard Paste', 'Plump Sun-Cured Pod', 'Smoky Tawa Contrast', 'Bold Heritage Note']
  },
  {
    mealId: 'idli-dosa',
    palateId: 'fiery-pungent',
    productSlug: 'andhra-tomato-pickle-200-gm',
    pickleTitle: 'Andhra Tomato Pickle (200g)',
    servingImage: '/assets/editorial/serving/serving-meal-rice-thali.jpg',
    dishName: 'Fluffy Steamed Idli with Andhra Tomato Thokku',
    culinaryRationale: 'Porous, cloud-like idlis absorb the thick, spiced tomato oil like a sponge. The tomato acidity complements the ferment in the idli batter, making every bite succulent.',
    tastingNotes: ['Juicy Tomato Paste', 'Tempered Mustard Crunch', 'Tangy Ferment Synergy', 'Vibrant Crimson Oil']
  },
  {
    mealId: 'idli-dosa',
    palateId: 'sweet-tangy',
    productSlug: 'andhra-ginger-pickle-200-gm',
    pickleTitle: 'Andhra Ginger Pickle (Allam Pachadi)',
    servingImage: '/assets/editorial/serving/serving-meal-rice-thali.jpg',
    dishName: 'Crisp Ghee Roast Dosa with Classic Allam Pachadi',
    culinaryRationale: 'The undisputed royal breakfast of coastal Andhra: golden paper dosa dipped into sweet, spicy, tamarind-infused ginger pachadi, delivering an instant morning sensory awakening.',
    tastingNotes: ['Fiery Ginger Bite', 'Tamarind Sweetness', 'Golden Crepe Crunch', 'Morning Energy']
  },
  {
    mealId: 'idli-dosa',
    palateId: 'roasted-garlic',
    productSlug: 'andhra-avakaya-pickle-200-gm',
    pickleTitle: 'Andhra Avakaya Pickle (200g)',
    servingImage: '/assets/editorial/serving/serving-meal-rice-thali.jpg',
    dishName: 'Podi Dosa with Crushed Avakaya Oil Drizzle',
    culinaryRationale: 'A spoonful of ruby-red avakaya oil trickled over hot podi dosa marries garlic and mustard oils directly to the crunchy crepe lattice for an unforgettable street-style punch.',
    tastingNotes: ['Toasted Lentil Podi', 'Spiced Oil Drizzle', 'Crisp Edge Crunch', 'Guntur Heat Kick']
  },
  {
    mealId: 'idli-dosa',
    palateId: 'earthy-mustard',
    productSlug: 'green-chilli-pickle-200-gm',
    pickleTitle: 'Green Chilli Pickle (200g)',
    servingImage: '/assets/editorial/serving/serving-meal-paratha-pickle.jpg',
    dishName: 'Steamed Rava Idli with Crunchy Green Chilli Relish',
    culinaryRationale: 'The mild graininess of rava idli needs a crisp, vibrant counterpoint. The sharp mustard and lime cured chillies provide the exact punch needed.',
    tastingNotes: ['Mustard Oil Snap', 'Bright Green Heat', 'Herbal Freshness', 'Delicate Batter Counter']
  },
  {
    mealId: 'dal-khichdi',
    palateId: 'fiery-pungent',
    productSlug: 'andhra-avakaya-pickle-200-gm',
    pickleTitle: 'Andhra Avakaya Pickle (200g)',
    servingImage: '/assets/editorial/serving/serving-meal-rice-thali.jpg',
    dishName: 'Ghee-Tempered Moong Khichdi with Spicy Avakaya Wedge',
    culinaryRationale: 'Khichdi is soothing; Avakaya is electrifying. A tiny dab of raw spiced mango on a forkful of mild dal khichdi creates the essential yin-yang of Indian comfort dining.',
    tastingNotes: ['Mellow Lentil Silk', 'Electrifying Mustard Shock', 'Satisfying Salt & Tang', 'Crisp Mango Wedge']
  },
  {
    mealId: 'dal-khichdi',
    palateId: 'sweet-tangy',
    productSlug: 'punjabi-mango-pickle-200-gm',
    pickleTitle: 'Punjabi Mango Pickle (200g)',
    servingImage: '/assets/editorial/serving/serving-meal-rice-thali.jpg',
    dishName: 'Comforting Moong Khichdi with Punjabi Mango Masala',
    culinaryRationale: 'The whole fennel seeds and mellowed fenugreek in Punjabi mango achaar add herbal complexity and a gentle tang to the earthy comfort of stewed lentils and rice.',
    tastingNotes: ['Gentle Herbal Notes', 'Mellow Acidity', 'Warm Comforting Grain', 'Aromatic Oil Swirl']
  },
  {
    mealId: 'dal-khichdi',
    palateId: 'roasted-garlic',
    productSlug: 'stuffed-green-chilli-pickle-200-gm',
    pickleTitle: 'Stuffed Green Chilli Pickle (200g)',
    servingImage: '/assets/editorial/serving/serving-meal-paratha-pickle.jpg',
    dishName: 'Piping Hot Khichdi with Stuffed Green Chilli Pod',
    culinaryRationale: 'Tender green chillies filled with aromatic ground spices and mustard oil release warm bursts of roasted cumin and amchur without scalding your tongue.',
    tastingNotes: ['Warm Amchur Tang', 'Roasted Cumin Notes', 'Juicy Pepper Skin', 'Balanced Spicing']
  },
  {
    mealId: 'dal-khichdi',
    palateId: 'earthy-mustard',
    productSlug: 'punjabi-mango-pickle-400-gm',
    pickleTitle: 'Punjabi Mango Pickle (400g Jar)',
    servingImage: '/assets/editorial/serving/serving-meal-rice-thali.jpg',
    dishName: 'Desi Khichdi Plate with Whole Kalonji & Mango Wedge',
    culinaryRationale: 'The classic North Indian prescription for rain-soaked evenings: steaming khichdi crowned with pure ghee, roasted papad, and a thick spoonful of mustard-oil pickled mango.',
    tastingNotes: ['Rainy Day Comfort', 'Raw Mustard Bite', 'Papad Crunch Contrast', 'Hearty Lentil Depth']
  },
  {
    mealId: 'mathri-snacks',
    palateId: 'fiery-pungent',
    productSlug: 'stuffed-red-chilli-pickle-200-gm',
    pickleTitle: 'Stuffed Red Chilli Pickle (200g)',
    servingImage: '/assets/editorial/serving/serving-meal-paratha-pickle.jpg',
    dishName: 'Flaky Ajwain Mathri with Bharwa Lal Mirch Filling',
    culinaryRationale: 'Break open a crisp mathri, scoop a bit of the rich stuffed red chilli masala, and savor the contrast between crumbly shortcrust pastry and oil-cured fiery spices.',
    tastingNotes: ['Crumbly Pastry Flake', 'Ajwain & Pepper Harmony', 'Dense Masala Paste', 'Satisfying Crunch']
  },
  {
    mealId: 'mathri-snacks',
    palateId: 'sweet-tangy',
    productSlug: 'punjabi-mango-pickle-200-gm',
    pickleTitle: 'Punjabi Mango Pickle (200g)',
    servingImage: '/assets/editorial/serving/serving-meal-paratha-pickle.jpg',
    dishName: 'Methi Thepla Roll with Tangy Mango Achaar',
    culinaryRationale: 'The quintessential Gujarat & Bombay travel bite: soft fenugreek thepla smeared with sweet-and-sour spiced mango oil, remaining moist and intensely flavorful for hours.',
    tastingNotes: ['Fenugreek Bittersweet', 'Sweet-Tangy Mango', 'Soft Foldable Dough', 'Long-lasting Flavor']
  },
  {
    mealId: 'mathri-snacks',
    palateId: 'roasted-garlic',
    productSlug: 'green-chilli-pickle-200-gm',
    pickleTitle: 'Green Chilli Pickle (200g)',
    servingImage: '/assets/editorial/serving/serving-meal-paratha-pickle.jpg',
    dishName: 'Kachori & Samosa Chaat with Piquant Green Chilli Relish',
    culinaryRationale: 'Deep-fried lentil pastries with spiced potato fillings are lifted to restaurant caliber when paired with the crisp, mustard-tempered bite of fresh pickled green chillies.',
    tastingNotes: ['Pastry Crispness', 'Sharp Mustard Cleanser', 'Acidic Refreshment', 'Spiced Depth']
  },
  {
    mealId: 'mathri-snacks',
    palateId: 'earthy-mustard',
    productSlug: 'mothers-recipe-red-stuffed-chilli-pickle-500gm',
    pickleTitle: 'Red Stuffed Chilli Pickle (500g)',
    servingImage: '/assets/editorial/serving/serving-meal-paratha-pickle.jpg',
    dishName: 'Evening Chai Table with Mathri & Stuffed Chilli Specimen',
    culinaryRationale: 'The ultimate teatime companion across Uttar Pradesh and Bihar: robust ginger chai cutting through the savoury crunch of mathri and the deep spiced oil of stuffed red chillies.',
    tastingNotes: ['Chai Sweetness Balance', 'Savory Dough Texture', 'Heirloom Spice Aroma', 'Slow Warming Finish']
  }
];

export const HERITAGE_HERO_PRODUCTS = [
  {
    slug: 'andhra-avakaya-pickle-200-gm',
    title: 'Andhra Avakaya Pickle',
    badge: 'Fiery Andhra Heritage',
    region: 'Coastal Andhra',
    weight: '200g Glass Jar',
    price: '₹105',
    spiceIntensity: 5,
    spiceLabel: 'Fiery' as const,
    flavourNotes: ['Guntur Teja Chillies', 'Yellow Mustard Oil', 'Unpeeled Raw Mango', 'Kurnool Garlic'],
    heroQuote: 'Sun-cured raw mango wedges steeped in fiery Guntur red chillies and pungent stone-ground mustard powder.',
    cutout: '/assets/products/cutouts/andhra-avakaya-pickle-200-gm.png'
  },
  {
    slug: 'punjabi-mango-pickle-400-gm',
    title: 'Punjabi Mango Pickle',
    badge: 'North Indian Classic',
    region: 'Punjab',
    weight: '400g Pet Jar',
    price: '₹140',
    spiceIntensity: 4,
    spiceLabel: 'Robust' as const,
    flavourNotes: ['Cold-Pressed Mustard Oil', 'Kalonji (Nigella)', 'Whole Saunf (Fennel)', 'Methi Dana'],
    heroQuote: 'The soul of Punjab — thick mango cubes steeped in pungent mustard oil, seasoned with aromatic fennel and nigella.',
    cutout: '/assets/products/cutouts/punjabi-mango-pickle-400-gm.png'
  },
  {
    slug: 'mothers-recipe-red-stuffed-chilli-pickle-500gm',
    title: 'Stuffed Red Chilli Pickle',
    badge: 'Banarasi Artisanal Heritage',
    region: 'Varanasi, UP',
    weight: '500g Master Jar',
    price: '₹225',
    spiceIntensity: 4,
    spiceLabel: 'Robust' as const,
    flavourNotes: ['Sun-Dried Lal Mirch Pods', 'Dry Roasted Spices', 'Tangy Amchur', 'Pure Mustard Oil'],
    heroQuote: 'Hand-stuffed whole plump red chilli pods packed with stone-ground dry spices and aged under the northern winter sun.',
    cutout: '/assets/products/cutouts/mothers-recipe-red-stuffed-chilli-pickle-500gm.png'
  },
  {
    slug: 'green-chilli-pickle-200-gm',
    title: 'Green Chilli Pickle',
    badge: 'Piquant Table Essential',
    region: 'All India',
    weight: '200g Glass Jar',
    price: '₹95',
    spiceIntensity: 4,
    spiceLabel: 'Fiery' as const,
    flavourNotes: ['Fresh Slit Green Chillies', 'Yellow Mustard Seeds', 'Lemon Juice Essence', 'Aromatic Fenugreek'],
    heroQuote: 'Fresh crisp green chillies slit and cured in ground mustard seeds with a bright burst of lime acidity.',
    cutout: '/assets/products/cutouts/green-chilli-pickle-200-gm.png'
  }
];

export const ALCHEMY_STEPS = [
  {
    step: '01',
    title: 'The Orchard Harvest',
    subtitle: 'Selected Raw Mangoes & Native Produce',
    description: 'We source firm, sour green mangoes picked at early dawn before the sun warms the trees. Each fruit is inspected for stone-hard seed chambers and crisp, tart flesh that retains its integrity throughout curing.',
    detail: 'Varieties chosen for peak pectin and acidity levels: Totapuri, Rajapuri, and native Andhra cultivars.',
    accent: '#1A3026',
    texture: '/assets/editorial/textures/macro-spices-pickle-oil.jpg'
  },
  {
    step: '02',
    title: 'Whole Spice Roasting',
    subtitle: 'Stone-Pounded Methi, Rai & Kalonji',
    description: 'Whole spices are gently toasted in small batches on heavy iron griddles to awaken their natural essential oils. Coarsely ground on traditional stone mills rather than pulverized into dust, preserving their texture and crunch.',
    detail: 'Never pre-ground extracts. Pure yellow mustard seeds (rai), fenugreek (methi), and nigella (kalonji).',
    accent: '#D4972C',
    texture: '/assets/editorial/story/ingredient-tabletop-2.jpg'
  },
  {
    step: '03',
    title: 'Cold-Pressed Preserving Oil',
    subtitle: 'The Pungent Golden Elixir',
    description: 'Pure mustard oil and gingelly (sesame) oils act as living preservatives. Their natural allyl isothiocyanates create an oxygen-free blanket that seals each spice particle, warding off spoilage while maturing flavors.',
    detail: 'Unrefined, unfiltered oils that deepen in golden clarity and pungency with time.',
    accent: '#B82E1E',
    texture: '/assets/editorial/story/ingredient-tabletop-1.jpg'
  },
  {
    step: '04',
    title: 'The Ceramic Barni Maturation',
    subtitle: 'Sun-Drenched Clay Jar Ferment',
    description: 'Tied with white muslin cloth, traditional ceramic Barni jars sit on sun terraces for up to 21 days. The diurnal solar warmth gently softens tough rinds, melding sour mango juices into the spiced oil matrix.',
    detail: 'The age-old ritual that cannot be rushed by industrial autoclaves or chemical accelerants.',
    accent: '#1C1917',
    texture: '/assets/editorial/story/regional-flavour-craft.jpg'
  }
];
