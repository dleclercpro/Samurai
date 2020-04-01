import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { Coordinates2D } from '../types/GameTypes';
import './Tile.scss';
import { AppAction } from '../actions';
import { openDialog } from '../actions/DialogActions';

interface TileProps {
    position: Coordinates2D, // Position of tile in board (in pixels)
    path: string,            // SVG path of tile
    spaces: string[],        // Free spaces for caste pieces
    isWater: boolean,
    
    openDialog: () => void,
}

interface TileState {
    
}

class Tile extends React.Component<TileProps, TileState> {

    render() {
        const { path, position, spaces, isWater, openDialog } = this.props;
        const className = `tile ${isWater ? 'tile--water' : ''}`;
        const transform = `translate(${position.x},${position.y})`;
    
        return (
            <polygon
                className={className}
                points={path}
                transform={transform}
                onClick={openDialog}
            >
                {spaces.length}
            </polygon>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    
})

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    openDialog: () => dispatch(openDialog),
})

export default connect(mapStateToProps, mapDispatchToProps)(Tile);