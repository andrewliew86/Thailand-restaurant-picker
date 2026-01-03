import React, { useState, useEffect } from 'react'; 
import { 
  MapPin, 
  Navigation, 
  Utensils, 
  Coffee, 
  DollarSign, 
  RotateCw, 
  Filter, 
  ChevronRight,
  Star,
  Info
} from 'lucide-react';

const restaurants = [
  {
    id: 1,
    name: "Ong Tong Khao Soi",
    cuisine: "Northern Thai",
    type: "Thai",
    price: "$$",
    distance: "3 min",
    meters: 250,
    rating: 4.8,
    description: "Michelin-recommended Northern Thai curry noodles. A must-try classic.",
    highlight: "Signature Khao Soi with Chicken",
    lat: 13.780,
    lng: 100.544
  },
  {
    id: 2,
    name: "Thanee Khao Moo Daeng",
    cuisine: "Street Food",
    type: "Thai",
    price: "$",
    distance: "4 min",
    meters: 350,
    rating: 4.6,
    description: "Legendary crispy pork belly and roasted red pork over rice.",
    highlight: "Crispy Pork (Moo Krob)",
    lat: 13.781,
    lng: 100.545
  },
  {
    id: 3,
    name: "Lay Lao",
    cuisine: "Isan / Seafood",
    type: "Thai",
    price: "$$",
    distance: "5 min",
    meters: 450,
    rating: 4.7,
    description: "Upscale Isan street food with fresh seafood from Hua Hin.",
    highlight: "Raw Blue Crab Salad",
    lat: 13.782,
    lng: 100.543
  },
  {
    id: 4,
    name: "Salt",
    cuisine: "Japanese / Italian",
    type: "Western",
    price: "$$$",
    distance: "10 min",
    meters: 800,
    rating: 4.5,
    description: "Trendy glasshouse dining with wood-fired pizza and sushi.",
    highlight: "Truffle Pizza",
    lat: 13.783,
    lng: 100.542
  },
  {
    id: 5,
    name: "Cast Iron Burgerhaus",
    cuisine: "Burgers / Steak",
    type: "Western",
    price: "$$$",
    distance: "2 min",
    meters: 150,
    rating: 4.6,
    description: "Premium dry-aged beef burgers right next to the station.",
    highlight: "Chunky Blue Cheese Burger",
    lat: 13.779,
    lng: 100.544
  },
  {
    id: 6,
    name: "Fats and Angry",
    cuisine: "American Diner",
    type: "Western",
    price: "$$",
    distance: "12 min",
    meters: 950,
    rating: 4.4,
    description: "90s style American diner inside Gump's Ari. Great for photos.",
    highlight: "Smash Burger & Milkshakes",
    lat: 13.785,
    lng: 100.545
  },
  {
    id: 7,
    name: "Joha Korean",
    cuisine: "Korean",
    type: "Asian",
    price: "$$",
    distance: "6 min",
    meters: 500,
    rating: 4.7,
    description: "Modern Korean cuisine with distinct Busan flavors.",
    highlight: "BBQ Pork Set",
    lat: 13.782,
    lng: 100.544
  },
  {
    id: 8,
    name: "Kinlenn Eatery & Play",
    cuisine: "Modern Thai",
    type: "Thai",
    price: "$$",
    distance: "3 min",
    meters: 200,
    rating: 4.5,
    description: "Comfort Thai food in a stylish, relaxing setting.",
    highlight: "Crab Meat Fried Rice",
    lat: 13.780,
    lng: 100.545
  },
  {
    id: 9,
    name: "Nana Coffee Roasters",
    cuisine: "Cafe / Brunch",
    type: "Cafe",
    price: "$$",
    distance: "10 min",
    meters: 850,
    rating: 4.8,
    description: "Lush garden cafe perfect for coffee enthusiasts and light brunch.",
    highlight: "Dirty Coffee",
    lat: 13.784,
    lng: 100.543
  },
  {
    id: 10,
    name: "Kenshin Izakaya",
    cuisine: "Japanese Izakaya",
    type: "Asian",
    price: "$$",
    distance: "3 min",
    meters: 250,
    rating: 4.5,
    description: "Lively atmosphere with cheap beer and yakitori.",
    highlight: "Asahi Draft Beer & Yakitori",
    lat: 13.780,
    lng: 100.543
  },
  {
    id: 11,
    name: "Phed Phed Hey!",
    cuisine: "Spicy Isan",
    type: "Thai",
    price: "$$",
    distance: "5 min",
    meters: 400,
    rating: 4.8,
    description: "Extremely spicy and authentic Isan Som Tum. Not for the faint hearted.",
    highlight: "Strawberry Som Tum (seasonal)",
    lat: 13.781,
    lng: 100.546
  },
  {
    id: 12,
    name: "Dai Lou",
    cuisine: "Chinese Tapas",
    type: "Asian",
    price: "$$$",
    distance: "4 min",
    meters: 350,
    rating: 4.6,
    description: "Modern Chinese tapas in a cool, renovated shophouse.",
    highlight: "Dim Sum Platter",
    lat: 13.781,
    lng: 100.545
  }
];

// Helper to determine walking color
const getWalkColor = (mins) => {
  const minVal = parseInt(mins);
  if (minVal <= 5) return "text-emerald-600 bg-emerald-100";
  if (minVal <= 10) return "text-yellow-600 bg-yellow-100";
  return "text-orange-600 bg-orange-100";
};

const Modal = ({ isOpen, onClose, restaurant }) => {
  if (!isOpen || !restaurant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors"
          >
            ✕
          </button>
          <div className="absolute -bottom-10 left-6">
            <div className="w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center text-3xl border-4 border-white">
              {restaurant.type === 'Thai' ? '🌶️' : 
               restaurant.type === 'Western' ? '🍔' : 
               restaurant.type === 'Asian' ? '🥢' : '☕'}
            </div>
          </div>
        </div>
        
        <div className="pt-12 px-6 pb-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{restaurant.name}</h2>
              <p className="text-slate-500 font-medium">{restaurant.cuisine}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-sm font-bold">
                {restaurant.price}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={i < Math.floor(restaurant.rating) ? "text-yellow-400 fill-yellow-400" : "text-slate-300"} 
              />
            ))}
            <span className="text-slate-400 text-sm ml-1">({restaurant.rating})</span>
          </div>

          <p className="text-slate-600 mb-6 leading-relaxed">
            {restaurant.description}
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-700 bg-slate-50 p-3 rounded-lg">
              <MapPin className="text-blue-500" size={20} />
              <span className="flex-1">Distance from BTS Ari</span>
              <span className={`font-bold px-2 py-0.5 rounded ${getWalkColor(restaurant.distance)}`}>
                {restaurant.distance}
              </span>
            </div>
            <div className="flex items-center gap-3 text-slate-700 bg-slate-50 p-3 rounded-lg">
              <Utensils className="text-orange-500" size={20} />
              <span className="flex-1">Must Try</span>
              <span className="font-medium text-slate-900">{restaurant.highlight}</span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full mt-6 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AriEatsApp() {
  const [activeTab, setActiveTab] = useState('list');
  const [filterType, setFilterType] = useState('All');
  const [isSpinning, setIsSpinning] = useState(false);
  const [randomPick, setRandomPick] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredRestaurants = filterType === 'All' 
    ? restaurants 
    : restaurants.filter(r => r.type === filterType);

  const handleRandomize = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setRandomPick(null);
    
    // Simple animation logic
    let duration = 2000;
    let interval = 100;
    let elapsed = 0;
    
    const spinInterval = setInterval(() => {
      const random = filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)];
      setRandomPick(random);
      elapsed += interval;
      
      if (elapsed >= duration) {
        clearInterval(spinInterval);
        setIsSpinning(false);
        // Ensure final pick is set firmly
        const finalPick = filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)];
        setRandomPick(finalPick);
        setSelectedRestaurant(finalPick);
        setTimeout(() => setShowModal(true), 500);
      }
    }, interval);
  };

  const openDetails = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-slate-200">
      {/* Header */}
      <header className="bg-white px-6 pt-12 pb-6 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Ari Eats 🇹🇭</h1>
            <p className="text-slate-500 text-sm font-medium">Dinner guide for BTS Ari Exit 3 & 4</p>
          </div>
          <div className="bg-blue-100 p-2 rounded-full">
            <Utensils className="text-blue-600" size={24} />
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex p-2 bg-slate-100 m-4 rounded-xl">
        <button 
          onClick={() => setActiveTab('list')}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${activeTab === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Browse List
        </button>
        <button 
          onClick={() => setActiveTab('random')}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${activeTab === 'random' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Pick For Me
        </button>
      </div>

      {/* Content Area */}
      <main className="px-4">
        {/* Filter Scroll - Always visible but active state depends */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-2">
          {['All', 'Thai', 'Western', 'Asian', 'Cafe'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                filterType === type 
                ? 'bg-slate-900 text-white border-slate-900' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {activeTab === 'list' ? (
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
            {filteredRestaurants.map((item) => (
              <div 
                key={item.id}
                onClick={() => openDetails(item)}
                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] transition-transform"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-slate-900">{item.name}</h3>
                      {item.rating >= 4.7 && <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-1.5 py-0.5 rounded">POPULAR</span>}
                    </div>
                    <p className="text-slate-500 text-sm mb-3">{item.cuisine}</p>
                    <div className="flex items-center gap-3 text-xs font-medium">
                      <span className={`px-2 py-1 rounded flex items-center gap-1 ${getWalkColor(item.distance)}`}>
                        <Navigation size={12} /> {item.distance} walk
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600">{item.price}</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-full text-slate-400">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            ))}
            
            {filteredRestaurants.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <Utensils size={48} className="mx-auto mb-3 opacity-20" />
                <p>No restaurants found for this category.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] animate-in fade-in duration-300">
            <div className="relative mb-8">
              <div className={`w-48 h-48 rounded-full border-8 border-slate-100 flex items-center justify-center bg-white shadow-xl transition-all duration-100 ${isSpinning ? 'scale-110 border-blue-100' : ''}`}>
                {randomPick ? (
                  <div className="text-center p-4 animate-in zoom-in duration-200">
                    <div className="text-4xl mb-2">
                      {randomPick.type === 'Thai' ? '🌶️' : 
                       randomPick.type === 'Western' ? '🍔' : 
                       randomPick.type === 'Asian' ? '🥢' : '☕'}
                    </div>
                    <div className="font-bold text-slate-900 leading-tight line-clamp-2">{randomPick.name}</div>
                    <div className="text-xs text-slate-500 mt-1">{randomPick.cuisine}</div>
                  </div>
                ) : (
                  <div className="text-center text-slate-400">
                    <RotateCw size={40} className="mx-auto mb-2 opacity-50" />
                    <span className="text-sm font-medium">Ready?</span>
                  </div>
                )}
              </div>
              
              {/* Decorative dots */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>

            <button
              onClick={handleRandomize}
              disabled={isSpinning}
              className={`w-full max-w-xs py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2
                ${isSpinning 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'}`}
            >
              {isSpinning ? 'Choosing...' : 'Pick Dinner For Me!'}
              {!isSpinning && <RotateCw size={20} />}
            </button>
            
            <p className="mt-6 text-sm text-slate-400 text-center px-8">
              Can't decide? Let fate decide where you eat tonight in Ari.
            </p>
          </div>
        )}
      </main>

      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        restaurant={selectedRestaurant} 
      />
      
      {/* Bottom fade for scroll indication */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none md:hidden"></div>
    </div>
  );
}