import * as bcrypt from 'bcrypt';
import { Document, model, Model, Schema, SchemaOptions } from 'mongoose';
import { N_PASSWORD_SALT_ROUNDS } from '../config/AuthConfig';
import { ErrorUserDoesNotExist, ErrorUserWrongPassword } from '../errors/UserErrors';

export interface IUser extends Document {
    email: string,
    password: string,

    lastLogin: Date,
    lastPasswordReset: Date,

    nLoginAttempts: number,
    nPasswordResets: number,

    // Methods
    stringify: () => string,
    getId: () => string,
    getEmail: () => string,
    
    resetPassword: (password: string) => Promise<void>,
    authenticate: (password: string) => Promise<void>,
}



export interface IUserModel extends Model<IUser> {
    getAll: () => Promise<IUser[]>,
    getById: (id: string) => Promise<IUser>,
    getByEmail: (email: string) => Promise<IUser>,
    hashPassword: (password: string) => Promise<string>,
}



const UserSchemaOptions: SchemaOptions<IUser> = {
    toJSON: {
        transform: function(doc, ret) {
            // Do not let access to password outside Mongoose data layer
            delete ret.password;
        },
    },
}



export const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    password: { type: String, required: true },

    lastLogin: { type: Date },
    lastPasswordReset: { type: Date },

    nLoginAttempts: { type: Number, required: true, min: 0, default: 0 },
    nPasswordResets: { type: Number, required: true, min: 0, default: 0 },
}, UserSchemaOptions);



UserSchema.methods.stringify = function() {
    return this.email;
}

UserSchema.methods.getId = function() {
    return this._id;
}

UserSchema.methods.getEmail = function() {
    return this.email;
}



UserSchema.methods.resetPassword = async function(password: string) {
    this.password = await User.hashPassword(password);
    this.lastPasswordReset = new Date();
    this.nPasswordResets += 1;
}

UserSchema.methods.authenticate = async function(password: string) {
    const isPasswordValid = await bcrypt.compare(password, this.password);

    if (!isPasswordValid) {
        throw new ErrorUserWrongPassword(this.email);
    }
}



UserSchema.statics.getAll = async function() {
    return this.find({ }).exec();
}

UserSchema.statics.getById = async function(id: string) {
    try {
        return await this.findById(id).exec();
    } catch (e: any) {
        throw new ErrorUserDoesNotExist(id);
    }
}

UserSchema.statics.getByEmail = async function(email: string) {
    return this.findOne({ email }).exec();
}

UserSchema.statics.hashPassword = async function(password: string) {
    return bcrypt.hash(password, N_PASSWORD_SALT_ROUNDS);
}



const User = model<IUser, IUserModel>('User', UserSchema);

export default User;