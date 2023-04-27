import axios from 'axios';
import { start, stop } from '../src/app';
import { API_ROOT } from '../src/config/AppConfig';
import { successResponse } from '../src/libs/calls';
import { SignUpControllerBody } from '../src/controllers/auth/SignUpController';

const VALID_EMAIL = 'user@test.com';
const VALID_PASSWORD = 'q12345678!';
const INVALID_EMAIL = 'test';
const INVALID_PASSWORD = '123';

const SIGN_UP_CONTROLLER_URL = `${API_ROOT}/auth`;

beforeAll(async () => {
    await start();

    // Create DB
});

beforeEach(async () => {
    // Fill DB
});

afterAll(async () => {
    await stop();

    // Delete DB
});

afterEach(async () => {
    // Remove collections
})



const signUpAction = (user: SignUpControllerBody) => axios.post(SIGN_UP_CONTROLLER_URL, user).then(res => res.data);



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