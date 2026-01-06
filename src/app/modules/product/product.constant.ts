export type TProductLayout = 'vertical' | 'horizontal' | 'fixed';
export const ProductLayout = ['vertical', 'horizontal', 'fixed'];

export type TProductFor = 'men' | 'women' | 'kids' | 'unisex';
export const ProductFor = ['men', 'women', 'kids', 'unisex'] as const;

export type TSeason = 'summer' | 'winter' | 'essentials';
export const Season = ['summer', 'winter', 'essentials'] as const;

export type TProductGroup =
  | 'clothing'
  | 'footwear'
  | 'accessories'
  | 'bags'
  | 'fragrance';

export const ProductGroup = [
  'clothing',
  'footwear',
  'accessories',
  'bags',
  'fragrance',
] as const;

export type TProductCategory =
  // --- Group: Clothing ---
  | 'tops'
  | 'bottoms'
  | 'outerwear'
  | 'dresses-jumpsuits'
  | 'activewear'
  | 'innerwear'

  // --- Group: Footwear ---
  | 'shoes'

  // --- Group: Accessories ---
  | 'fashion-accessories'

  // --- Group: Bags ---
  | 'luggage-bags'

  // --- Group: Fragrance ---
  | 'scents-grooming';

export const ProductCategory = [
  'tops',
  'bottoms',
  'outerwear',
  'dresses-jumpsuits',
  'activewear',
  'innerwear', 
  'shoes', 
  'fashion-accessories', 
  'luggage-bags', 
  'scents-grooming', 
] as const;

export type TProductSubCategory =
  // --- Under Category: Tops ---
  | 't-shirts'
  | 'shirts'
  | 'polos'
  | 'tank-tops'
  | 'tunics'

  // --- Under Category: Bottoms ---
  | 'jeans'
  | 'trousers' // Includes Chinos, Formal Pants
  | 'shorts'
  | 'skirts'
  | 'leggings'

  // --- Under Category: Outerwear ---
  | 'jackets'
  | 'coats'
  | 'hoodies-sweatshirts'
  | 'blazers-vests'

  // --- Under Category: Knitwear (Often merged with Outerwear or Tops) ---
  | 'sweaters-cardigans'

  // --- Under Category: Dresses & Jumpsuits ---
  | 'dresses'
  | 'jumpsuits'

  // --- Under Category: Activewear & Innerwear ---
  | 'activewear-tops'
  | 'activewear-bottoms'
  | 'underwear-socks'

  // --- Under Category: Shoes (Footwear) ---
  | 'sneakers'
  | 'boots'
  | 'formal-shoes'
  | 'sandals'
  | 'heels'

  // --- Under Category: Fashion Accessories ---
  | 'headwear'
  | 'eyewear'
  | 'wallets'
  | 'belts'
  | 'jewelry'
  | 'scarves-gloves'

  // --- Under Category: Luggage Bags ---
  | 'backpacks'
  | 'handbags'
  | 'crossbody-bags'
  | 'travel-bags'

  // --- Under Category: Scents Grooming ---
  | 'perfume'
  | 'body-care';

export const ProductSubCategory = [
  // Tops
  't-shirts',
  'shirts',
  'polos',
  'tank-tops',
  'tunics',
  // Bottoms
  'jeans',
  'trousers',
  'shorts',
  'skirts',
  'leggings',
  // Outerwear/Knitwear
  'jackets',
  'coats',
  'hoodies-sweatshirts',
  'blazers-vests',
  'sweaters-cardigans',
  // Dresses
  'dresses',
  'jumpsuits',
  // Active/Inner
  'activewear-tops',
  'activewear-bottoms',
  'underwear-socks',
  // Footwear
  'sneakers',
  'boots',
  'formal-shoes',
  'sandals',
  'heels',
  // Accessories
  'headwear',
  'eyewear',
  'wallets',
  'belts',
  'jewelry',
  'scarves-gloves',
  // Bags
  'backpacks',
  'handbags',
  'crossbody-bags',
  'travel-bags',
  // Fragrance
  'perfume',
  'body-care',
] as const;

export type TProductStyle =
  // --- Under Sub-Category: T-Shirts ---
  | 'graphic'
  | 'solid-plain'
  | 'oversized'
  | 'v-neck'
  | 'crew-neck'
  | 'long-sleeve'

  // --- Under Sub-Category: Shirts ---
  | 'flannel'
  | 'oxford'
  | 'denim-shirt'
  | 'linen'
  | 'formal-solid'
  | 'casual-checked'

  // --- Under Sub-Category: Polos ---
  | 'classic-fit'
  | 'slim-fit'
  | 'striped-polo'

  // --- Under Sub-Category: Jeans ---
  | 'skinny'
  | 'straight-leg'
  | 'wide-leg'
  | 'mom-fit'
  | 'ripped'
  | 'high-waisted'

  // --- Under Sub-Category: Trousers ---
  | 'chinos'
  | 'cargo'
  | 'formal-pleated'
  | 'jogger-fit'

  // --- Under Sub-Category: Shorts ---
  | 'denim-shorts'
  | 'chino-shorts'
  | 'cargo-shorts'
  | 'bermuda'
  | 'swim-shorts'

  // --- Under Sub-Category: Skirts ---
  | 'mini'
  | 'midi'
  | 'maxi'
  | 'pencil'
  | 'pleated'
  | 'a-line-skirt'

  // --- Under Sub-Category: Jackets/Coats ---
  | 'bomber'
  | 'leather-biker'
  | 'denim-jacket'
  | 'puffer'
  | 'trench'
  | 'parka'
  | 'varsity'

  // --- Under Sub-Category: Hoodies/Sweatshirts ---
  | 'pullover'
  | 'zip-up'
  | 'hoodie-graphic'

  // --- Under Sub-Category: Sweaters/Cardigans ---
  | 'turtle-neck'
  | 'cable-knit'
  | 'cardigan-button'

  // --- Under Sub-Category: Dresses ---
  | 'bodycon'
  | 'shirt-dress'
  | 'wrap-dress'
  | 'slip-dress'
  | 'party-gown'
  | 'summer-floral'

  // --- Under Sub-Category: Sneakers ---
  | 'low-top'
  | 'high-top'
  | 'chunky'
  | 'running'
  | 'canvas'
  | 'slip-on'

  // --- Under Sub-Category: Boots ---
  | 'chelsea'
  | 'combat'
  | 'ankle-boot'
  | 'lace-up-boot'

  // --- Under Sub-Category: Formal Shoes ---
  | 'oxford'
  | 'derby'
  | 'loafer'
  | 'monk-strap'
  | 'brogue'

  // --- Under Sub-Category: Heels/Sandals ---
  | 'stilettos'
  | 'block-heels'
  | 'platform'
  | 'slides'
  | 'flip-flops'
  | 'gladiators'

  // --- Under Sub-Category: Headwear ---
  | 'baseball-cap'
  | 'beanie'
  | 'bucket-hat'
  | 'fedora'

  // --- Under Sub-Category: Eyewear ---
  | 'aviator'
  | 'wayfarer'
  | 'round'
  | 'cat-eye'

  // --- Under Sub-Category: Bags (All types) ---
  | 'laptop-backpack'
  | 'travel-backpack'
  | 'tote'
  | 'satchel'
  | 'sling'
  | 'messenger'
  | 'clutch'
  | 'duffle'

  // --- Under Sub-Category: Perfume ---
  | 'eau-de-parfum'
  | 'eau-de-toilette'
  | 'body-mist'
  | 'roll-on';

export const ProductStyle = [
  // Tops Styles
  'graphic',
  'solid-plain',
  'oversized',
  'v-neck',
  'crew-neck',
  'long-sleeve',
  'flannel',
  'oxford',
  'denim-shirt',
  'linen',
  'formal-solid',
  'casual-checked',
  'classic-fit',
  'slim-fit',
  'striped-polo',

  // Bottoms Styles
  'skinny',
  'straight-leg',
  'wide-leg',
  'mom-fit',
  'ripped',
  'high-waisted',
  'chinos',
  'cargo',
  'formal-pleated',
  'jogger-fit',
  'denim-shorts',
  'chino-shorts',
  'cargo-shorts',
  'bermuda',
  'swim-shorts',
  'mini',
  'midi',
  'maxi',
  'pencil',
  'pleated',
  'a-line-skirt',

  // Outerwear Styles
  'bomber',
  'leather-biker',
  'denim-jacket',
  'puffer',
  'trench',
  'parka',
  'varsity',
  'pullover',
  'zip-up',
  'hoodie-graphic',
  'turtle-neck',
  'cable-knit',
  'cardigan-button',

  // Dress Styles
  'bodycon',
  'shirt-dress',
  'wrap-dress',
  'slip-dress',
  'party-gown',
  'summer-floral',

  // Footwear Styles
  'low-top',
  'high-top',
  'chunky',
  'running',
  'canvas',
  'slip-on',
  'chelsea',
  'combat',
  'ankle-boot',
  'lace-up-boot',
  'oxford',
  'derby',
  'loafer',
  'monk-strap',
  'brogue',
  'stilettos',
  'block-heels',
  'platform',
  'slides',
  'flip-flops',
  'gladiators',

  // Accessories Styles
  'baseball-cap',
  'beanie',
  'bucket-hat',
  'fedora',
  'aviator',
  'wayfarer',
  'round',
  'cat-eye',

  // Bag Styles
  'laptop-backpack',
  'travel-backpack',
  'tote',
  'satchel',
  'sling',
  'messenger',
  'clutch',
  'duffle',

  // Fragrance Styles
  'eau-de-parfum',
  'eau-de-toilette',
  'body-mist',
  'roll-on',
] as const;
