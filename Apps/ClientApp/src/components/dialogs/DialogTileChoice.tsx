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
import i18n from '../../i18n';

interface StateProps {
    handTile: number,
    boardTile: number,
    hand: HandTile[],
    color: PlayerColor,
    isChoosing: boolean,
    hasChosen: boolean,
    isActionButtonActive: boolean,
    isOpen: boolean,
    language: i18n,
}

interface DispatchProps {
    deselectBoardTile: () => void,
    deselectHandTile: () => void,
    playTile: (handTile: number, boardTile: number) => Promise<any>,
}

type Props = StateProps & DispatchProps;

interface State {
    hand: HandTile[],
    color: PlayerColor,
}

class DialogTileChoice extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            hand: [],
            color: PlayerColor.Unknown,
        };
    }

    componentDidUpdate(prevProps: Props) {
        const { isOpen, hand, color } = this.props;

        // We set its content when opening dialog, so store
        // changes do not alter it
        if (!prevProps.isOpen && isOpen) {
            this.setState({
                hand,
                color,
            });
        }
    }

    handleCancel = () => {
        const { isChoosing, hasChosen, deselectBoardTile, deselectHandTile } = this.props;

        if (hasChosen) {
            deselectHandTile();
            deselectBoardTile();
        }
        if (isChoosing) {
            deselectBoardTile();
        }
    }

    handleAction = () => {
        const { handTile, boardTile, playTile } = this.props;

        return playTile(handTile, boardTile);
    }

    render() {
        const { isActionButtonActive, language } = this.props;
        const { hand, color } = this.state;

        return (
            <Dialog
                type={DialogType.TileChoice}
                headline={language.getText('TILE_CHOICE')}
                message={language.getText('TILE_CHOICE_MESSAGE')}
                actionButtonText={language.getText('CHOOSE')}
                onAction={this.handleAction}
                onCancel={this.handleCancel}
                isActionButtonActive={isActionButtonActive}
            >
                {hand &&
                    <Hand
                        tiles={hand}
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
    const { language } = state.settings;

    const isChoosing = step === TilePlayStep.ChooseHandTile;
    const hasChosen = step === TilePlayStep.Done;
    const isActionButtonActive = step === TilePlayStep.Done;

    return {
        handTile: selection.play.handTile,
        boardTile: selection.play.boardTile,
        hand: getHandTiles(state),
        color: self.color,
        isChoosing,
        hasChosen,
        isActionButtonActive,
        isOpen: state.dialog[DialogType.TileChoice].isOpen,
        language,
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    deselectBoardTile: () => dispatch(deselectBoardTile),
    deselectHandTile: () => dispatch(deselectHandTile),
    playTile: (handTile: number, boardTile: number) => dispatch(playTile(handTile, boardTile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogTileChoice);