export type TProductFor = 'men' | 'women' | 'kids';
export const ProductFor = ['men', 'women', 'kids'];

export type TSeason = 'summer' | 'winter' | 'all-season';
export const Season = ['summer', 'winter', 'all-season'];

export type TProductGroup =
  | 'cloth'
  | 'accessories'
  | 'footwear'
  | 'bags'
  | 'fragrance';
export const ProductGroup = [
  'cloth',
  'accessories',
  'footwear',
  'bags',
  'fragrance',
] as const;

export type TProductCategory =
  | 'tops'
  | 'bottoms'
  | 'outerwear'
  | 'wallets'
  | 'belts'
  | 'caps'
  | 'sunglasses'
  | 'backpack'
  | 'handbag'
  | 'crossbody bag'
  | 'sneakers'
  | 'boots'
  | 'sandals'
  | 'slippers'
  | 'perfume';

export const ProductCategory = [
  'tops',
  'bottoms',
  'outerwear',
  'wallets',
  'belts',
  'caps',
  'sunglasses',
  'backpack',
  'handbag',
  'crossbody bag',
  'sneakers',
  'boots',
  'sandals',
  'slippers',
  'perfume',
] as const;

export type TProductSubCategory =
  | 'graphic t-shirts'
  | 'plain t-shirts'
  | 'oversized t-shirts'
  | 'polo t-shirts'
  | 'casual shirts'
  | 'formal shirts'
  | 'crop top'
  | 'jeans'
  | 'trousers'
  | 'chinos'
  | 'cargo pants'
  | 'joggers'
  | 'sweatpants'
  | 'hoodie'
  | 'jacket'
  | 'coat'
  | 'leather wallet'
  | 'card holder'
  | 'formal belt'
  | 'casual belt'
  | 'baseball cap'
  | 'beanie'
  | 'classic sunglasses'
  | 'aviator sunglasses'
  | 'casual backpack'
  | 'travel backpack'
  | 'shoulder handbag'
  | 'tote bag'
  | 'mini crossbody'
  | 'casual crossbody'
  | 'running sneakers'
  | 'casual sneakers'
  | 'ankle boots'
  | 'chelsea boots'
  | 'flat sandals'
  | 'slide sandals'
  | 'sport sandals'
  | 'indoor slippers'
  | 'slide slippers'
  | 'eau de parfum'
  | 'eau de toilette'
  | 'body mists'
  | 'roll-ons';

export const ProductSubCategory = [
  'graphic t-shirts',
  'plain t-shirts',
  'oversized t-shirts',
  'polo t-shirts',
  'casual shirts',
  'formal shirts',
  'crop top',

  'jeans',
  'trousers',
  'chinos',
  'cargo pants',
  'joggers',
  'sweatpants',

  'hoodie',
  'jacket',
  'coat',

  'leather wallet',
  'card holder',

  'formal belt',
  'casual belt',

  'baseball cap',
  'beanie',

  'classic sunglasses',
  'aviator sunglasses',

  'casual backpack',
  'travel backpack',

  'shoulder handbag',
  'tote bag',

  'mini crossbody',
  'casual crossbody',

  'running sneakers',
  'casual sneakers',

  'ankle boots',
  'chelsea boots',

  'flat sandals',
  'slide sandals',
  'sport sandals',

  'indoor slippers',
  'slide slippers',

  'eau de parfum',
  'eau de toilette',
  'body mists',
  'roll-ons',
] as const;
