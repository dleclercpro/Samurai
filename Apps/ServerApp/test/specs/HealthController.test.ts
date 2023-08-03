import axios from 'axios';
import { API_ROOT } from '../../src/config/AppConfig';
import { successResponse } from '../../src/utils/calls';
import { defaultBeforeAll, defaultBeforeEach, defaultAfterAll, defaultAfterEach } from '..';



beforeAll(defaultBeforeAll);
beforeEach(defaultBeforeEach);
afterAll(defaultAfterAll);
afterEach(defaultAfterEach);



const HEALTH_CONTROLLER_URL = `${API_ROOT}/health`;



test(`Health check [using GET] should work`, async () => {
    const action = () => axios.get(HEALTH_CONTROLLER_URL).then(res => res.data);

    await expect(action()).resolves.toEqual(successResponse());
});



test(`Invalid health check [using POST] should NOT work`, async () => {
    const action = () => axios.post(HEALTH_CONTROLLER_URL);

    await expect(action()).rejects.toThrow();
});



test(`Invalid health check [using PUT] should NOT work`, async () => {
    const action = () => axios.put(HEALTH_CONTROLLER_URL);

    await expect(action()).rejects.toThrow();
});



test(`Invalid health check [using DELETE] should NOT work`, async () => {
    const action = () => axios.delete(HEALTH_CONTROLLER_URL);

    await expect(action()).rejects.toThrow();
});