import { Link, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const PlanSelection = () => {
  const navigate = useNavigate();

  const handleNextStep = () => {
    navigate("/signup/plan-table");
  };

  return (
    <div className="min-h-screen bg-piraflix-accent">
      <header className="px-4 md:px-16 py-6 border-b border-piraflix-gold bg-piraflix">
        <Link to="/">
          <img
            src="/assets/piraflix-logo.png"
            alt="PiraFlix"
            className="h-8 md:h-12"
          />
        </Link>
      </header>

      <main className="max-w-lg mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-8">
          <div className="w-8 h-8 rounded-full bg-piraflix-red flex items-center justify-center">
            <Check className="w-5 h-5 text-piraflix-accent" />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <p className="text-sm text-piraflix-gold mb-2">PASO 2 DE 3</p>
          <h1 className="text-3xl font-medium text-piraflix-black mb-4">Selecciona tu plan</h1>
        </div>

        <ul className="space-y-4 mb-8">
          <li className="flex items-start">
            <Check className="w-5 h-5 text-piraflix-red mt-0.5 mr-2" />
            <span className="text-piraflix-black">Sin compromisos, cancela cuando quieras.</span>
          </li>
          <li className="flex items-start">
            <Check className="w-5 h-5 text-piraflix-red mt-0.5 mr-2" />
            <span className="text-piraflix-black">Todo PiraFlix a un bajo costo.</span>
          </li>
          <li className="flex items-start">
            <Check className="w-5 h-5 text-piraflix-red mt-0.5 mr-2" />
            <span className="text-piraflix-black">Disfruta sin límites en todos tus dispositivos.</span>
          </li>
        </ul>

        <button
          onClick={handleNextStep}
          className="w-full bg-piraflix-red text-piraflix-accent py-4 rounded font-semibold hover:bg-piraflix-gold hover:text-piraflix-black transition shadow"
        >
          Siguiente
        </button>
      </main>
    </div>
  );
};

export default PlanSelection; 