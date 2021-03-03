import { Model } from "./Model";

type UserProperties = {
    email?: string;
    password?: string;
    username?: string;
};

export type User = Model & UserProperties & {
    new(properties?: UserProperties): User;
    find: (criteria: UserProperties) => Promise<Array<User>>,
}