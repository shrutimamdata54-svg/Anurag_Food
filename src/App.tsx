/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu,
  ChevronRight, 
  Info,
  Package,
  Trash2,
  ArrowRight,
  X,
  ShieldCheck,
  Truck,
  Loader2,
  CheckCircle,
  FileText,
  Clock,
  MapPin,
  UtensilsCrossed,
  User,
  ShoppingCart,
  ShoppingBasket,
  ChevronDown,
  Plus,
  Minus
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from './data';
import { Product, CartItem, Category, Order, OrderStatus } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'orders' | 'inventory' | 'profile' | 'home'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [isReviewingOrder, setIsReviewingOrder] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedIngredients, setExpandedIngredients] = useState<string | null>(null);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 50 } : item);
      }
      return [...prev, { ...product, quantity: 50 }]; // Matching pack size in screenshot (50 pcs)
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing && existing.quantity > 50) {
        return prev.map(item => item.id === productId ? { ...item, quantity: item.quantity - 50 } : item);
      }
      return prev.filter(item => item.id !== productId);
    });
  };

  const totalPieces = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * (item.quantity / 50)), 0), [cart]); 
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + tax;

  const createNewOrder = () => {
    const newOrder: Order = {
      id: `AF-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'Processing',
      createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: [...cart],
      totalPieces,
      totalAmount: grandTotal
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setIsReviewingOrder(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-primary font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
        <button className="text-brand-primary"><Menu size={24} /></button>
        <h1 className="text-xl font-extrabold text-brand-primary tracking-tight">Anurag Foods</h1>
        <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" alt="Profile" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-32">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col"
            >
              {/* Hero Section */}
              <div className="relative h-[60vh] w-full overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1534422298391-e4f8c170db76?q=80&w=1200&auto=format&fit=crop" 
                    className="absolute inset-0 w-full h-full object-cover brightness-75 scale-110"
                />
                <div className="absolute inset-0 flex flex-col justify-center px-8 text-white">
                    <span className="bg-brand-secondary text-[10px] font-black w-fit px-3 py-1 rounded-sm mb-4">B2B PREMIUM CURATOR</span>
                    <h2 className="text-5xl font-black leading-[1.05] mb-6">
                        Premium <br /> Frozen Foods <br /> for <span className="text-brand-accent italic">Every</span> <br /> Kitchen
                    </h2>
                    <p className="text-sm opacity-90 mb-8 max-w-[280px]">
                        Freshly prepared • Hygienically packed • Bulk supply. Elevating wholesale gastronomy with artisanal precision.
                    </p>
                    <div className="flex gap-3">
                        <button onClick={() => setActiveTab('catalog')} className="bg-brand-accent text-white px-8 py-3 rounded-xl font-extrabold text-sm">View Products</button>
                        <button onClick={() => setActiveTab('catalog')} className="bg-white text-slate-900 border border-white px-8 py-3 rounded-xl font-extrabold text-sm">Order Now</button>
                    </div>
                </div>
              </div>

              {/* Culinary Standard UI Section */}
              <div className="bg-[#f0f0f0] px-8 py-16">
                 <div className="relative aspect-[4/3] rounded-3xl-overflow-hidden mb-12">
                   <img src="https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover rounded-3xl" />
                   <div className="absolute -bottom-6 -right-4 bg-brand-secondary p-6 rounded-3xl shadow-xl w-40">
                      <div className="text-4xl font-black text-brand-primary">100%</div>
                      <div className="text-[10px] font-black uppercase tracking-widest leading-none">Handmade Quality</div>
                   </div>
                 </div>

                 <h3 className="text-3xl font-black text-brand-primary mb-4 leading-tight">
                    The Culinary <br /> <span className="text-brand-accent italic">Standard</span>
                 </h3>
                 <p className="text-slate-500 text-sm mb-10 leading-relaxed">
                    We redefine frozen food as a preserved art form. Using only RO water and zero preservatives, our 60% pre-cooked range ensures your kitchen maintains efficiency without sacrificing the "made from scratch" soul.
                 </p>

                 <div className="grid grid-cols-2 gap-y-6">
                    {[
                        { label: 'FSSAI Certified', icon: <CheckCircle size={16} className="text-brand-accent" /> },
                        { label: 'Halal Standards', icon: <UtensilsCrossed size={16} className="text-brand-secondary" /> },
                        { label: 'RO Water Pure', icon: <ShieldCheck size={16} className="text-brand-accent" /> },
                        { label: 'No Preservatives', icon: <Clock size={16} className="text-brand-secondary" /> },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            {item.icon}
                            <span className="text-xs font-black text-brand-primary">{item.label}</span>
                        </div>
                    ))}
                 </div>
              </div>

              {/* Curated Selections Section */}
              <div className="px-8 py-16">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent mb-2">The Harvest Collection</div>
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-4xl font-black text-brand-primary">Curated Selections</h3>
                    <div className="flex gap-3">
                        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400"><X size={16} className="rotate-45" /></button>
                        <button className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center text-white"><ArrowRight size={16} /></button>
                    </div>
                </div>

                <div className="space-y-12">
                    {PRODUCTS.map(product => (
                        <div key={product.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img src={product.image} className="w-full h-full object-cover" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[8px] font-black tracking-widest uppercase">60% Pre-Cooked</div>
                                {product.id === 'malabari-paratha' && (
                                    <div className="absolute top-4 left-4 bg-brand-primary text-white px-3 py-1 rounded-full text-[8px] font-black tracking-widest uppercase">BESTSELLER</div>
                                )}
                            </div>
                            <div className="p-8">
                                <h4 className="text-2xl font-black text-brand-primary mb-1">{product.name}</h4>
                                <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mb-4">Pack Size: 5kg | 50 Pcs</div>
                                <div className="text-2xl font-black text-brand-accent mb-6">₹{product.price} <span className="text-sm text-slate-400 font-medium">/ per kg</span></div>
                                
                                <button 
                                    onClick={() => setExpandedIngredients(expandedIngredients === product.id ? null : product.id)}
                                    className="w-full border-t border-b border-gray-100 py-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400"
                                >
                                    Ingredients <ChevronDown size={14} className={`transition-transform duration-300 ${expandedIngredients === product.id ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {expandedIngredients === product.id && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="py-4 text-xs text-slate-500 leading-relaxed">
                                                {product.description}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button 
                                    onClick={() => addToCart(product)}
                                    className="w-full mt-8 bg-slate-900 text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-sm tracking-widest active:scale-95 transition-all"
                                >
                                    <ShoppingBasket size={20} /> Add to Order
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'catalog' && (
            <motion.div
                key="catalog"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-8 pt-8"
            >
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-3xl font-black">All Collections</h3>
                    <div className="text-xs font-black bg-brand-light-green text-brand-primary px-3 py-1 rounded-full uppercase">Live Catalogue</div>
                </div>

                <div className="space-y-8">
                    {CATEGORIES.map(cat => (
                        <div key={cat} className="space-y-6">
                            <h4 className="text-xl font-bold border-l-4 border-brand-accent pl-4">{cat}</h4>
                            <div className="grid grid-cols-1 gap-6">
                                {PRODUCTS.filter(p => p.category === cat).map(product => (
                                    <div key={product.id} className="bg-white border border-gray-100 p-4 rounded-3xl flex gap-4 shadow-sm" onClick={() => setViewingProduct(product)}>
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                                            <img src={product.image} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h5 className="font-bold text-lg">{product.name}</h5>
                                            <div className="text-xs text-slate-400 mb-2">{product.piecesPerKg || product.weight} / per unit</div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-black text-brand-accent">₹{product.price}/kg</span>
                                                <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="bg-slate-900 text-white p-2 rounded-xl">
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
                key="orders"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-5 pt-8"
            >
                {/* Placed Orders / Tracking */}
                {orders.length > 0 && (
                    <div className="mb-12 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black">Placed Orders</h3>
                            <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-full font-bold">{orders.length} TOTAL</span>
                        </div>
                        {orders.map(order => (
                             <div key={order.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</div>
                                        <div className="font-extrabold text-brand-primary">#{order.id}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</div>
                                        <div className="font-bold text-xs">{order.createdAt}</div>
                                    </div>
                                </div>
                                
                                {/* Tracking Stepper */}
                                <div className="relative mb-6 px-2">
                                    <div className="absolute top-4 left-4 right-4 h-px bg-gray-100"></div>
                                    <div className="relative flex justify-between">
                                        {[
                                            { label: 'Procured', icon: <Package size={12} />, status: 'Processing' },
                                            { label: 'En-route', icon: <Truck size={12} />, status: 'Shipped' },
                                            { label: 'Completed', icon: <CheckCircle size={12} />, status: 'Delivered' },
                                        ].map((step, idx) => {
                                            const statuses: OrderStatus[] = ['Processing', 'Shipped', 'Delivered'];
                                            const currentIdx = statuses.indexOf(order.status);
                                            const isDone = idx <= currentIdx;
                                            return (
                                                <div key={idx} className="flex flex-col items-center gap-2 relative z-10">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
                                                        isDone ? 'bg-brand-primary border-brand-primary text-white' : 'bg-white border-gray-100 text-gray-300'
                                                    }`}>
                                                        {step.icon}
                                                    </div>
                                                    <span className={`text-[8px] font-black uppercase tracking-tight ${isDone ? 'text-brand-primary' : 'text-gray-300'}`}>
                                                        {step.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                             </div>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-brand-primary">Active Procurement</h2>
                    <span className="text-[10px] font-black bg-brand-light-green text-brand-primary px-3 py-1 rounded-full uppercase tracking-widest">Current Batch</span>
                </div>

                {cart.length === 0 ? (
                    <div className="py-24 flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-gray-200">
                        <ShoppingBasket size={48} className="text-gray-200 mb-4" />
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No active procurement</p>
                        <button onClick={() => setActiveTab('catalog')} className="mt-4 text-brand-secondary font-black border-b-2 border-brand-secondary">Start Order</button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Cart Items List */}
                        <div className="flex flex-col gap-4">
                            <AnimatePresence initial={false}>
                                {cart.map(item => (
                                    <motion.div 
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        layout
                                        className="bg-white p-6 rounded-3xl border border-gray-100 flex gap-5 shadow-sm"
                                    >
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                                            <img src={item.image} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-black text-lg text-brand-primary leading-tight">{item.name}</h4>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.weight || item.piecesPerKg} per unit</div>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <div className="text-[10px] uppercase font-black opacity-30 tracking-widest mb-1">Quantity</div>
                                                    <div className="text-base font-black flex items-center gap-4">
                                                        <button onClick={() => removeFromCart(item.id)} className="text-brand-accent"><Minus size={14} /></button>
                                                        {item.quantity / 5}kg
                                                        <button onClick={() => addToCart(item)} className="text-brand-primary"><Plus size={14} /></button>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[10px] uppercase font-black opacity-30 tracking-widest mb-1">Rate</div>
                                                    <div className="text-lg font-black text-brand-secondary">₹{item.price}/kg</div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Logistics & Compliance Card */}
                        <div className="bg-brand-primary rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                           <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <Truck size={24} className="text-brand-secondary" />
                                    <h4 className="text-xl font-bold">Logistics & Compliance</h4>
                                </div>
                                <p className="text-sm opacity-80 mb-8 leading-relaxed">
                                    Minimum Order Quantity (MOQ) for optimized fulfillment is <span className="text-brand-secondary font-black">900 pieces</span> across all categories.
                                </p>
                                
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary mb-2">Carrier Policy</div>
                                <p className="text-sm font-bold">Customer-paid delivery via Uber/Porter network.</p>
                           </div>
                           <div className="absolute right-[-20%] bottom-[-20%] w-64 h-64 bg-white opacity-5 rounded-full"></div>
                        </div>

                        {/* Delivery Hub */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100">
                             <div className="flex justify-between items-center mb-6">
                                <h4 className="font-bold">Delivery Hub</h4>
                                <button className="text-[10px] font-black uppercase text-brand-secondary tracking-widest">Change</button>
                             </div>
                             <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 text-brand-primary">
                                    <MapPin size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="font-black text-brand-primary mb-1">Bengaluru Corporate Kitchen</div>
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                        4th Floor, Tech Park Alpha, Indiranagar, Bengaluru - 560038
                                    </p>
                                </div>
                             </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-[2.5rem] p-10 space-y-6 shadow-sm border border-gray-50">
                            <h4 className="text-2xl font-black text-brand-primary mb-2">Order Summary</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-slate-400">Subtotal (Items)</span>
                                    <span className="font-black">₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-slate-400">Logistics Estimate</span>
                                    <span className="text-brand-secondary font-black uppercase tracking-widest text-[10px]">Carrier Paid</span>
                                </div>
                                <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                                    <span className="text-sm font-medium text-slate-400">Tax Compliance (GST)</span>
                                    <span className="font-black">₹{tax.toLocaleString()}</span>
                                </div>
                                
                                <div className="pt-4 flex justify-between items-end">
                                    <div>
                                        <div className="text-[9px] uppercase font-black text-slate-300 tracking-[0.2em] mb-1">Estimated INR</div>
                                        <h4 className="text-2xl font-black text-brand-primary">Grand Total</h4>
                                    </div>
                                    <div className="text-4xl font-black text-brand-primary">₹{grandTotal.toLocaleString()}</div>
                                </div>
                            </div>

                            <button onClick={() => setIsReviewingOrder(true)} className="w-full bg-brand-secondary text-brand-primary py-7 rounded-[2rem] font-black text-lg tracking-widest shadow-xl shadow-brand-secondary/20 hover:scale-[1.02] active:scale-95 transition-all mt-6">
                                Confirm Procurement <br /> Request
                            </button>
                            
                            <div className="text-center">
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-30">Subject to availability • Price locked for 2hrs</span>
                            </div>
                        </div>

                        {/* Fleet Partners */}
                        <div className="bg-white p-8 rounded-3xl flex items-center gap-6 shadow-sm border border-gray-50">
                            <div className="flex gap-1 shrink-0">
                                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center p-1.5 grayscale shrink-0">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" className="w-full brightness-0 invert" alt="Uber" />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-[#154e5e] flex items-center justify-center p-1.5 shrink-0">
                                    <img src="https://logowik.com/content/uploads/images/porter5144.jpg" className="w-full" alt="Porter" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="font-black text-[10px] uppercase tracking-widest mb-1">Fleet Partners</div>
                                <p className="text-[9px] text-slate-400 font-bold leading-tight">Live tracking available once carrier accepts pickup.</p>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
          )}

          {activeTab === 'inventory' && (
            <motion.div
                key="inventory"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-8 pt-12"
            >
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-3xl font-black">Stock Registry</h3>
                    <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center">
                        <Package size={24} />
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm mb-12">
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total SKU</div>
                            <div className="text-3xl font-black">15</div>
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Alerts</div>
                            <div className="text-3xl font-black text-brand-accent">02</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {PRODUCTS.slice(0, 5).map(product => (
                        <div key={product.id} className="bg-white p-5 rounded-3xl border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                                    <img src={product.image} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">{product.name}</h4>
                                    <p className="text-[10px] text-slate-400 font-extrabold uppercase">High Demand</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-black">84%</div>
                                <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden mt-1">
                                    <div className="h-full bg-brand-primary w-[84%]"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
                key="profile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-8 pt-12 text-center"
            >
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl mx-auto mb-8 overflow-hidden grayscale">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-3xl font-black mb-2">Corporate Profile</h3>
                <p className="text-slate-400 font-bold tracking-widest uppercase text-[10px] mb-12">Bengaluru Hub / Bengaluru Corporate Kitchen</p>
                
                <div className="space-y-4">
                    {['Manage Subscriptions', 'Billing Registry', 'Order History', 'Sustainability Report'].map((item, i) => (
                        <button key={i} className="w-full bg-white border border-gray-100 p-6 rounded-3xl flex justify-between items-center shadow-sm">
                            <span className="font-bold">{item}</span>
                            <ChevronRight size={18} className="text-slate-300" />
                        </button>
                    ))}
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation matches exactly */}
      <nav className="fixed bottom-0 inset-x-0 bg-white px-8 py-5 safe-bottom flex justify-between items-center z-50 border-t border-gray-100">
        {[
          { id: 'catalog', icon: <UtensilsCrossed size={18} />, label: 'Catalog' },
          { id: 'orders', icon: <Truck size={18} />, label: 'Orders', badge: cart.length > 0 ? cart.length : null },
          { id: 'inventory', icon: <Package size={18} />, label: 'Inventory' },
          { id: 'profile', icon: <User size={18} />, label: 'Profile' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`flex flex-col items-center gap-1.5 transition-all ${
              activeTab === item.id ? 'text-brand-primary' : 'text-slate-300'
            }`}
          >
            <div className={`w-12 h-10 rounded-full flex items-center justify-center relative transition-all ${
                activeTab === item.id ? 'bg-brand-light-green' : 'bg-transparent'
            }`}>
                {item.icon}
                {item.id === 'orders' && item.badge && (
                    <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[8px] font-black min-w-[14px] h-[14px] px-1 rounded-full flex items-center justify-center">
                        {item.badge}
                    </span>
                )}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">
                {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Order Confirmation Modal */}
      <AnimatePresence>
        {isReviewingOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setIsReviewingOrder(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-xl bg-white rounded-t-[3rem] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-10 pb-16">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-black">Order Review</h3>
                  <button onClick={() => setIsReviewingOrder(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900"><X size={20}/></button>
                </div>

                <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 no-scrollbar">
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-50">
                            <div>
                                <div className="font-bold">{item.name}</div>
                                <div className="text-[10px] font-black text-slate-400 uppercase">{item.quantity} pieces</div>
                            </div>
                            <div className="font-black">₹{(item.price * (item.quantity / 50)).toLocaleString()}</div>
                        </div>
                    ))}
                </div>

                <div className="bg-brand-bg rounded-3xl p-6 space-y-3 mb-8">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400 font-medium">Article Subtotal</span>
                        <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400 font-medium">Compliance Tax</span>
                        <span className="font-bold">₹{tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-end pt-4 border-t border-gray-100">
                        <span className="font-black text-lg">Total Value</span>
                        <span className="text-3xl font-black text-brand-primary">₹{grandTotal.toLocaleString()}</span>
                    </div>
                </div>

                <button 
                  onClick={createNewOrder}
                  className="w-full bg-brand-primary text-white py-6 rounded-3xl font-black text-lg tracking-widest shadow-2xl active:scale-95 transition-all"
                >
                  Confirm Request
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Detail SaaS Inspired */}
      <AnimatePresence>
        {viewingProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 shadow-2xl backdrop-blur-sm"
              onClick={() => setViewingProduct(null)}
            >
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="w-full max-w-xl bg-white rounded-t-[3rem] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="h-64 relative">
                        <img src={viewingProduct.image} className="w-full h-full object-cover" />
                        <button onClick={() => setViewingProduct(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white"><X size={20}/></button>
                    </div>
                    <div className="p-10 pb-16">
                        <h3 className="text-4xl font-black text-brand-primary mb-2">{viewingProduct.name}</h3>
                        <p className="text-slate-500 mb-8 leading-relaxed">
                            {viewingProduct.description}
                        </p>
                        <div className="flex items-center gap-12 mb-12">
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Standard Rate</div>
                                <div className="text-3xl font-black text-brand-accent">₹{viewingProduct.price}<span className="text-sm font-medium">/kg</span></div>
                            </div>
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Estimated Pack</div>
                                <div className="text-3xl font-black text-brand-primary">5kg</div>
                            </div>
                        </div>
                        <button onClick={() => { addToCart(viewingProduct); setViewingProduct(null); }} className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-lg tracking-widest shadow-2xl active:scale-95 transition-all">Add to Batch</button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

