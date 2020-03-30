import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { AppAction } from '../types/ActionTypes';
import { Position2D, TileAssignment } from '../types/GameTypes';
import './Tile.scss';

interface TileProps {
    position: Position2D, // Position of tile in board SVG
    path: string,         // SVG point path of tile
    size: number,         // Number of free spaces for caste pieces
    neighbors: Tile[],    // List of neighbouring tiles
    isCity: boolean,
    isWater: boolean,
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
        const { path, position, isWater } = this.props;

        return (
            <polygon className={`tile ${isWater ? 'tile--water' : ''}`} points={path} transform={`translate(${position.x},${position.y})`}></polygon>
        );
    }
}

const mapStateToProps = (state: AppState) => {

}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(Tile);