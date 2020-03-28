import { StatusHandler } from "./Handlers/StatusHandler";

export const routes: Array<Route> = [
    {
        path: '/status',
        handler: StatusHandler,
        method: 'GET'
    }
];


export class Route {
    public path: string;
    public handler: any;
    public method: 'GET' | 'POST';
}