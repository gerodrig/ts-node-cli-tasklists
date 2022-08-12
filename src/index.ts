import colors from 'colors';

import { inquirerMenu, listDeleteTasks, pause, readInput, confirmation, showTasksChecklist } from './helpers/inquirer';
import { readFile, saveFile } from './helpers/fileManager';
import { TaskCollection } from './models/TaskCollection';

console.clear();

const main = async () => {
 //console.log(colors.green('Hello World'));

 let opt = '';
 const tasks = new TaskCollection();

 const tasksDb = readFile();

 if(tasksDb){
     try {
        console.log(colors.cyan('Loading tasks...'));
        
        await tasks.loadTasksfromJson(tasksDb);

     } catch (error) {
            console.log(colors.red(error as string));
     }
 }

 do {
     opt = await inquirerMenu();
     //console.log(opt);

     switch(opt) {
            case '1':
                //create task
                const description = await readInput('Enter a description:');
                tasks.addTask(description);
            break;
            case '2':             
            tasks.listTasks();
            break;
            case '3':             
            tasks.listTasksByStatus(true);
            break;
            case '4':             
            tasks.listTasksByStatus(false);
            break;
            case '5':             
            const ids = await showTasksChecklist(tasks.allTasks);
            tasks.markComplete(ids);
            console.log(ids);
            break;
            case '6':             
            const id = await listDeleteTasks(tasks.allTasks);
            if(id === 0) break;
            const confirm = await confirmation(`Are you sure you want to delete task ${id}?`);

            if(confirm) {
                console.log(colors.red(`Task ${id} deleted`));
                tasks.deleteTask(id);
            }
            break;
            case '0':
                console.log(colors.cyan('Saving tasks...'));
                opt = '0';
                break;
            default : console.log('Invalid option');
     }

     
     saveFile(tasks.allTasks );

     await pause();

 } while (opt !== '0');

    console.log(colors.rainbow('Bye!'));
}


main();