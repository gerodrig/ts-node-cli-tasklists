import colors from 'colors';
import * as Readline from 'readline';

export const showMenu = (): Promise<string>  => {
  return new Promise((resolve) => {
    console.clear();
    console.log(colors.green('============================'));
    console.log(colors.yellow('    Select an option:'));
    console.log(colors.green('============================\n'));

    console.log(`${'1.'.green} Create a task`);
    console.log(`${'2.'.green} List tasks`);
    console.log(`${'3.'.green} List completed tasks`);
    console.log(`${'4.'.green} List pending tasks`);
    console.log(`${'5.'.green} Complete task(s)`);
    console.log(`${'6.'.green} Delete a task`);
    console.log(`${'0.'.green} Exit\n`);

    const readline = Readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question('Select an option: ', (option: string) => {
      readline.close();
      resolve(option);
    });
  });
};

export const pause = (): Promise<void> => {

    return new Promise((resolve) => {
      const readline = Readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
  
      readline.question(`\nPress ${'ENTER'.cyan} to continue\n`, (option: string) => {
        readline.close();
        resolve();
      });
    });
};
