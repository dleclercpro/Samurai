import React, { Dispatch } from 'react';
import './DialogTileChoice.scss';
import Dialog from './Dialog';
import Hand from './Hand';
import { connect } from 'react-redux';
import { AppAction } from '../actions';
import { deselectBoardTile } from '../actions/BoardActions';
import { deselectHandTile } from '../actions/GameActions';
import { DialogType } from '../types/DialogTypes';
import Button from './Button';
import { AppState } from '../types/StateTypes';
import { PlayerTile } from '../types/GameTypes';

interface StateProps {
    hand: PlayerTile[],
    isActive: boolean,
}

interface DispatchProps {
    deselectBoardTile: () => void,
    deselectHandTile: () => void,
}

type Props = StateProps & DispatchProps;

class DialogTileChoice extends React.Component<Props, {}> {

    handleClose = () => {
        const { deselectBoardTile, deselectHandTile } = this.props;

        deselectBoardTile();
        deselectHandTile();
    }

    getActionButton = () => {
        const { isActive } = this.props;

        return (
            <Button isActive={isActive} action={() => {}}>Choose</Button>
        );
    }

    render() {
        const { hand } = this.props;

        return (
            <Dialog
                type={DialogType.TileChoice}
                headline='Tile Choice'
                description='Choose which tile to place on the empty space you just clicked:'
                onClose={this.handleClose}
                actionButton={this.getActionButton()}
            >
                {hand && <Hand isInDialog />}
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    hand: state.game.hand,
    isActive: state.game.selectedTileID !== -1 && state.board.selectedTileID !== -1,
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    deselectBoardTile: () => dispatch(deselectBoardTile),
    deselectHandTile: () => dispatch(deselectHandTile),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogTileChoice);