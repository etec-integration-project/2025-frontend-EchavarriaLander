import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import axios from 'axios';

const PaymentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    card_number: '',
    expiration_date: '',
    cvv: '',
    card_holder: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/subscribe', {
        plan_id: 1, // O el ID del plan seleccionado
        payment_method: 'credit_card',
        ...formData
      });

      if (response.data.message === 'Subscription successful') {
        navigate('/profiles');
      }
    } catch (error) {
      setError('Error al procesar el pago. Por favor, intente nuevamente.');
      console.error('Error:', error);
    }
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
        <p className="text-sm text-gray-500 mb-2">PASO 3 DE 3</p>
        <h1 className="text-3xl font-medium mb-6">Configura tu tarjeta de crédito o débito</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="card_number"
            value={formData.card_number}
            onChange={handleChange}
            placeholder="Número de tarjeta"
            className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-gray-400"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="expiration_date"
              value={formData.expiration_date}
              onChange={handleChange}
              placeholder="MM/YY"
              className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-gray-400"
            />
            <div className="relative">
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="CVV"
                className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-gray-400"
              />
              <HelpCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <input
            type="text"
            name="card_holder"
            value={formData.card_holder}
            onChange={handleChange}
            placeholder="Nombre en la tarjeta"
            className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-gray-400"
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-4 rounded font-semibold hover:bg-red-700 transition"
          >
            Iniciar membresía
          </button>
        </form>
      </main>
    </div>
  );
};

export default PaymentForm; 