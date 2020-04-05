import React from 'react';
import { Size2D, Caste, PlayerColor, SpecialCaste } from '../types/GameTypes';
import './DialogPlayerTileChoice.scss';
import { getHexagonalPath } from '../lib';
import Dialog from './Dialog';
import PlayerTile from './PlayerTile';

interface DialogPlayerTileChoiceProps {
    tileSize: Size2D,
    tileStroke: number,
    tileColor: PlayerColor,
}

interface DialogPlayerTileChoiceState {
    tilePath: string,
}

class DialogPlayerTileChoice extends React.Component<DialogPlayerTileChoiceProps, DialogPlayerTileChoiceState> {

    constructor(props: DialogPlayerTileChoiceProps) {
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
                    <PlayerTile id={0} size={tileSize} path={tilePath} stroke={tileStroke} color={tileColor} type={Caste.Military} strength={4} />
                    <PlayerTile id={1} size={tileSize} path={tilePath} stroke={tileStroke} color={tileColor} type={Caste.Religion} strength={3} />
                    <PlayerTile id={2} size={tileSize} path={tilePath} stroke={tileStroke} color={tileColor} type={Caste.Commerce} strength={2} />
                    <PlayerTile id={3} size={tileSize} path={tilePath} stroke={tileStroke} color={tileColor} type={SpecialCaste.Water} strength={1} />
                    <PlayerTile id={4} size={tileSize} path={tilePath} stroke={tileStroke} color={tileColor} type={SpecialCaste.Joker} strength={0} />
                </section>
            </Dialog>
        );
    }
}

export default DialogPlayerTileChoice;