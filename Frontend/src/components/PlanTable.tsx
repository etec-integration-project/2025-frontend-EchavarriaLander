import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../axiosConfig';

interface Plan {
  id: number;
  name: string;
  price: number;
  quality: string;
  resolution: string;
  devices: string;
  downloads: number;
}

const PlanTable = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [error, setError] = useState('');
  const [paymentData, setPaymentData] = useState({
    card_number: '',
    card_holder: '',
    expiration_date: '',
    cvv: ''
  });

  const plans = [
    {
      id: 1,
      name: 'Básico',
      price: 3000,
      quality: 'Buena',
      resolution: '720p (HD)',
      devices: 'TV, computadora, teléfono, tablet',
      downloads: 1
    },
    {
      id: 2,
      name: 'Estándar',
      price: 5000,
      quality: 'Óptima',
      resolution: '4k (Ultra HD) + HDR',
      devices: 'TV, computadora, teléfono, tablet',
      downloads: 2
    }
  ];

  const handlePaymentDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Validaciones específicas por campo
    switch (name) {
      case 'card_number':
        formattedValue = value.replace(/\D/g, '').slice(0, 16);
        break;
      case 'expiration_date':
        formattedValue = value
          .replace(/\D/g, '')
          .slice(0, 4)
          .replace(/(\d{2})(\d{2})/, '$1/$2');
        break;
      case 'cvv':
        formattedValue = value.replace(/\D/g, '').slice(0, 3);
        break;
      case 'card_holder':
        formattedValue = value.replace(/[^a-zA-Z\s]/g, '');
        break;
    }

    setPaymentData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    if (!selectedPlan) {
      setError('Por favor seleccione un plan');
      return;
    }
  
    try {
      console.log('Enviando datos:', { 
        plan_id: selectedPlan.id, 
        payment_method: 'credit_card',
        ...paymentData 
      });
      
      const response = await axiosInstance.post('/subscriptions/subscribe', {
        plan_id: selectedPlan.id,
        payment_method: 'credit_card',
        ...paymentData
      });
  
      console.log('Respuesta:', response.data);
  
      if (response.data.message === 'Subscription successful') {
        navigate('/profiles');
      }
    } catch (err: any) {
      console.error('Error completo:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.message || 'Error al procesar el pago. Por favor intente nuevamente.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="px-4 md:px-16 py-6 border-b">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
          className="h-8 md:h-12"
        />
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-sm text-gray-500 mb-2">PASO 2 DE 3</p>
        <h1 className="text-3xl font-medium text-black mb-8">Selecciona el plan ideal para ti</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              className={`border rounded-lg p-6 hover:shadow-lg transition cursor-pointer ${
                selectedPlan?.id === plan.id ? 'border-red-600 shadow-lg' : ''
              }`}
            >
              <div className="bg-gradient-to-r from-blue-700 to-purple-600 text-white p-4 rounded-t-lg mb-4">
                <h2 className="text-xl font-bold">{plan.name}</h2>
                <p>{plan.resolution}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Precio mensual</p>
                  <p className="text-xl font-bold text-black">$ {plan.price}</p>
                </div>

                <div>
                  <p className="text-gray-600">Calidad de audio y video</p>
                  <p className="text-black">{plan.quality}</p>
                </div>

                <div>
                  <p className="text-gray-600">Resolución</p>
                  <p className="text-black">{plan.resolution}</p>
                </div>

                <div>
                  <p className="text-gray-600">Dispositivos compatibles</p>
                  <p className="text-black">{plan.devices}</p>
                </div>

                <div>
                  <p className="text-gray-600">Dispositivos de descarga</p>
                  <p className="text-black">{plan.downloads}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-8 mb-4">
          La disponibilidad del contenido en HD (720p), Full HD (1080p) depende de tu servicio de internet y del dispositivo en uso. No todo el contenido está disponible en todas las resoluciones.
        </p>

        <p className="text-sm text-gray-500 mb-8">
          Solo las personas que viven contigo pueden usar tu cuenta. Puedes ver Netflix en 2 dispositivos al mismo tiempo con el plan Estándar y en 1 con el plan Básico.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="relative">
            <input
              type="text"
              name="card_number"
              placeholder="Número de tarjeta"
              value={paymentData.card_number}
              onChange={handlePaymentDataChange}
              className="w-full px-4 py-3 rounded border border-gray-300 text-black focus:outline-none focus:border-gray-400"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              name="card_holder"
              placeholder="Nombre en la tarjeta"
              value={paymentData.card_holder}
              onChange={handlePaymentDataChange}
              className="w-full px-4 py-3 rounded border border-gray-300 text-black focus:outline-none focus:border-gray-400"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                name="expiration_date"
                placeholder="MM/YY"
                value={paymentData.expiration_date}
                onChange={handlePaymentDataChange}
                className="w-full px-4 py-3 rounded border border-gray-300 text-black focus:outline-none focus:border-gray-400"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={paymentData.cvv}
                onChange={handlePaymentDataChange}
                className="w-full px-4 py-3 rounded border border-gray-300 text-black focus:outline-none focus:border-gray-400"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-4 rounded font-semibold hover:bg-red-700 transition mt-4"
          >
            Siguiente
          </button>
        </form>
      </main>
    </div>
  );
};

export default PlanTable; 