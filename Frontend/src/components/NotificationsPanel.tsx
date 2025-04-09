import React from 'react';
import { Bell } from 'lucide-react';

const NotificationsPanel = () => {
  const notifications = [
    {
      id: 1,
      title: 'Nueva temporada disponible',
      message: 'Stranger Things 5 ya está disponible',
      time: '2h',
      image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500'
    },
    {
      id: 2,
      title: 'Continúa viendo',
      message: 'Continúa viendo The Crown donde lo dejaste',
      time: '1d',
      image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500'
    },
    {
      id: 3,
      title: 'Recomendado para ti',
      message: 'Nueva serie: Wednesday',
      time: '2d',
      image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500'
    }
  ];

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-black border border-gray-800 rounded-md shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5" />
          <h3 className="font-semibold">Notificaciones</h3>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 border-b border-gray-800 hover:bg-gray-900 transition-colors cursor-pointer"
          >
            <div className="flex space-x-3">
              <img
                src={notification.image}
                alt=""
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{notification.title}</h4>
                <p className="text-sm text-gray-400">{notification.message}</p>
                <span className="text-xs text-gray-500 mt-1">{notification.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel;