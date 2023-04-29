import axios from 'axios';
import { start, stop } from '../src/app';
import { API_ROOT } from '../src/config/AppConfig';
import { successResponse } from '../src/libs/calls';
import TestDatabase from '../src/databases/TestDatabase';

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



const HEALTH_CONTROLLER_URL = `${API_ROOT}/health`;



test(`Health check [using GET] should work`, async () => {
    const action = () => axios.get(HEALTH_CONTROLLER_URL).then(res => res.data);

    await expect(action()).resolves.toEqual(successResponse());
});

test(`Invalid health check [using POST] should not work`, async () => {
    const action = () => axios.post(HEALTH_CONTROLLER_URL);

    await expect(action()).rejects.toThrow();
});

test(`Invalid health check [using PUT] should not work`, async () => {
    const action = () => axios.put(HEALTH_CONTROLLER_URL);

    await expect(action()).rejects.toThrow();
});

test(`Invalid health check [using DELETE] should not work`, async () => {
    const action = () => axios.delete(HEALTH_CONTROLLER_URL);

    await expect(action()).rejects.toThrow();
});