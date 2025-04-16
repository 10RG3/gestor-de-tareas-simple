import express, { Application } from 'express';
import cors from 'cors';
import { Router } from 'express';
import { TaskController } from '../api/controllers/task-controller';

export class Server {
  private app: Application;
  private port: number;
  private server: any;

  constructor(
    private projectRoutes: Router,
    private taskRoutes: Router,
    private taskController: TaskController
  ) {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3100', 10);
    
    this.setupMiddlewares();
    this.setupRoutes();
  }
  
  private setupMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }
  
  private setupRoutes(): void {
    this.app.use('/api/projects', this.projectRoutes);
    this.app.use('/api/tasks', this.taskRoutes);
  }
  
  public start(): Promise<void> {
    return new Promise((resolve) => {
      this.server = this.app.listen(this.port, () => {
        console.log(`Servidor corriendo en el puerto ${this.port}`);
        resolve();
      });
    });
  }
  
  public stop(): Promise<void> {
    return new Promise((resolve) => {
      if (this.server) {
        this.server.close(() => {
          console.log('Servidor detenido');
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
}