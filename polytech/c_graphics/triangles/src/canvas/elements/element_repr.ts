// TODO: implement enum for all possible styles and actions
// possible Record - but it does not fit yet in multiple arguments

// Each element consist of list of actions and styles wich apply to these actions
// So for example we want to have element rectangle with gradient inside
// First we draw 4 pathes with style of black
// Then we put gradient style and draw rectangle inside
export class ElStyle {
    name: string;
    value: string;
    constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }
}

export class ElAction {
    name: string;
    args?: Array<any>;
    constructor(name: string, args?: Array<any>) {
        this.name = name;
        if (args !== undefined) {
            this.args = args;
        }
    }
}

export type ElRepr = Array<ElStyle | ElAction>;