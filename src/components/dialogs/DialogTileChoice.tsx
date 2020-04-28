import React from 'react';
import './DialogTileChoice.scss';
import Dialog from './Dialog';
import Hand from '../Hand';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { deselectBoardTile, deselectHandTile } from '../../actions/GameActions';
import { DialogType } from '../../types/DialogTypes';
import { AppState } from '../../types/StateTypes';
import { TilePlayStep, HandTile } from '../../types/GameTypes';
import { playTile } from '../../actions/ServerActions';
import { ThunkDispatch } from 'redux-thunk';
import { getHandTiles } from '../../selectors';

interface StateProps {
    handTile: number,
    boardTile: number,
    tiles: HandTile[],
    isChoosing: boolean,
    hasChosen: boolean,
    isActionButtonActive: boolean,
}

interface DispatchProps {
    deselectBoardTile: () => void,
    deselectHandTile: () => void,
    playTile: (handTile: number, boardTile: number) => Promise<any>,
}

type Props = StateProps & DispatchProps;

interface State {
    tiles: HandTile[],
}

class DialogTileChoice extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            tiles: [],
        };
    }

    componentDidUpdate(prevProps: Props) {
        const { tiles } = this.props;

        // We store the dialog content locally, so global state
        // changes do not alter it
        if (prevProps.tiles.length === 0 && tiles.length > 0) {
            this.setState({
                tiles,
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
        const { tiles } = this.state;

        return (
            <Dialog
                type={DialogType.TileChoice}
                headline='Tile Choice'
                message='Choose which tile to place on the empty space you just clicked:'
                actionButtonText='Choose'
                onAction={this.handleAction}
                onCancel={this.handleCancel}
                isActionButtonActive={isActionButtonActive}
            >
                {tiles &&
                    <Hand
                        tiles={tiles}
                        inDialog={DialogType.TileChoice}
                    />
                }
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { step, selection } = state.game;

    const isChoosing = step === TilePlayStep.ChooseHandTile;
    const hasChosen = step === TilePlayStep.Done;
    const isActionButtonActive = step === TilePlayStep.Done;

    return {
        handTile: selection.play.handTile,
        boardTile: selection.play.boardTile,
        tiles: getHandTiles(state),
        isChoosing,
        hasChosen,
        isActionButtonActive,
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    deselectBoardTile: () => dispatch(deselectBoardTile),
    deselectHandTile: () => dispatch(deselectHandTile),
    playTile: (handTile: number, boardTile: number) => dispatch(playTile(handTile, boardTile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogTileChoice);