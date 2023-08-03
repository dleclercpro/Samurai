import * as bcrypt from 'bcrypt';
import { Document, model, Model, Schema, SchemaOptions } from 'mongoose';
import { N_PASSWORD_SALT_ROUNDS, PASSWORD_OPTIONS } from '../config/AuthConfig';
import { ErrorUserDoesNotExist, ErrorUserWrongPassword } from '../errors/UserErrors';
import { isAlphanumerical, isNumerical } from '../utils/string';
import { validate } from 'email-validator';

export interface IUser extends Document {
    email: string,
    password: string,
    username: string,
    isAdmin: boolean,

    lastLogin: Date,
    lastPasswordReset: Date,

    nLoginAttempts: number,
    nPasswordResets: number,

    // Methods
    stringify: () => string,
    getId: () => string,
    getEmail: () => string,
    getUsername: () => string,
    
    resetPassword: (password: string) => Promise<void>,
    authenticate: (password: string) => Promise<void>,
}



export interface IUserModel extends Model<IUser> {
    getAll: () => Promise<IUser[]>,
    getById: (id: string) => Promise<IUser>,
    getByEmail: (email: string) => Promise<IUser>,
    hashPassword: (password: string) => Promise<string>,
    isEmailValid: (email: string) => boolean,
    isPasswordValid: (password: string) => boolean,
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
    username: { type: String, required: true, trim: true },
    isAdmin: { type: Boolean, required: true, default: false },

    lastLogin: { type: Date },
    lastPasswordReset: { type: Date },

    nLoginAttempts: { type: Number, required: true, min: 0, default: 0 },
    nPasswordResets: { type: Number, required: true, min: 0, default: 0 },
}, UserSchemaOptions);



// METHODS
UserSchema.methods.stringify = function() {
    return this.email;
}

UserSchema.methods.getId = function() {
    return this._id.toString();
}

UserSchema.methods.getEmail = function() {
    return this.email;
}

UserSchema.methods.getUsername = function() {
    return this.username;
}

UserSchema.methods.resetPassword = async function(password: string) {
    this.password = await User.hashPassword(password);
    this.lastPasswordReset = new Date();
    this.nPasswordResets += 1;
}

UserSchema.methods.authenticate = async function(password: string) {
    const isAuthenticated = await bcrypt.compare(password, this.password);

    if (!isAuthenticated) {
        throw new ErrorUserWrongPassword(this.email);
    }
}



// STATIC METHODS
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

UserSchema.statics.isEmailValid = function(email: string) {
    return validate(email);
}

UserSchema.statics.isPasswordValid = function(password: string) {
    const options = PASSWORD_OPTIONS;
    let isValid = true;
    
    if (options.minLength) {
        isValid = password.length >= options.minLength;
    }

    if (isValid && options.minNumbers) {
        isValid = password.split('').filter(c => isNumerical(c)).length >= options.minNumbers;
    }

    if (isValid && options.minSymbols) {
        isValid = password.split('').filter(c => !isAlphanumerical(c)).length >= options.minSymbols;
    }

    return isValid;
}



const User = model<IUser, IUserModel>('User', UserSchema);

export default User;