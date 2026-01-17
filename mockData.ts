
import { DockerContainer, ContainerStatus, SystemOverview } from './types';

const generateMetrics = (count: number, base: number, variance: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    time: `${i}:00`,
    value: Math.max(0, base + (Math.random() - 0.5) * variance)
  }));
};

export const MOCK_CONTAINERS: DockerContainer[] = [
  {
    id: '7f3a8b2c1d9e',
    name: 'nginx-proxy',
    image: 'nginx:latest',
    status: ContainerStatus.RUNNING,
    uptime: '14 days',
    cpu: 1.2,
    memory: 45,
    memoryLimit: 512,
    ports: ['80:80', '443:443'],
    metrics: {
      cpuUsage: generateMetrics(20, 1.5, 0.8),
      memUsage: generateMetrics(20, 42, 5),
      netIO: { rx: 1200, tx: 850 }
    }
  },
  {
    id: 'a1b2c3d4e5f6',
    name: 'postgres-db',
    image: 'postgres:15-alpine',
    status: ContainerStatus.RUNNING,
    uptime: '4 days',
    cpu: 4.8,
    memory: 256,
    memoryLimit: 2048,
    ports: ['5432:5432'],
    metrics: {
      cpuUsage: generateMetrics(20, 5, 3),
      memUsage: generateMetrics(20, 240, 30),
      netIO: { rx: 450, tx: 120 }
    }
  },
  {
    id: 'f9e8d7c6b5a4',
    name: 'redis-cache',
    image: 'redis:7.0',
    status: ContainerStatus.RUNNING,
    uptime: '22 hours',
    cpu: 0.5,
    memory: 12,
    memoryLimit: 256,
    ports: ['6379:6379'],
    metrics: {
      cpuUsage: generateMetrics(20, 0.4, 0.2),
      memUsage: generateMetrics(20, 11.5, 1),
      netIO: { rx: 8900, tx: 4200 }
    }
  },
  {
    id: 'c1d2e3f4g5h6',
    name: 'api-gateway',
    image: 'node:18-slim',
    status: ContainerStatus.RESTARTING,
    uptime: '0 seconds',
    cpu: 0,
    memory: 0,
    memoryLimit: 1024,
    ports: ['3000:3000'],
    metrics: {
      cpuUsage: generateMetrics(20, 0, 0),
      memUsage: generateMetrics(20, 0, 0),
      netIO: { rx: 0, tx: 0 }
    }
  },
  {
    id: '9a8b7c6d5e4f',
    name: 'worker-node-1',
    image: 'python:3.10-slim',
    status: ContainerStatus.STOPPED,
    uptime: 'Stopped 2 days ago',
    cpu: 0,
    memory: 0,
    memoryLimit: 2048,
    ports: [],
    metrics: {
      cpuUsage: generateMetrics(20, 0, 0),
      memUsage: generateMetrics(20, 0, 0),
      netIO: { rx: 0, tx: 0 }
    }
  }
];

export const MOCK_SYSTEM: SystemOverview = {
  totalContainers: 5,
  runningContainers: 3,
  totalCpu: 6.5,
  totalMemory: 313,
  maxMemory: 8192
};
