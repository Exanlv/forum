import { Db } from "../Db";
import { User as UserType } from "../Types/Models/User";

const db = Db.getInstance();

const UserSchema = db.mongoose.Schema({
    email: String,
    password: String,
    username: String,
    created_at: { type: Date, default: Date.now },
    sessions: [
        {
            _id: false,
            token: String,
            created_at: Date,
        }
    ]

});

export const User: UserType = db.mongoose.model('user', UserSchema);