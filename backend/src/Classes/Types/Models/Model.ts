export type Model = {
    new(...args: any[]): Model;
    _id: number;
    save: (callback: (err: string) => void) => void;
}