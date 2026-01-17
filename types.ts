
export enum ContainerStatus {
  RUNNING = 'running',
  STOPPED = 'exited',
  PAUSED = 'paused',
  RESTARTING = 'restarting'
}

export interface MetricPoint {
  time: string;
  value: number;
}

export interface ContainerMetrics {
  cpuUsage: MetricPoint[];
  memUsage: MetricPoint[];
  netIO: { rx: number; tx: number };
}

export interface DockerContainer {
  id: string;
  name: string;
  image: string;
  status: ContainerStatus;
  uptime: string;
  cpu: number; // current %
  memory: number; // current MB
  memoryLimit: number; // MB
  ports: string[];
  metrics: ContainerMetrics;
}

export interface SystemOverview {
  totalContainers: number;
  runningContainers: number;
  totalCpu: number;
  totalMemory: number;
  maxMemory: number;
}

export interface AIInsight {
  type: 'optimization' | 'warning' | 'info';
  title: string;
  message: string;
  containerId?: string;
}
