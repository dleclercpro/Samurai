import React from 'react';
import './DialogTileChoice.scss';
import Dialog from './Dialog';
import Hand from '../Hand';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { deselectBoardTile, deselectHandTile } from '../../actions/GameActions';
import { DialogType } from '../../types/DialogTypes';
import { AppState } from '../../types/StateTypes';
import { TilePlayStep, HandTile, PlayerColor } from '../../types/GameTypes';
import { playTile } from '../../actions/ServerActions';
import { ThunkDispatch } from 'redux-thunk';
import { getHandTiles } from '../../selectors';
import i18n from '../../translator';

interface StateProps {
    handTile: number,
    boardTile: number,
    tiles: HandTile[],
    color: PlayerColor,
    isChoosing: boolean,
    hasChosen: boolean,
    isActionButtonActive: boolean,
    isOpen: boolean,
}

interface DispatchProps {
    deselectBoardTile: () => void,
    deselectHandTile: () => void,
    playTile: (handTile: number, boardTile: number) => Promise<any>,
}

type Props = StateProps & DispatchProps;

interface State {
    tiles: HandTile[],
    color: PlayerColor,
}

class DialogTileChoice extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            tiles: [],
            color: PlayerColor.Unknown,
        };
    }

    componentDidUpdate(prevProps: Props) {
        const { isOpen, tiles, color } = this.props;

        // We set its content when opening dialog, so store
        // changes do not alter it
        if (!prevProps.isOpen && isOpen) {
            this.setState({
                tiles,
                color,
            });
        }
    }

    handleCancel = () => {
        const { isChoosing, hasChosen, deselectBoardTile, deselectHandTile } = this.props;

        hasChosen && deselectHandTile() && deselectBoardTile();
        isChoosing && deselectBoardTile();
    }

    handleAction = () => {
        const { handTile, boardTile, playTile } = this.props;

        return playTile(handTile, boardTile);
    }

    render() {
        const { isActionButtonActive } = this.props;
        const { tiles, color } = this.state;

        return (
            <Dialog
                type={DialogType.TileChoice}
                headline={i18n.getText('TILE_CHOICE')}
                message={i18n.getText('TILE_CHOICE_MESSAGE')}
                actionButtonText={i18n.getText('CHOOSE')}
                onAction={this.handleAction}
                onCancel={this.handleCancel}
                isActionButtonActive={isActionButtonActive}
            >
                {tiles &&
                    <Hand
                        tiles={tiles}
                        color={color}
                        inDialog={DialogType.TileChoice}
                    />
                }
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { step, selection } = state.game;
    const { self } = state.players;

    const isChoosing = step === TilePlayStep.ChooseHandTile;
    const hasChosen = step === TilePlayStep.Done;
    const isActionButtonActive = step === TilePlayStep.Done;

    return {
        handTile: selection.play.handTile,
        boardTile: selection.play.boardTile,
        tiles: getHandTiles(state),
        color: self.color,
        isChoosing,
        hasChosen,
        isActionButtonActive,
        isOpen: state.dialog[DialogType.TileChoice].isOpen,
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    deselectBoardTile: () => dispatch(deselectBoardTile),
    deselectHandTile: () => dispatch(deselectHandTile),
    playTile: (handTile: number, boardTile: number) => dispatch(playTile(handTile, boardTile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogTileChoice);