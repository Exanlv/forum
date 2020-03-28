import { BaseHandler } from "./_base";

export class StatusHandler extends BaseHandler {
    public async handler() {
        return {
            status: 'Running',
            uptime: Math.floor(process.uptime()),
        };
    }
}