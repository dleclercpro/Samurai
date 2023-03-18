import * as bcrypt from 'bcrypt';
import { database } from '..';
import { N_PASSWORD_SALT_ROUNDS } from '../config/AuthConfig';
import { logger } from '../utils/Logging';

class User {
    protected email: string;
    protected password: string;

    public constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    public stringify() {
        return this.getEmail();
    }

    public getId() {
        return this.getEmail();
    }

    public getEmail() {
        return this.email;
    }

    public getPassword() {
        return this.password;
    }

    public async isPasswordValid(password: string) {
        return bcrypt.compare(password, this.password);
    }

    public async save() {
        database.setUser(this);

        logger.debug(`Stored user: ${this.getEmail()}`);
    }

    public async delete() {
        database.removeUser(this);

        logger.debug(`Deleted user: ${this.getEmail()}`);
    }

    // STATIC METHODS
    public static async findByEmail(email: string) {
        return database.getUserById(email);
    }

    public static async create(email: string, password: string) {

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, N_PASSWORD_SALT_ROUNDS);

        // Create new user
        const user = new User(email, hashedPassword);

        // Store user in database
        database.setUser(user);

        return user;
    }
}

export default User;