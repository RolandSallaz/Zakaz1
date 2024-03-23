import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { currentLoad, mem, fsSize } from 'systeminformation';

@WebSocketGateway({ cors: true })
export class SystemInfoGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('getSystemInfo')
  async sendSystemInfo(client: any, data: any) {
    try {
      const cpuInfo = await currentLoad();
      const memoryInfo = await mem();
      const processMemoryInfo = process.memoryUsage();
      const diskSpaceInfo = await fsSize();
      const diskInfoInGB = diskSpaceInfo.map((partition) => ({
        ...partition,
        sizeInGB: (partition.size / (1024 * 1024 * 1024)).toFixed(2),
        usedInGB: (partition.used / (1024 * 1024 * 1024)).toFixed(2),
        availableInGB: (partition.available / (1024 * 1024 * 1024)).toFixed(2),
      }));

      const systemInfo = {
        cpu: cpuInfo.currentLoad.toFixed(2),
        ram: {
          totalMemory: (memoryInfo.total / (1024 * 1024 * 1024)).toFixed(2), // Переводим в гигабайты
          freeMemory: (memoryInfo.free / (1024 * 1024 * 1024)).toFixed(2), // Переводим в гигабайты
          usedMemory: (
            (memoryInfo.total - memoryInfo.free) /
            (1024 * 1024 * 1024)
          ).toFixed(2), // Переводим в гигабайты
          nodeMemory: (processMemoryInfo.heapUsed / (1024 * 1024)).toFixed(2), // Переводим в мегабайты
        },
        disk: {
          space: diskInfoInGB,
        },
      };

      // Отправляем информацию о системе обратно клиенту
      this.server.emit('systemInfo', systemInfo);
    } catch (error) {
      console.error('Ошибка при получении информации о системе:', error);
    }
  }
}
