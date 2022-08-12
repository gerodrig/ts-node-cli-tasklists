import colors from 'colors';
import { MenuOptions } from '../models/menu-options';

export const questions: MenuOptions[] = [
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
            {
                value: '1',
                name: `${colors.green('1.')} Create task`
            },
            {
                value: '2',
                name: `${colors.green('2.')} List tasks`
            },
            {
                value: '3',
                name: `${colors.green('3.')} List completed tasks`
            },
            {
                value: '4',
                name: `${colors.green('4.')} List pending tasks`
            },
            {
                value: '5',
                name: `${colors.green('5.')} Complete task(s)`
            },
            {
                value: '6',
                name: `${colors.green('6.')} Delete task(s)`
            },
            {
                value: '0',
                name: `${colors.green('0.')} Exit`
            },
        ]
    }
]