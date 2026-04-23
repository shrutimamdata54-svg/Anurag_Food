/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description?: string;
  category: 'Momos' | 'Parathas' | 'Samosas & Snacks' | 'Spring Rolls' | 'Chatani' | 'Manchurian';
  price: number;
  unit: string; // e.g., "kg", "pcs", "piece"
  weight?: string; // e.g., "28-30 gm"
  image: string;
  piecesPerKg?: string;
  ingredients?: string[];
  isKurkure?: boolean;
}

export type Category = Product['category'];

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered';

export interface Order {
  id: string;
  status: OrderStatus;
  createdAt: string;
  items: CartItem[];
  totalPieces: number;
  totalAmount: number;
}
