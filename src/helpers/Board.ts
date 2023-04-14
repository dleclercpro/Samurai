import { BOARD_JSON } from '../config/GameConfig';
import { BoardTileJSON } from '../types/JSONTypes';
import BoardTile from './BoardTile';

enum BoardSection {
    North = 'North',
    Center = 'Center',
    South = 'South',
    CasteSwapTiles = 'CasteSwapTiles',
}

class Board {
    protected tiles: Record<number, BoardTile>;
    protected nPlayers: number;

    public constructor(tiles: Record<number, BoardTile>, nPlayers: number) {
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

    public static async create(nPlayers: number) {
        const boardSections = Object.keys(BOARD_JSON) as BoardSection[];
        
        // Based on number of players, some sections of the full board are
        // left off
        let ignoredSections = [BoardSection.CasteSwapTiles];

        switch (nPlayers) {
            case 2:
                ignoredSections.push(BoardSection.North, BoardSection.South);
                break;
            case 3:
                ignoredSections.push(BoardSection.North);
                break;
            case 4:
                break;
            default:
                throw new Error('Invalid number of players.');
        }

        // Start building board with tiles contained in existing sections based
        // on number of players
        const _tiles = boardSections.reduce((prevTiles: BoardTileJSON[], section: BoardSection) => {
            if (!ignoredSections.includes(section)) {
                return [...prevTiles, ...BOARD_JSON[section]];
            }

            return prevTiles;
        }, []);

        // Finish off by adding caste swapping tiles, also based on number of players
        _tiles.push(...BOARD_JSON[BoardSection.CasteSwapTiles].slice(0, nPlayers));

        // Convert tiles array to map
        // FIXME
        const tiles = _tiles.reduce((prevTiles: Record<number, any>, tile: BoardTileJSON) => {
            return {
                ...prevTiles,
                [tile.id]: tile,
            };
        }, {});

        return new Board(tiles, nPlayers);
    }
}

export default Board;