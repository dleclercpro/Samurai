import { PLAYERS, USER, afterAllPlay, afterEachPlay, beforeAllPlay, beforeEachPlay, createGame } from '.';
import PlayGameCommand from '../../../src/commands/game/PlayGameCommand';
import { TEST_NORMAL_ORDERS_4_PLAYERS_JSON, TEST_SAMURAI_ORDERS_2_PLAYERS_JSON, TEST_SHIP_ORDERS_4_PLAYERS_JSON, TEST_CASTE_TIE_ORDERS_4_PLAYERS_JSON } from '../../../src/config/TestConfig';
import { INIT_SCORE } from '../../../src/constants';
import { signInAction } from '../../actions/AuthActions';
import { getGameDataAction } from '../../actions/GameActions';



beforeAll(beforeAllPlay);
beforeEach(beforeEachPlay);
afterAll(afterAllPlay);
afterEach(afterEachPlay);



test(`Being the strongest player in a given caste should lead to winning said caste`, async () => {
    const game = await createGame(['PLAYER_MILITARY', 'PLAYER_RELIGION', 'PLAYER_COMMERCE', 'PLAYER'], 'PLAYER_MILITARY');

    // Every player strongest in their caste wins corresponding caste piece
    const orders = TEST_NORMAL_ORDERS_4_PLAYERS_JSON;

    // Execute commands sequentially
    for (const { playerName, order } of orders) {
        const player = await game.getPlayerById(PLAYERS[playerName].id);

        await new PlayGameCommand({ order, player }).execute();
    }

    await signInAction({
        email: USER.email,
        password: USER.password,
        staySignedIn: false,
    });

    // Fetch game data
    const { data: { players } } = await getGameDataAction(game.id, orders.length - 1);
    const { self, opponents } = players;
    
    // Build score map
    const scores = new Map();
    [self, ...opponents].forEach(player => {
        scores.set(player.id, player.score);
    });

    // Verify scoring is correct based on game rules
    expect(scores.get(PLAYERS['PLAYER_MILITARY'].id)).toEqual({
        Military: 1,
        Religion: 0,
        Commerce: 0,
    });
    
    expect(scores.get(PLAYERS['PLAYER_RELIGION'].id)).toEqual({
        Military: 0,
        Religion: 1,
        Commerce: 0,
    });

    expect(scores.get(PLAYERS['PLAYER_COMMERCE'].id)).toEqual({
        Military: 0,
        Religion: 0,
        Commerce: 1,
    });

    expect(scores.get(PLAYERS['PLAYER'].id)).toEqual(INIT_SCORE);
});



test(`Samurai hand tiles should count for all castes when measuring players' caste strength`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE'], 'PLAYER');
    const orders = TEST_SAMURAI_ORDERS_2_PLAYERS_JSON;

    // Execute commands sequentially
    for (const { playerName, order } of orders) {
        const player = await game.getPlayerById(PLAYERS[playerName].id);

        await new PlayGameCommand({ order, player }).execute();
    }

    await signInAction({
        email: USER.email,
        password: USER.password,
        staySignedIn: false,
    });

    // Fetch game data
    const { data: { players } } = await getGameDataAction(game.id, orders.length - 1);
    const { self, opponents } = players;
    
    // Build score map
    const scores = new Map();
    [self, ...opponents].forEach(player => {
        scores.set(player.id, player.score);
    });

    // Verify scoring is correct based on game rules
    expect(scores.get(PLAYERS['PLAYER'].id)).toEqual({
        Military: 0,
        Religion: 0,
        Commerce: 1,
    });

    expect(scores.get(PLAYERS['PLAYER_WITH_MOVE'].id)).toEqual({
        Military: 1,
        Religion: 1,
        Commerce: 0,
    });
});



test(`Ship hand tiles should count for all castes when measuring players' caste strength`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE', 'PLAYER_WITH_SWAP', 'PLAYER_WITH_MOVE_AND_SWAP'], 'PLAYER');
    const orders = TEST_SHIP_ORDERS_4_PLAYERS_JSON;

    // Execute commands sequentially
    for (const { playerName, order } of orders) {
        const player = await game.getPlayerById(PLAYERS[playerName].id);

        await new PlayGameCommand({ order, player }).execute();
    }

    await signInAction({
        email: USER.email,
        password: USER.password,
        staySignedIn: false,
    });

    // Fetch game data
    const { data: { players } } = await getGameDataAction(game.id, orders.length - 1);
    const { self, opponents } = players;
    
    // Build score map
    const scores = new Map();
    [self, ...opponents].forEach(player => {
        scores.set(player.id, player.score);
    });

    // Verify scoring is correct based on game rules
    expect(scores.get(PLAYERS['PLAYER'].id)).toEqual({
        Military: 0,
        Religion: 1,
        Commerce: 0,
    });

    expect(scores.get(PLAYERS['PLAYER_WITH_MOVE'].id)).toEqual(INIT_SCORE);
    expect(scores.get(PLAYERS['PLAYER_WITH_SWAP'].id)).toEqual(INIT_SCORE);
    expect(scores.get(PLAYERS['PLAYER_WITH_MOVE_AND_SWAP'].id)).toEqual(INIT_SCORE);
});



test(`Caste ties should result in caste piece being discarded (no points made)`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE', 'PLAYER_WITH_SWAP', 'PLAYER_WITH_MOVE_AND_SWAP'], 'PLAYER');

    // Military and religion castes tie
    const orders = TEST_CASTE_TIE_ORDERS_4_PLAYERS_JSON;

    // Execute commands sequentially
    for (const { playerName, order } of orders) {
        const player = await game.getPlayerById(PLAYERS[playerName].id);

        await new PlayGameCommand({ order, player }).execute();
    }

    await signInAction({
        email: USER.email,
        password: USER.password,
        staySignedIn: false,
    });

    // Fetch game data
    const { data: { players } } = await getGameDataAction(game.id, orders.length - 1);
    const { self, opponents } = players;
    
    // Build score map
    const scores = new Map();
    [self, ...opponents].forEach(player => {
        scores.set(player.id, player.score);
    });

    // Verify scoring is correct based on game rules
    expect(scores.get(PLAYERS['PLAYER'].id)).toEqual(INIT_SCORE);
    expect(scores.get(PLAYERS['PLAYER_WITH_MOVE'].id)).toEqual(INIT_SCORE);
    expect(scores.get(PLAYERS['PLAYER_WITH_SWAP'].id)).toEqual(INIT_SCORE);
    expect(scores.get(PLAYERS['PLAYER_WITH_MOVE_AND_SWAP'].id)).toEqual(INIT_SCORE);
});