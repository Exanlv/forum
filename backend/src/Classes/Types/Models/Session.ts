import { generateRandomString } from '../../../Helpers/Functions/generateRandomString';
import { User } from "./User";


export class Session {
    public token: string;
    public created_at: Date;

    constructor(user: User) {
        this.created_at = new Date();
        
        let token;

        do {
            token = generateRandomString(32);
        } while (user.sessions.find((session) => {
            return session.token = token;
        }));

        this.token = token;
    }
}