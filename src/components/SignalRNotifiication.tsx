import { useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { buildUrl } from '@/app/utils/urlBuilder';

interface UseSignalRReturn {
  notification: string | null;
  connection: HubConnection | null;
}

const useSignalR = (): UseSignalRReturn => {
  const [notification, setNotification] = useState<string | null>(null);
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(buildUrl('/notificationHub')) // URL to SignalR hub
      .build();

    connection.on('ReceiveNotification', (message: string) => {
      setNotification(message);
    });

    connection.start()
      .then(() => console.log('SignalR Connected!'))
      .catch((err) => console.error('SignalR Connection Error:', err));

    setConnection(connection);

    return () => {
      connection.stop();
    };
  }, []);

  return { notification, connection };
};

export default useSignalR;
