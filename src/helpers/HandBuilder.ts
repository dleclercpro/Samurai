import { N_HAND_TILES } from '../constants';
import { getRange } from '../libs/math';
import Hand from '../models/Hand';
import HandDataManager from './data/HandDataManager';

class HandBuilder {

    public build() {
        return new Hand({
            tiles: getRange(N_HAND_TILES).map(i => HandDataManager.getTile(i)),
        });
    }
}

export default HandBuilder;