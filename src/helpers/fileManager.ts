import fs from 'fs';

const file = './src/db/data.json';

export const saveFile = (data: any) => {


    fs.writeFileSync(file, JSON.stringify(data));
 }

 export const readFile = () => {
    if(!fs.existsSync(file)) {
        return null;
    }
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
 }