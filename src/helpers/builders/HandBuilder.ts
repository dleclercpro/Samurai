import { FULL_HAND_TILE_IDS, N_HAND_TILES } from '../../constants';
import { shuffle } from '../../libs';
import Hand from '../../models/Hand';
import HandDataManager from '../data/HandDataManager';

class HandBuilder {

    public build(tileIds?: number[]) {
        const currentTileIds = tileIds ?? shuffle(FULL_HAND_TILE_IDS).slice(0, N_HAND_TILES);

        if (currentTileIds.length !== N_HAND_TILES) {
            throw new Error('Invalid number of tiles to build hand from.');
        }

        const remainingTileIds = FULL_HAND_TILE_IDS.filter(id => !currentTileIds.includes(id));
        const tiles = [...currentTileIds, ...remainingTileIds].map(i => HandDataManager.getTileById(i));

        return new Hand({
            current: tiles.slice(0, currentTileIds.length),
            remaining: tiles.slice(currentTileIds.length),
        });
    }
}

export default HandBuilder;