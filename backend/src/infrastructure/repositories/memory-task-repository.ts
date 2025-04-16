import { Task } from '../../domain/models/task';
import { TaskRepository } from '../../domain/repositories/task-repository';

export class MemoryTaskRepository implements TaskRepository {
  private tasks: Task[];

  constructor() {
    this.tasks = [
      {
        id: 101,
        projectId: 1,
        title: "Configurar entorno de desarrollo",
        description: "Instalar Node, Nuxt, y dependencias",
        status: "completada",
        tags: ["setup", "backend", "frontend"]
      },
      {
        id: 102,
        projectId: 1,
        title: "Crear modelo de datos",
        description: "",
        status: "en_progreso",
        tags: ["backend", "database"]
      },
      {
        id: 103,
        projectId: 1,
        title: "Implementar API REST - Proyectos",
        description: "Endpoints GET",
        status: "pendiente",
        tags: ["backend", "api"]
      },
      {
        id: 201,
        projectId: 2,
        title: "Diseñar vistas principales",
        description: "Mockups para lista y detalle",
        status: "completada",
        tags: ["frontend", "design"]
      },
      {
        id: 202,
        projectId: 2,
        title: "Desarrollar componente Lista Tareas",
        description: "Componente Vue reutilizable",
        status: "en_progreso",
        tags: ["frontend", "vue", "component"]
      },
      {
        id: 203,
        projectId: 2,
        title: "Integrar API Tareas en vista",
        description: "Llamadas a GET y PATCH",
        status: "pendiente",
        tags: ["frontend", "api", "integration"]
      },
      {
        id: 204,
        projectId: 2,
        title: "Añadir filtro por tags",
        description: "Funcionalidad extra en frontend",
        status: "pendiente",
        tags: ["frontend", "feature"]
      },
      {
        id: 301,
        projectId: 3,
        title: "Investigar optimización de queries",
        description: "",
        status: "pendiente",
        tags: ["backend", "performance", "database"]
      }
    ].map(t => new Task(t.id, t.projectId, t.title, t.description, t.status, t.tags));
  }

  async findAll(): Promise<Task[]> {
    return [...this.tasks];
  }

  async findById(id: number): Promise<Task | null> {
    const task = this.tasks.find(t => t.id === id);
    if (!task) {
      return null;
    }
    return task;
  }

  async findByProjectId(projectId: number): Promise<Task[]> {
    return this.tasks.filter(t => t.projectId === projectId);
  }

  async create(taskData: Omit<Task, 'id'>): Promise<Task> {
    const newId = Math.max(...this.tasks.map(t => t.id), 0) + 1;
    
    const task = new Task(
      newId,
      taskData.projectId,
      taskData.title,
      taskData.description || "",
      "pendiente", // El status inicial siempre será "pendiente"
      taskData.tags || []
    );
    
    this.tasks.push(task);
    return task;
  }

  async update(id: number, taskData: Partial<Task>): Promise<Task | null> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) {
      return null;
    }
    
    const task = this.tasks[index];
    
    if (taskData.status) {
      task.setStatus(taskData.status);
    }
    
    this.tasks[index] = task;
    return task;
  }

  async findTasksWithSharedTags(projectAId: number, projectBId: number): Promise<Task[]> {
    const projectATasks = this.tasks.filter(t => t.projectId === projectAId);
    const projectBTasks = this.tasks.filter(t => t.projectId === projectBId);
    
    const projectATags = new Set(projectATasks.flatMap(t => t.tags));
    const projectBTags = new Set(projectBTasks.flatMap(t => t.tags));
    
    const hasSharedTags = (task: Task, tagSet: Set<string>): boolean => {
      return task.tags.some(tag => tagSet.has(tag));
    };
    
    const tasksFromAWithSharedTags = projectATasks.filter(task => hasSharedTags(task, projectBTags));
    const tasksFromBWithSharedTags = projectBTasks.filter(task => hasSharedTags(task, projectATags));
    
    return [...tasksFromAWithSharedTags, ...tasksFromBWithSharedTags];
  }
}