import React from 'react';
import { Size2D, PlayerColor, PlayerTile } from '../types/GameTypes';
import './Hand.scss';
import { getHexagonalPath } from '../lib';
import PlayerTileComponent from './PlayerTileComponent';
import { AppState } from '../types/StateTypes';
import { connect } from 'react-redux';

interface OwnProps {
    tileSize: Size2D,
    tileStroke: number,
}

interface StateProps {
    hand: PlayerTile[],
    color: PlayerColor,
}

type Props = OwnProps & StateProps;

interface State {
    tilePath: string,
}

class Hand extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            tilePath: '',
        }
    }

    componentDidMount() {
        const { tileSize, tileStroke } = this.props;

        this.setState({
            tilePath: getHexagonalPath(tileSize, tileStroke),
        });
    }

    render() {
        const { hand, color, tileSize, tileStroke } = this.props;
        const { tilePath } = this.state;
    
        return hand.map((tile: PlayerTile) => {
            const { id, type, strength, canReplay } = tile;
            
            return (
                <PlayerTileComponent id={id} size={tileSize} path={tilePath} stroke={tileStroke} color={color} type={type} strength={strength} canReplay={canReplay} />
            );
        });
    }
}

const mapStateToProps = (state: AppState) => ({
    hand: state.player.hand,
    color: state.player.color,
});

export default connect(mapStateToProps, () => ({}))(Hand);