import { generateRandomString } from '../../../Helpers/Functions/generateRandomString';
import { User } from "./User";


export class Session {
    public token: string;
    public created_at: Date;
    public client: string;

    constructor(user: User, client: string) {
        this.created_at = new Date();
        this.client = client;
        
        let token;

        do {
            token = generateRandomString(32);
        } while (user.sessions.find((session) => {
            return session.token === token;
        }));

        this.token = token;
    }
}