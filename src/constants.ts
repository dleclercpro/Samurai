import { Caste } from './types/GameTypes'

// Tiles
const TILE_ID_SWAP = 18
const TILE_ID_MOVE = 19

// Numbers
const N_FULL_HAND_TILES = 20
const N_HAND_TILES = 5
const N_BOARD_TILES = 174
const N_CASTES = 3

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

const getPiecesCountByCaste = (nPlayers: number) => {
    switch (nPlayers) {
        case 2:
            return 7;
        case 3:
            return 10;
        case 4:
            return 13;
        default:
            throw Error('Wrong number of players.');
    }
}

const getCastePieceCount = (nPlayers: number) => {
    return {
        [Caste.Military]: getPiecesCountByCaste(nPlayers),
        [Caste.Religion]: getPiecesCountByCaste(nPlayers),
        [Caste.Commerce]: getPiecesCountByCaste(nPlayers),
    }
}

// Special tile IDs
const CASTE_SWAP_BOARD_TILE_IDS = [200, 201, 202, 203]

// Initial values
const INIT_SCORE = {
    [Caste.Military]: 0,
    [Caste.Religion]: 0,
    [Caste.Commerce]: 0,
}