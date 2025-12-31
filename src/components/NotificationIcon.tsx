import { useState, useEffect } from 'react';
import useSignalR from './SignalRNotifiication'; // assuming your SignalR hook is in this file
import { FaBell } from 'react-icons/fa'; // If using react-icons for the bell icon

const NotificationIcon = () => {
  // const { notification } = useSignalR();
  const [showNotification, setShowNotification] = useState(false);

  // useEffect(() => {
  //   if (notification) {
  //     setShowNotification(true);
  //   }
  // }, [notification]);

  return (
    <div className="relative">
      <FaBell size={18} />

      {showNotification && (
        <div className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs">
          <span>1</span> 
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
