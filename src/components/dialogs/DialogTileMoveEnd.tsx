import React from 'react';
import './DialogTileMoveEnd.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { AppState } from '../../types/StateTypes';
import HandTileComponent from '../tiles/HandTileComponent';
import { PlayerColor, HandTile } from '../../types/GameTypes';
import { moveTile } from '../../actions/ServerActions';
import { ThunkDispatch } from 'redux-thunk';
import { endTurn } from '../../actions/GameActions';

interface StateProps {
    from: number,
    to: number,
    tile: HandTile | undefined,
    color: PlayerColor,
}

interface DispatchProps {
    endTurn: () => void,
    moveTile: (boardTileFrom: number, boardTileTo: number) => Promise<any>,
}

type Props = StateProps & DispatchProps;

interface State {
    tile: HandTile | undefined,
}

class DialogTileMoveEnd extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            tile: undefined,
        };
    }

    componentDidUpdate(prevProps: Props) {
        const { tile } = this.props;

        // We store the dialog content locally, so global state
        // changes do not alter it
        if (prevProps.tile === undefined && tile !== undefined) {
            this.setState({
                tile,
            });
        }
    }

    handleCancel = () => {
        const { endTurn } = this.props;

        endTurn();
    }

    handleAction = () => {
        const { from, to, moveTile } = this.props;

        return moveTile(from, to);
    }

    render() {
        const { tile } = this.state;
        const { color } = this.props;

        return (
            <Dialog
                type={DialogType.TileMoveEnd}
                headline='Tile Move Confirmation'
                message='Are you sure you want to move the following tile?'
                actionButtonText='Confirm'
                cancelButtonText='Cancel Move'
                onAction={this.handleAction}
                onCancel={this.handleCancel}
                isActionButtonActive
            >
                {tile !== undefined &&
                    <HandTileComponent
                        key={`hand-tile-component-${tile.id}--dialog-tile-move-end`}
                        id={tile.id}
                        color={color}
                        type={tile.type}
                        strength={tile.strength}
                        canReplay={tile.canReplay}
                        isInDialog
                    />
                }
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { self } = state.players;
    const { move } = state.game.selection;
    const { from, to } = move;
    const { fullHand } = state.data;

    // Get hand tile to move
    const tileId = self.playedTiles.get(from);
    const tile = tileId !== undefined ? fullHand.get(tileId) : undefined;

    return {
        from,
        to,
        tile,
        color: self.color,
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    endTurn: () => dispatch(endTurn),
    moveTile: (boardTileFrom: number, boardTileTo: number) => dispatch(moveTile(boardTileFrom, boardTileTo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogTileMoveEnd);