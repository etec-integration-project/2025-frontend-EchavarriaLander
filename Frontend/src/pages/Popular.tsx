import React from 'react';
import { Play, Plus, Info } from 'lucide-react';
import Header from '../components/Header';

const Popular = () => {
  const popularContent = [
    { 
      rank: 1,
      title: "Stranger Things 4",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500"
    },
    // Add more items...
  ];

  return (
    <div className="pt-20 bg-black min-h-screen">
      <Header showNav />
      <div className="px-4 md:px-16">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Lo más popular en Netflix</h1>
        
        <div className="space-y-8">
          {popularContent.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-4 bg-gray-900 rounded-lg overflow-hidden">
              <div className="relative w-full md:w-[300px] aspect-video md:aspect-[16/9]">
                <div className="absolute text-[200px] font-bold text-gray-800/50 -left-6">
                  {item.rank}
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4 flex-1">
                <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                <p className="text-gray-400 mb-4">{item.description}</p>
                
                <div className="flex space-x-4">
                  <button className="flex items-center bg-white text-black px-6 py-2 rounded font-semibold hover:bg-white/90">
                    <Play className="w-5 h-5 mr-2" />
                    Reproducir
                  </button>
                  <button className="flex items-center bg-gray-500/70 px-6 py-2 rounded font-semibold hover:bg-gray-500/50">
                    <Plus className="w-5 h-5 mr-2" />
                    Mi Lista
                  </button>
                  <button className="flex items-center bg-gray-500/70 px-6 py-2 rounded font-semibold hover:bg-gray-500/50">
                    <Info className="w-5 h-5 mr-2" />
                    Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popular;