/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Category } from './types';

export const PRODUCTS: Product[] = [
  // Momos
  {
    id: 'veg-momo-large',
    name: 'Veg Momo',
    description: 'Cabbage, Carrot, Ginger, Cauliflower, Garlic, Spices',
    category: 'Momos',
    price: 155,
    unit: 'kg',
    weight: '28-30 gm',
    piecesPerKg: '33-34 pieces',
    image: 'https://images.pexels.com/photos/7363685/pexels-photo-7363685.jpeg'
  },
  {
    id: 'veg-momo-small',
    name: 'Veg Momo (Small)',
    description: 'Cabbage, Carrot, Ginger, Cauliflower, Garlic, Spices',
    category: 'Momos',
    price: 170,
    unit: 'kg',
    weight: '20-22 gm',
    piecesPerKg: '45-46 pieces',
    image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'butter-chicken-momo',
    name: 'Butter Chicken Momo',
    description: 'Chicken, Onion, Coriander, Green Chilli, Ginger, Garlic, Butter, Spices',
    category: 'Momos',
    price: 245,
    unit: 'kg',
    weight: '28-30 gm',
    piecesPerKg: '33-34 pieces',
    image: 'https://images.pexels.com/photos/28445589/pexels-photo-28445589.jpeg'
  },
  {
    id: 'corn-cheese-momo',
    name: 'Corn & Cheese Momo',
    description: 'Coriander, Green Chilli, Corn, Cheese, Onion, Spices',
    category: 'Momos',
    price: 265,
    unit: 'kg',
    weight: '28-30 gm',
    piecesPerKg: '33-34 pieces',
    image: 'https://images.pexels.com/photos/28445589/pexels-photo-28445589.jpeg'
  },
  {
    id: 'chicken-momo-large',
    name: 'Chicken Momo',
    description: 'Chicken, Onion, Coriander, Green Chilli, Ginger, Garlic, Spices',
    category: 'Momos',
    price: 200,
    unit: 'kg',
    weight: '28-30 gm',
    piecesPerKg: '33-34 pieces',
    image: 'https://images.unsplash.com/photo-1626776878844-3dedb2670e0f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'paneer-momo-large',
    name: 'Paneer Momo',
    description: 'Paneer, Onion, Coriander, Green Chilli, Ginger, Garlic, Spices',
    category: 'Momos',
    price: 190,
    unit: 'kg',
    weight: '28-30 gm',
    piecesPerKg: '33-34 pieces',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800&auto=format&fit=crop'
  },
  // Parathas
  {
    id: 'malabari-paratha',
    name: 'Malabari Paratha',
    description: 'Fresh Handmade Layers',
    category: 'Parathas',
    price: 23.20,
    unit: 'pcs',
    weight: '80 gm',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'lachha-paratha',
    name: 'Lachha Paratha',
    description: 'Multi-layered flaky paratha',
    category: 'Parathas',
    price: 16.00,
    unit: 'pcs',
    weight: '80 gm',
    image: 'https://images.unsplash.com/photo-1605666804791-42cb4bd47b97?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'allo-pratha',
    name: 'Allo Pratha',
    category: 'Parathas',
    price: 17.40,
    unit: 'pcs',
    image: 'https://images.unsplash.com/photo-1589135398302-388cd35113d0?q=80&w=800&auto=format&fit=crop'
  },
  // Spring Rolls
  {
    id: 'veg-spring-roll-large',
    name: 'Veg Spring Roll',
    category: 'Spring Rolls',
    price: 18,
    unit: 'piece',
    weight: '90-100 gm',
    image: 'https://images.unsplash.com/photo-1544333346-601712171d71?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'chicken-spring-roll-large',
    name: 'Chicken Spring Roll',
    category: 'Spring Rolls',
    price: 23,
    unit: 'piece',
    weight: '90-100 gm',
    image: 'https://images.unsplash.com/photo-1544333346-601712171d71?q=80&w=800&auto=format&fit=crop'
  },
  // Samosas
  {
    id: 'classic-punjabi-samosa',
    name: 'Classic Punjabi Samosa',
    description: 'Green Pea & Potato',
    category: 'Samosas & Snacks',
    price: 218,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1601050633647-81a35d377a66?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'veg-shami-kabab',
    name: 'Veg Shami Kabab',
    category: 'Samosas & Snacks',
    price: 239,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1589647363585-f4a7d3eb2207?q=80&w=800&auto=format&fit=crop'
  },
  // Kurkure Momos
  {
    id: 'chicken-kurkure-momo',
    name: 'Chicken Kurkure Momo',
    category: 'Momos',
    price: 7.50,
    unit: 'piece',
    isKurkure: true,
    image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'veg-kurkure-momo',
    name: 'Veg Kurkure Momo',
    category: 'Momos',
    price: 6.50,
    unit: 'piece',
    isKurkure: true,
    image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=800&auto=format&fit=crop'
  }
];

export const CATEGORIES: Category[] = [
  'Momos',
  'Parathas',
  'Samosas & Snacks',
  'Spring Rolls',
  'Chatani',
  'Manchurian'
];

