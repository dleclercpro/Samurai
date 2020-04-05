import React from 'react';
import { Size2D, TileType, PlayerColor } from '../types/GameTypes';
import './DialogPlayerTileChoice.scss';
import { getHexagonalPath } from '../lib';
import Dialog from './Dialog';
import PlayerTileComponent from './PlayerTileComponent';

interface Props {
    tileSize: Size2D,
    tileStroke: number,
    tileColor: PlayerColor,
}

interface State {
    tilePath: string,
}

class DialogPlayerTileChoice extends React.Component<Props, State> {

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
        const { tileSize, tileStroke, tileColor } = this.props;
        const { tilePath } = this.state;
    
        return (
            <Dialog type='player-tile-choice' headline='Player Tile Choice'>
                <section className='text'>
                    <p>This is a test.</p>
                </section>
                <section className='tiles'>
                    <PlayerTileComponent id={0} size={tileSize} path={tilePath} stroke={tileStroke} color={tileColor} type={TileType.Military} strength={4} />
                    <PlayerTileComponent id={1} size={tileSize} path={tilePath} stroke={tileStroke} color={tileColor} type={TileType.Religion} strength={3} />
                    <PlayerTileComponent id={2} size={tileSize} path={tilePath} stroke={tileStroke} color={tileColor} type={TileType.Commerce} strength={2} />
                    <PlayerTileComponent id={3} size={tileSize} path={tilePath} stroke={tileStroke} color={tileColor} type={TileType.Boat} strength={1} />
                    <PlayerTileComponent id={4} size={tileSize} path={tilePath} stroke={tileStroke} color={tileColor} type={TileType.Joker} strength={0} />
                </section>
            </Dialog>
        );
    }
}

export default DialogPlayerTileChoice;