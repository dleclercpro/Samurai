import { PLAYERS, PLAYER_NAMES, USER, afterAllPlay, afterEachPlay, beforeAllPlay, beforeEachPlay, createGame } from '.';
import PlayGameCommand from '../../../src/commands/game/PlayGameCommand';
import { TEST_ORDERS_4_PLAYERS_JSON } from '../../../src/config/TestConfig';
import { signInAction } from '../../actions/AuthActions';
import { getGameDataAction } from '../../actions/GameActions';



beforeAll(beforeAllPlay);
beforeEach(beforeEachPlay);
afterAll(afterAllPlay);
afterEach(afterEachPlay);



test(`Test ... should work`, async () => {
    const game = await createGame(PLAYER_NAMES, 'PLAYER');

    // Execute commands sequentially
    for (const { playerName, order } of TEST_ORDERS_4_PLAYERS_JSON) {
        const player = await game.getPlayerById(PLAYERS[playerName].id);

        await new PlayGameCommand({ order, player }).execute();
    }

    await signInAction({
        email: USER.email,
        password: USER.password,
        staySignedIn: false,
    });

    // Fetch game data
    const { data: { players } } = await getGameDataAction(game.id, TEST_ORDERS_4_PLAYERS_JSON.length - 1);
    const { self, opponents } = players;
    
    // Build score map
    const scores = new Map();
    [self, ...opponents].forEach(player => {
        scores.set(player.id, player.score);
    });

    // Verify scoring is correct based on game rules
    expect(scores.get(PLAYERS['PLAYER'].id)).toEqual({
        'Military': 0,
        'Religion': 1,
        'Commerce': 0,
    });
    
    expect(scores.get(PLAYERS['PLAYER_WITH_MOVE'].id)).toEqual({
        'Military': 1,
        'Religion': 0,
        'Commerce': 1,
    });

    expect(scores.get(PLAYERS['PLAYER_WITH_SWAP'].id)).toEqual({
        'Military': 0,
        'Religion': 0,
        'Commerce': 0,
    });

    expect(scores.get(PLAYERS['PLAYER_WITH_MOVE_AND_SWAP'].id)).toEqual({
        'Military': 0,
        'Religion': 0,
        'Commerce': 0,
    });
});