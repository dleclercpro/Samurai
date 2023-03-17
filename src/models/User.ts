class User {
    private id: string;
    private email: string;

    public constructor(id: string, email: string) {
        this.id = id;
        this.email = email;
    }

    public getId() {
        return this.id;
    }

    public getEmail() {
        return this.email;
    }
}

export default User;