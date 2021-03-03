import { Model } from "./_Model";
import { Session } from "./Session";

type UserProperties = {
    _id?: number;
    email?: string;
    password?: string;
    username?: string;
    created_at?: Date;
    sessions?: Array<Session>;
};

export type User = Model & UserProperties & {
    new(properties?: UserProperties): User;
    save: (properties?: UserProperties) => Promise<User>;
    find: (criteria: UserProperties) => Promise<Array<User>>;
}