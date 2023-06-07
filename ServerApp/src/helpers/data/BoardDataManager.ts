import { BOARD_JSON } from '../../config/GameConfig';
import { BOARD_TILE_SWAP_IDS } from '../../constants';
import { ErrorGameBoardTileDoesNotExist, ErrorGameInvalidPlayerCount } from '../../errors/GameErrors';
import { BoardSection } from '../../types/GameTypes';
import { BoardJSON, BoardTileJSON } from '../../types/JSONTypes';

type TileMap = Record<string, BoardTileJSON>;

/*
    This class is responsible for handling constant details about
    the various board configurations, based on a JSON file.
*/
class BoardDataManager {
    private nPlayers: number;
    private tiles: TileMap;

    public constructor(nPlayers: number) {
        this.nPlayers = nPlayers;
        this.tiles = {};

        this.loadTilesFromJSON();
        this.removeMissingNeighbors();
    }

    // PRIVATE METHODS
    private loadTilesFromJSON() {
        const excludedSections = this.getExcludedSections();

        // Load board from JSON file
        this.tiles = (BOARD_JSON as BoardJSON)
            .reduce((prevTiles, tile) => {
                if (tile.sections.every(section => excludedSections.includes(section))) {
                    return prevTiles;
                }

                return {
                    ...prevTiles,
                    [tile.id]: tile,
                };

            }, {} as TileMap);
    }

    private getExcludedSections() {
        let excludedSections = [];

        // Remove tiles from board based on player count
        switch (this.nPlayers) {
            case 2:
                excludedSections.push(BoardSection.North, BoardSection.South);
                break;
            case 3:
                excludedSections.push(BoardSection.North);
                break;
            case 4:
                break;
            default:
                throw new ErrorGameInvalidPlayerCount(this.nPlayers);
        }

        return excludedSections;
    }

    private removeMissingNeighbors() {
        const tileIds = Object.keys(this.tiles).map(Number);
        
        // Remove non-existing tile IDs from neighborhoods (i.e. not all tiles are present
        // in all board configurations, depending on the player count)
        tileIds.forEach(tileId => {
            const { neighbors } = this.tiles[tileId];

            this.tiles[tileId].neighbors = neighbors.filter(id => tileIds.includes(id))
        });
    }



    // PUBLIC METHODS
    public getTiles() {
        return Object.values(this.tiles);
    }

    public getPlayableTiles() {
        return this.getTiles().filter(tile => !BOARD_TILE_SWAP_IDS.includes(tile.id));
    }

    public getSwapTiles() {
        return BOARD_TILE_SWAP_IDS
            .slice(0, this.nPlayers)
            .map(id => this.getTileById(id));
    }

    public getCities() {
        return this.getTiles().filter(tile => tile.castes > 0);
    }

    public getTileById(id: number) {
        const tile = this.getTiles().find(tile => tile.id === id);

        if (!tile) {
            throw new ErrorGameBoardTileDoesNotExist(id);
        }

        return tile;
    }

    public getTileTypeById(id: number) {
        return this.getTileById(id).type;
    }

    public getTileSectionsById(id: number) {
        return this.getTileById(id).sections;
    }

    public getTileCoordinatesById(id: number) {
        return this.getTileById(id).coordinates;
    }

    public getTileNeighborsById(id: number) {
        return this.getTileById(id).neighbors.map(tileId => this.getTileById(tileId));
    }
}

export default BoardDataManager;