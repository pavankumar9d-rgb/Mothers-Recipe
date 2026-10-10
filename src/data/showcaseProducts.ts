export type Sprite =
  | 'gongura-leaf'
  | 'curry-leaf'
  | 'red-chilli'
  | 'green-chilli'
  | 'chilli-flake'
  | 'garlic'
  | 'mustard'
  | 'lime'
  | 'ginger'
  | 'tomato'
  | 'tomato-slice'
  | 'mango'
  | 'tamarind';

export type Ingredient = {
  name: string;
  share?: string;
  detail: string;
  sprite: Sprite;
};

export type Details = {
  ingredients: Ingredient[];
  highlights: string[];
  specs: { label: string; value: string }[];
  heat: number;
  scatter: Partial<Record<Sprite, number>>;
};

export type ShowcaseProduct = {
  id: string;
  name: string;
  lines: string[];
  kind: string;
  image: string;
  fallbackImage: string;
  description: string;
  note: string;
  url: string;
  details: Details;
};

const storage = { label: 'Storage', value: 'Cool, dry place · dry, clean spoon' };

export const SHOWCASE_PRODUCTS: ShowcaseProduct[] = [
  {
    id: 'andhra-avakaya',
    name: 'Andhra Avakaya',
    lines: ['ANDHRA', 'AVAKAYA'],
    kind: 'Pickle',
    image: 'assets/products/cutouts/andhra-avakaya-pickle-200-gm.png',
    fallbackImage: 'assets/products/originals/andhra-avakaya-pickle-200-gm/andhra-avakaya-pickle-200-gm-front-original.png',
    description:
      'The unmistakable taste of authentic Andhra Avakaya. Hand-sliced firm green mangoes, pungent mustard powder, and sun-dried fiery Guntur chillies come together in this timeless favourite — a treasured companion to hot rice and pure ghee.',
    note: 'Raw Mango · Mustard · Guntur Chillies',
    url: 'https://www.mothersrecipe.com/products/andhra-avakaya-pickle-200-gm',
    details: {
      ingredients: [
        {
          name: 'Raw Mango',
          detail: 'Firm, sour orchard mango cut with skin intact, so every piece retains its crisp bite.',
          sprite: 'mango'
        },
        {
          name: 'Ground Mustard',
          detail: 'Stone-pounded yellow & brown mustard imparts avakaya its sharp, pungent warmth.',
          sprite: 'mustard'
        },
        {
          name: 'Guntur Chillies',
          detail: 'Sun-dried Andhra chillies for intense crimson colour and slow, building fire.',
          sprite: 'chilli-flake'
        },
        {
          name: 'Garlic Cloves',
          detail: 'Whole cloves that soak up the spiced oil and soften into fragrant gems over time.',
          sprite: 'garlic'
        }
      ],
      highlights: [
        'The quintessential Andhra summer pickle',
        'Bold stone-ground mustard & chilli masala',
        'Crafted to be savoured with hot rice and melted ghee'
      ],
      specs: [
        { label: 'Taste Profile', value: 'Fiery · Pungent · Raw Tang' },
        { label: 'Best With', value: 'Hot Rice & Desi Ghee, Curd Rice' },
        storage
      ],
      heat: 5,
      scatter: { mango: 9, mustard: 7, 'chilli-flake': 12, 'red-chilli': 4, garlic: 3 }
    }
  },
  {
    id: 'andhra-tomato',
    name: 'Andhra Tomato Pickle',
    lines: ['ANDHRA', 'TOMATO'],
    kind: 'Pickle',
    image: 'assets/products/cutouts/andhra-tomato-pickle-200-gm.png',
    fallbackImage: 'assets/products/originals/andhra-tomato-pickle-200-gm/andhra-tomato-pickle-200-gm-front-original.png',
    description:
      'Sun-ripened tomatoes, garlic and red chillies, simmered and tempered with mustard and aromatic fenugreek. A rich, tangy-piquant pickle to bring the comforting warmth of regional kitchen craft to your everyday meal.',
    note: 'Sun-Dried Tomato · Garlic · Fenugreek',
    url: 'https://www.mothersrecipe.com/products/andhra-tomato-pickle-200-gm',
    details: {
      ingredients: [
        {
          name: 'Sun-Ripened Tomato',
          share: '45%',
          detail: 'Ripe tomatoes cooked down with tamarind until rich, concentrated, and jammy.',
          sprite: 'tomato'
        },
        {
          name: 'Garlic Cloves',
          share: '5%',
          detail: 'Plump garlic cloves providing a mellow, roasted allium depth.',
          sprite: 'garlic'
        },
        {
          name: 'Chilli Powder',
          detail: 'Sun-dried red chillies toasted and ground for warm heat and vibrant ruby glaze.',
          sprite: 'chilli-flake'
        },
        {
          name: 'Aromatic Tempering',
          detail: 'Crackled mustard seeds, fenugreek (methi), and crisp curry leaves in unrefined oil.',
          sprite: 'curry-leaf'
        }
      ],
      highlights: [
        '45% luscious tomato pulp in every jar',
        'Steeped in cold-pressed sesame & vegetable oil',
        'No artificial colors or synthetic preservatives'
      ],
      specs: [
        { label: 'Taste Profile', value: 'Tangy · Umami · Piquant Warmth' },
        { label: 'Best With', value: 'Crispy Dosa, Steamed Idli, Rice & Dal' },
        storage
      ],
      heat: 3,
      scatter: {
        tomato: 6,
        'tomato-slice': 5,
        garlic: 4,
        'curry-leaf': 4,
        'red-chilli': 2,
        'chilli-flake': 9,
        mustard: 4
      }
    }
  },
  {
    id: 'stuffed-red-chilli',
    name: 'Stuffed Red Chilli',
    lines: ['STUFFED', 'RED CHILLI'],
    kind: 'Pickle',
    image: 'assets/products/cutouts/stuffed-red-chilli-pickle-200-gm.png',
    fallbackImage: 'assets/products/originals/stuffed-red-chilli-pickle-200-gm/stuffed-red-chilli-pickle-200-gm-front-original.png',
    description:
      'Plump whole red chillies hand-stuffed with coarsely ground roasted spices, fennel seeds, and amchur, steeped in rich mustard oil. A heritage North Indian delicacy with deep savoury warmth and gentle tartness.',
    note: 'Whole Red Chilli · Amchur · Fennel & Mustard',
    url: 'https://www.mothersrecipe.com/products/stuffed-red-chilli-pickle-200g',
    details: {
      ingredients: [
        {
          name: 'Whole Red Chillies',
          share: '35%',
          detail: 'Selected thick-fleshed Banarasi red chillies sun-dried until tender.',
          sprite: 'red-chilli'
        },
        {
          name: 'Amchur (Dry Mango)',
          detail: 'Tart green mango powder balancing the mild chilli heat with citrusy acidity.',
          sprite: 'mango'
        },
        {
          name: 'Fennel & Kalonji',
          detail: 'Coarsely crushed sweet saunf and pungent nigella seeds for aromatic complexity.',
          sprite: 'mustard'
        },
        {
          name: 'Mustard Oil',
          detail: 'Pure pungent mustard oil sealing each stuffed chilli in golden warmth.',
          sprite: 'curry-leaf'
        }
      ],
      highlights: [
        'Hand-stuffed whole red chillies',
        'Traditional Banarasi recipe tradition',
        'Matured in sunlit stoneware barnis'
      ],
      specs: [
        { label: 'Taste Profile', value: 'Robust · Tangy-Spicy · Earthy' },
        { label: 'Best With', value: 'Laccha Paratha, Khichdi, Mathri' },
        storage
      ],
      heat: 4,
      scatter: {
        'red-chilli': 8,
        'chilli-flake': 14,
        garlic: 3,
        mustard: 6,
        'curry-leaf': 3
      }
    }
  },
  {
    id: 'andhra-ginger',
    name: 'Andhra Ginger',
    lines: ['ANDHRA', 'GINGER'],
    kind: 'Pickle',
    image: 'assets/products/cutouts/andhra-ginger-pickle-200-gm.png',
    fallbackImage: 'assets/products/originals/andhra-ginger-pickle-200-gm/andhra-ginger-pickle-200-gm-front-original.png',
    description:
      'Zesty crushed fresh ginger roots infused with tangy tamarind pulp, jaggery sweetness, and roasted fenugreek. The canonical Allam Pachadi crafted to ignite morning breakfast pesarattus and evening curd rice.',
    note: 'Fresh Ginger · Tamarind · Fenugreek & Jaggery',
    url: 'https://www.mothersrecipe.com/products/andhra-ginger-pickle-200-gm',
    details: {
      ingredients: [
        {
          name: 'Fresh Ginger Root',
          share: '28%',
          detail: 'Pungent fibrous ginger washed, peeled, and crushed to release digestive oils.',
          sprite: 'ginger'
        },
        {
          name: 'Tamarind Pulp',
          detail: 'Thick aged tamarind paste lending a deep, sour foundation.',
          sprite: 'tamarind'
        },
        {
          name: 'Natural Jaggery',
          detail: 'Caramelized unrefined jaggery to harmonize sharp ginger spice with gentle sweetness.',
          sprite: 'mango'
        },
        {
          name: 'Roasted Fenugreek',
          detail: 'Slow-toasted methi seeds ground for an aromatic bittersweet finish.',
          sprite: 'mustard'
        }
      ],
      highlights: [
        'Authentic Andhra Allam Pachadi heritage',
        'Invigorating digestive spice profile',
        'Perfect companion for South Indian tiffins'
      ],
      specs: [
        { label: 'Taste Profile', value: 'Zesty Zing · Sweet-Sour · Piquant' },
        { label: 'Best With', value: 'MLA Pesarattu, Upma, Curd Rice' },
        storage
      ],
      heat: 3,
      scatter: {
        ginger: 8,
        tamarind: 4,
        mustard: 5,
        'chilli-flake': 7,
        'green-chilli': 3
      }
    }
  },
  {
    id: 'punjabi-mango',
    name: 'Punjabi Mango',
    lines: ['PUNJABI', 'MANGO'],
    kind: 'Pickle',
    image: 'assets/products/cutouts/punjabi-mango-pickle-200-gm.png',
    fallbackImage: 'assets/products/originals/punjabi-mango-pickle-200-gm/punjabi-mango-pickle-200-gm-front-original.png',
    description:
      'Succulent green mango wedges steeped in raw pungent mustard oil, fennel seeds (saunf), and aromatic kalonji. A robust North Indian staple crafted to elevate parathas, poori, and everyday comfort bowls.',
    note: 'Raw Green Mango · Cold-Pressed Mustard Oil · Kalonji & Saunf',
    url: 'https://www.mothersrecipe.com/products/punjabi-mango-pickle-200g',
    details: {
      ingredients: [
        {
          name: 'Raw Green Mango',
          share: '50%',
          detail: 'Firm green mango wedges with cut kernels that retain authentic bite and crunch.',
          sprite: 'mango'
        },
        {
          name: 'Mustard Oil',
          detail: 'Cold-pressed pungent mustard oil providing signature North Indian sharpness.',
          sprite: 'mustard'
        },
        {
          name: 'Fennel Seeds (Saunf)',
          detail: 'Whole aromatic aniseed for sweet digestive top notes.',
          sprite: 'mustard'
        },
        {
          name: 'Kalonji (Nigella)',
          detail: 'Pungent black seeds toasted to impart characteristic nutty warmth.',
          sprite: 'chilli-flake'
        }
      ],
      highlights: [
        'Classic grand trunk road dhaba flavour profile',
        'Generous 50% fruit ratio in rich mustard oil',
        'Time-tested generational pickling tradition'
      ],
      specs: [
        { label: 'Taste Profile', value: 'Pungent Mustard · Tangy Crunch · Herbal' },
        { label: 'Best With', value: 'Aloo Paratha, Chole Bhature, Dal Chawal' },
        storage
      ],
      heat: 4,
      scatter: { mango: 8, mustard: 6, 'chilli-flake': 10, 'red-chilli': 3 }
    }
  }
];

export const GALLERY_EDITORIAL_SLIDES = [
  {
    src: '/assets/editorial/serving/serving-meal-rice-thali.jpg',
    alt: 'Steamed rice with melted ghee and authentic Andhra Avakaya pickle',
    product: false
  },
  {
    src: '/assets/products/cutouts/andhra-tomato-pickle-200-gm.png',
    alt: 'Mother’s Recipe Andhra Tomato Pickle Jar',
    product: true
  },
  {
    src: '/assets/editorial/story/ingredient-tabletop-2.jpg',
    alt: 'Raw orchard mango slices, whole mustard seeds, and sun-dried chillies',
    product: false
  },
  {
    src: '/assets/products/cutouts/stuffed-red-chilli-pickle-200-gm.png',
    alt: 'Mother’s Recipe Stuffed Red Chilli Pickle Jar',
    product: true
  },
  {
    src: '/assets/editorial/serving/closing-table-scene.jpg',
    alt: 'Traditional Indian family feast with Mother’s Recipe pickles',
    product: false
  }
];
