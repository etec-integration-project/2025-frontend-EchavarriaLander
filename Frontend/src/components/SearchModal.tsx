import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ onClose }: { onClose: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  const mockResults = [
    { id: 1, title: 'Stranger Things', type: 'TV Show', image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500' },
    { id: 2, title: 'The Crown', type: 'TV Show', image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500' },
  ];

  useEffect(() => {
    if (searchTerm.length > 2) {
      // Simulate API call
      setResults(mockResults.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const handleResultClick = (result: any) => {
    navigate(`/watch/${result.id}`);
    onClose();
  };

  return (
    <div className="absolute top-full left-0 w-full bg-black/95 border-t border-gray-800">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Títulos, personas, géneros"
            className="flex-1 bg-transparent border-none outline-none text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        {results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((result) => (
              <div
                key={result.id}
                className="cursor-pointer group"
                onClick={() => handleResultClick(result)}
              >
                <div className="aspect-video relative overflow-hidden rounded">
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-semibold">{result.title}</span>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-400">{result.type}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;