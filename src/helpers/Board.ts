import BoardTile from './BoardTile';

export enum BoardSection {
    North = 'North',
    Center = 'Center',
    South = 'South',
    SwapTiles = 'SwapTiles', // Reserved spot for played hand tiles associated with caste swaps
}

type TileMap = Record<string, BoardTile>;

class Board {
    protected tiles: TileMap;
    protected nPlayers: number;

    public constructor(tiles: TileMap, nPlayers: number) {
        this.tiles = tiles;
        this.nPlayers = nPlayers;
    }

    public getTiles() {
        return this.tiles;
    }

    public getTileById(id: number) {
        const tile = this.tiles[id];
        
        if (tile) {
            return tile;
        }

        throw new Error(`Tile with ID ${id} does not exist.`);
    }
}

export default Board;