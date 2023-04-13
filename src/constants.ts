// Tiles
export const TILE_ID_SWAP = 18
export const TILE_ID_MOVE = 19

// Numbers
export const N_FULL_HAND_TILES = 20
export const N_HAND_TILES = 5
export const N_BOARD_TILES = 174

// Functions
const getCityCount = (nPlayers: number) => {
    switch (nPlayers) {
        case 2:
            return 17;
        case 3:
            return 26;
        case 4:
            return 34;
        default:
            throw Error('Wrong number of players.');
    }
}

// Special tile IDs
export const CASTE_SWAP_BOARD_TILE_IDS = [200, 201, 202, 203]