import { FULL_HAND_TILE_IDS, HAND_SIZE } from '../../constants';
import { ErrorGameInvalidHandSize } from '../../errors/GameErrors';
import { shuffle } from '../../libs';
import Hand from '../../models/Hand';
import HandDataManager from '../data/HandDataManager';

class HandBuilder {

    public build(tileIds?: number[]) {
        const currentTileIds = tileIds ?? shuffle(FULL_HAND_TILE_IDS).slice(0, HAND_SIZE);
        const handSize = currentTileIds.length;

        if (handSize !== HAND_SIZE) {
            throw new ErrorGameInvalidHandSize(handSize);
        }

        const remainingTileIds = FULL_HAND_TILE_IDS.filter(id => !currentTileIds.includes(id));
        const tiles = [...currentTileIds, ...remainingTileIds].map(i => HandDataManager.getTileById(i));

        return new Hand({
            current: tiles.slice(0, handSize),
            remaining: tiles.slice(handSize),
        });
    }
}

export default HandBuilder;