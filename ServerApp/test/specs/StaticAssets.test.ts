import axios from 'axios';
import { STATIC_ROOT } from '../../src/config/AppConfig';
import { FULL_HAND_JSON, FULL_HAND_JSON_FILENAME } from '../../src/config/GameConfig';
import { defaultAfterAll, defaultAfterEach, defaultBeforeAll, defaultBeforeEach } from '..';



beforeAll(defaultBeforeAll);
beforeEach(defaultBeforeEach);
afterAll(defaultAfterAll);
afterEach(defaultAfterEach);



test(`Full hand JSON file should be available as static asset`, async () => {
    const action = () => axios.get(`${STATIC_ROOT}/${FULL_HAND_JSON_FILENAME}`).then(res => res.data);

    await expect(action()).resolves.toEqual(FULL_HAND_JSON);
});