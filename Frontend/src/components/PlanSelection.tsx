import { Link, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const PlanSelection = () => {
  const navigate = useNavigate();

  const handleNextStep = () => {
    navigate("/signup/plan-table");
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="px-4 md:px-16 py-6 border-b">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
            className="h-8 md:h-12"
          />
        </Link>
      </header>

      <main className="max-w-lg mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-8">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 mb-2">PASO 2 DE 3</p>
          <h1 className="text-3xl font-medium text-black mb-4">Selecciona tu plan</h1>
        </div>

        <ul className="space-y-4 mb-8">
          <li className="flex items-start">
            <Check className="w-5 h-5 text-red-600 mt-0.5 mr-2" />
            <span className="text-black">Sin compromisos, cancela cuando quieras.</span>
          </li>
          <li className="flex items-start">
            <Check className="w-5 h-5 text-red-600 mt-0.5 mr-2" />
            <span className="text-black">Todo Netflix a un bajo costo.</span>
          </li>
          <li className="flex items-start">
            <Check className="w-5 h-5 text-red-600 mt-0.5 mr-2" />
            <span className="text-black">Disfruta sin límites en todos tus dispositivos.</span>
          </li>
        </ul>

        <button
          onClick={handleNextStep}
          className="w-full bg-red-600 text-white py-4 rounded font-semibold hover:bg-red-700 transition"
        >
          Siguiente
        </button>
      </main>
    </div>
  );
};

export default PlanSelection; 