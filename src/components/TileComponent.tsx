import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { Coordinates2D, Caste } from '../types/GameTypes';
import './TileComponent.scss';
import { AppAction } from '../actions';
import { openDialog } from '../actions/DialogActions';

interface TileComponentProps {
    position: Coordinates2D, // Position of tile in board (in pixels)
    path: string,            // SVG path of tile
    spaces: Caste[],         // Free spaces for caste pieces
    isWater: boolean,
    
    openDialog: () => void,
}

interface TileComponentState {
    
}

class TileComponent extends React.Component<TileComponentProps, TileComponentState> {

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

export default connect(mapStateToProps, mapDispatchToProps)(TileComponent);