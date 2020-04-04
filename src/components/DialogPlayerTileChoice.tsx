import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { Size2D, Caste } from '../types/GameTypes';
import './DialogPlayerTileChoice.scss';
import { AppAction } from '../actions';
import { getHexagonalPath } from '../lib';
import Dialog from './Dialog';
import PlayerTile from './PlayerTile';

interface DialogPlayerTileChoiceProps {
    tileSize: Size2D,
    tileStroke: number,
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
        const { tileSize, tileStroke } = this.props;
        const { tilePath } = this.state;
    
        return (
            <Dialog type='player-tile-choice' headline='Player Tile Choice'>
                <section className='text'>
                    <p>This is a test.</p>
                </section>
                <section className='tiles'>
                    <PlayerTile size={tileSize} path={tilePath} stroke={tileStroke} caste={Caste.Military} strength={4} />
                    <PlayerTile size={tileSize} path={tilePath} stroke={tileStroke} caste={Caste.Religion} strength={3} />
                    <PlayerTile size={tileSize} path={tilePath} stroke={tileStroke} caste={Caste.Commerce} strength={2} />
                    <PlayerTile size={tileSize} path={tilePath} stroke={tileStroke} caste={Caste.Religion} strength={1} />
                    <PlayerTile size={tileSize} path={tilePath} stroke={tileStroke} caste={Caste.Religion} strength={0} />
                </section>
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DialogPlayerTileChoice);