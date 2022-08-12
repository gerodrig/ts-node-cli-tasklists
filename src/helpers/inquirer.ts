import inquirer from 'inquirer';
import colors from 'colors';
import { questions } from '../questions/menu-options';
import { TaskItem } from '../models/TaskItem';

export const inquirerMenu = async () => {
    console.clear();
    console.log('============================'.green);
    console.log('    Select an option:'.white);
    console.log('============================\n'.green);

    const {option} = await inquirer.prompt(questions);

    return option;

}

export const readInput = async (message: string) => {
    const {input} = await inquirer.prompt({
        type: 'input',
        name: 'input',
        message,
        validate: (value: string) => {
            if(value.length === 0 ) {
                return 'Please enter a value';
            }
            return true;
        }});

    return input;
}

export const pause = async (): Promise<void> => {
    // console.clear();
    console.log('\n');
    await inquirer.prompt({
        type: 'input',
        name: 'pause',
        message: `Press ${ colors.green('ENTER') } to continue...`
    });

}

export const listDeleteTasks = async (tasks: TaskItem[]): Promise<any> => {
    const choices = tasks.map( ({id, task}: TaskItem) => {
        return {
            value: id,
            name: `${colors.green(`${id} - `)}${task}`
        }
    });

    choices.unshift({
        value: 0,
        name: colors.green('0 - ') + 'Cancel'
    });

    const {id} = await inquirer.prompt({
        type: 'list',
        name: 'id',
        message: 'Select a task to delete',
        choices
    });

    return id;
}

export const showTasksChecklist = async (tasks: TaskItem[]): Promise<any> => {
    const choices = tasks.map( ({id, task, completed}: TaskItem) => {
        return {
            value: id,
            name: `${colors.green(`${id} - `)}${task}`,
            checked: (completed) ? true : false
        }
    });

    const {ids} = await inquirer.prompt({
        type: 'checkbox',
        name: 'ids',
        message: 'Select task(s) to complete',
        choices
    });

    return ids;
}

export const confirmation = async (message: string): Promise<boolean> => {
    const {confirmation} = await inquirer.prompt({
        type: 'confirm',
        name: 'confirmation',
        message
    });

    return confirmation;
}