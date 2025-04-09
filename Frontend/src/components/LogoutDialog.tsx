import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      setCountdown(30);
    };
  }, [isOpen, navigate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-black mb-4">¿Ya te vas?</h2>
        <p className="text-gray-600 mb-2">
          Para que sepas, no hace falta que siempre cierres sesión en Netflix. Solo es necesario si estás en una computadora compartida o pública.
        </p>
        <p className="text-gray-600 mb-6">
          Se te redireccionará a Netflix.com en {countdown} segundos.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-[#0073e6] text-white px-8 py-2 rounded hover:bg-[#0066cc] transition"
          >
            Ir ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutDialog;