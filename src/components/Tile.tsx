import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { Position2D, TileAssignment } from '../types/GameTypes';
import './Tile.scss';
import { AppAction } from '../actions';
import { openDialog } from '../actions/DialogActions';

interface TileProps {
    position: Position2D, // Position of tile in board SVG
    path: string,         // SVG point path of tile
    size: number,         // Number of free spaces for caste pieces
    neighbors: Tile[],    // List of neighbouring tiles
    isCity: boolean,
    isWater: boolean,
    openDialog: () => void,
}

interface TileState {
    assignment: TileAssignment | null,    
}

class Tile extends React.Component<TileProps, TileState> {

    constructor(props: TileProps) {
        super(props);

        this.state = {
            assignment: null,
        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    render() {
        const { path, position, isWater, openDialog } = this.props;

        return (
            <polygon
                className={`tile ${isWater ? 'tile--water' : ''}`}
                points={path}
                transform={`translate(${position.x},${position.y})`}
                onClick={openDialog} />
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    
})

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    openDialog: () => dispatch(openDialog),
})

export default connect(mapStateToProps, mapDispatchToProps)(Tile);