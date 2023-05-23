import axios from 'axios';
import { start, stop } from '../../src/app';
import { STATIC_ROOT } from '../../src/config/AppConfig';
import { FULL_HAND_JSON, FULL_HAND_JSON_FILENAME } from '../../src/config/GameConfig';

beforeAll(async () => {
    await start();
});

beforeEach(async () => {

});

afterAll(async () => {
    await stop();
});

afterEach(async () => {

});



test(`Full hand JSON file should be available as static asset`, async () => {
    const action = () => axios.get(`${STATIC_ROOT}/${FULL_HAND_JSON_FILENAME}`).then(res => res.data);

    await expect(action()).resolves.toEqual(FULL_HAND_JSON);
});