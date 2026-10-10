export interface ProductImage {
  role: string;
  localPath: string;
  sourceUrl: string;
  isHeroCandidate: boolean;
}

export interface Product {
  id: number;
  slug: string;
  title: string;
  handle: string;
  officialUrl: string;
  category: string;
  region: string;
  price: string;
  weight: string;
  description: string;
  images: ProductImage[];
  // Extended UI attributes
  cutoutPath?: string;
  spiceLevel?: 1 | 2 | 3 | 4 | 5;
  spiceLabel?: 'Mild & Sweet' | 'Piquant' | 'Robust' | 'Fiery' | 'Extra Hot';
  flavourNotes?: string[];
  tradition?: string;
}

export interface MealBase {
  id: string;
  name: string;
  description: string;
  culinaryContext: string;
  iconName: string;
}

export interface PalateProfile {
  id: string;
  name: string;
  subtitle: string;
  intensity: 'Mild' | 'Medium' | 'Bold' | 'Intense';
  character: string;
}

export interface BitePairing {
  mealId: string;
  palateId: string;
  productSlug: string;
  pickleTitle: string;
  servingImage: string;
  dishName: string;
  culinaryRationale: string;
  tastingNotes: string[];
}
