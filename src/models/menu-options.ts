export interface MenuOptions {
    type: string;
    name: string;
    message: string;
    choices: Choice[];
}

interface Choice {
    value: string;
    name: string;
}

