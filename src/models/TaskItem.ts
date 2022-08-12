import colors from 'colors';
export class TaskItem{
    public constructor(
        public id: number,
        public task: string,
        public completed: boolean = false
    ){}

    printDetails(): void {
        console.log(`${colors.green(`${this.id}`)}\t${this.task} ${this.completed ? '\tCompleted'.green : '\tPending'.red}`);
    }
}