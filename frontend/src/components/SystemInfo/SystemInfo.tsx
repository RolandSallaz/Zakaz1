import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ISystemInfo } from '../../utils/types';
import './SystemInfo.scss';

export default function SystemInfo() {
  const [systemInfo, setSystemInfo] = useState<ISystemInfo>();

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_WS || 'http://localhost:3000');

    function intervalDataSend() {
      return setInterval(() => {
        socket.emit('getSystemInfo');
      }, 1000);
    }

    const intervalId = intervalDataSend();

    socket.on('connect', () => {
      intervalDataSend();
    });

    socket.on('systemInfo', (data) => {
      setSystemInfo(data);
    });

    return () => {
      socket.disconnect();
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="systemInfo">
      <h2 className="systemInfo__title">Данные о системе</h2>
      <section className="systemInfo__section">
        <h3 className="systemInfo__section-title">Озу</h3>
        <p className="systemInfo__section-text">Всего {systemInfo?.ram?.totalMemory} GB</p>
        <p className="systemInfo__section-text">Использовано {systemInfo?.ram?.usedMemory} GB</p>
        <p className="systemInfo__section-text">Свободно {systemInfo?.ram?.freeMemory} GB</p>
        <p className="systemInfo__section-text">
          Используется сервером {systemInfo?.ram?.usedMemory} MB
        </p>
      </section>
      <section className="systemInfo__section">
        <h3 className="systemInfo__section-title">Память</h3>
        {systemInfo?.disk?.space?.map((disk, index) => (
          <div key={index} className="systemInfo__disk">
            <p className="systemInfo__disk-info">Диск {index + 1}</p>
            <p className="systemInfo__disk-info">Размер {disk.sizeInGB} GB</p>
            <p className="systemInfo__disk-info">Занято {disk.usedInGB} GB</p>
          </div>
        ))}
      </section>
    </div>
  );
}
