import { Db } from "../Db";
import { User as UserType } from "../Types/Models/User";

const db = Db.getInstance();

const UserSchema = db.mongoose.Schema({
    email: String,
    password: String,
    username: String
});

export const User: UserType = db.mongoose.model('user', UserSchema);