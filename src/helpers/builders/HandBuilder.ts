import { N_FULL_HAND_TILES, N_HAND_TILES } from '../../constants';
import { shuffle } from '../../libs';
import { getRange } from '../../libs/math';
import Hand from '../../models/Hand';
import HandDataManager from '../data/HandDataManager';

class HandBuilder {

    public build() {
        const tiles = shuffle(getRange(N_FULL_HAND_TILES)).map(i => HandDataManager.getTile(i));

        return new Hand({
            current: tiles.slice(0, N_HAND_TILES),
            remaining: tiles.slice(N_HAND_TILES),
        });
    }
}

export default HandBuilder;