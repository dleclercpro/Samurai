import axios from 'axios';
import { start, stop } from '../src/app';
import { API_ROOT } from '../src/config/AppConfig';
import { successResponse } from '../src/libs/calls';
import { SignUpControllerBody } from '../src/controllers/auth/SignUpController';
import TestDatabase from '../src/databases/TestDatabase';

const VALID_EMAIL = 'user@test.com';
const VALID_PASSWORD = 'q12345678!';
const INVALID_EMAIL = 'test';
const INVALID_PASSWORD = '123';

beforeAll(async () => {
    await start();
});

beforeEach(async () => {

});

afterAll(async () => {
    await TestDatabase.drop();

    await stop();
});

afterEach(async () => {
    await TestDatabase.dropCollections();
});



const signUpAction = (user: SignUpControllerBody) => axios.post(`${API_ROOT}/auth`, user).then(res => res.data);



test('Signing up with valid credentials should work', async () => {
    const user = { email: VALID_EMAIL, password: VALID_PASSWORD };

    await expect(signUpAction(user)).resolves.toEqual(successResponse());
});

test('Signing up with invalid e-mail should not work', async () => {
    const user = { email: INVALID_EMAIL, password: VALID_PASSWORD };

    await expect(signUpAction(user)).rejects.toThrow();
});

test('Signing up with invalid password should not work', async () => {
    const user = { email: VALID_EMAIL, password: INVALID_PASSWORD };

    await expect(signUpAction(user)).rejects.toThrow();
});