import { TaskItem } from './TaskItem';

type TaskCounts = {
  total: number;
  incomplete: number;
};

export class TaskCollection {
  get allTasks(): TaskItem[] {
    return [...this.taskMap.values()];
  }

  nextId: number = 1;
  taskMap = new Map<number, TaskItem>();
  constructor(public userName: string = '', public taskItems: TaskItem[] = []) {
    taskItems.forEach((task) => this.taskMap.set(task.id, task));
  }

  addTask(task: string): number {
    while (this.taskMap.has(this.nextId)) {
      this.nextId++;
    }
    this.taskMap.set(this.nextId, new TaskItem(this.nextId, task));
    return this.nextId;
  }

  getTaskById(id: number): TaskItem | undefined {
    return this.taskMap.get(id);
  }

  markComplete(ids: number[]): void {
    // const task = this.getTaskById(id);
    // if (task) {
    //   task.completed = completed;
    // }
    this.allTasks.forEach((task) => {
        if (ids.includes(task.id)) {
            task.completed = true;
            return;
        }
        task.completed = false;
    } );

    // ids.forEach((id) => {
    //     const task = this.getTaskById(id);
    //     if (task) {
    //         task.completed = true;
    //     }
    //     });
  }

  removeComplete(): void {
    this.taskMap.forEach((task) => {
      if (task.completed) {
        this.taskMap.delete(task.id);
      }
    });
  }

  getTaskItems(includeComplete: boolean): TaskItem[] {
    // return [...this.taskMap.values()].filter(
    //   (task) => includeComplete || !task.completed
    // );
    return [...this.taskMap.values()].filter( (task) => includeComplete ? task.completed : !task.completed);
  }

  getTaskCount(): TaskCounts {
    return {
      total: this.taskMap.size,
      incomplete: this.getTaskItems(false).length,
    };
  }

  loadTasksfromJson(json: TaskItem[]): Promise<void> {
    return new Promise((resolve, reject) => {
      json.forEach(({ id, task, completed }: TaskItem) => {
        this.taskMap.set(id, new TaskItem(id, task, completed));
      });
      resolve();
    });
  }

  listTasks(): void {
    this.taskMap.forEach((task) => {
      task.printDetails();
    });
  }

  listTasksByStatus(includeComplete: boolean): void {

    const tasks = this.getTaskItems(includeComplete);

    if(tasks.length === 0) {
        console.log('No tasks to display');
        return;
    }

    tasks.forEach((task) => {
      task.printDetails();
    });
  }

  deleteTask (id: number): void {

    if(!this.taskMap.has(id)) {
        console.log(`Task ${id} not found`);
        return;
    }

    this.taskMap.delete(id);
  }
}
