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
import i18n from '../../i18n';

interface StateProps {
    from: number,
    to: number,
    tile: HandTile | undefined,
    color: PlayerColor,
    isOpen: boolean,
    language: i18n,
}

interface DispatchProps {
    endTurn: () => void,
    moveTile: (boardTileFrom: number, boardTileTo: number) => Promise<any>,
}

type Props = StateProps & DispatchProps;

interface State {
    tile: HandTile | undefined,
    color: PlayerColor,
}

class DialogTileMoveEnd extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            tile: undefined,
            color: PlayerColor.Unknown,
        };
    }

    componentDidUpdate(prevProps: Props) {
        const { isOpen, tile, color } = this.props;

        // We set its content when opening dialog, so store
        // changes do not alter it
        if (!prevProps.isOpen && isOpen) {
            this.setState({
                tile,
                color,
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
        const { language } = this.props;
        const { tile, color } = this.state;

        return (
            <Dialog
                type={DialogType.TileMoveEnd}
                headline={language.getText('TILE_MOVE_CONFIRMATION')}
                message={language.getText('TILE_MOVE_CONFIRMATION_MESSAGE')}
                actionButtonText={language.getText('CONFIRM')}
                cancelButtonText={language.getText('CANCEL_MOVE')}
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
                        replay={tile.replay}
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
    const { full } = state.hand;
    const { language } = state.settings;

    // Get hand tile to move
    const tileId = self.playedTiles.get(move.from);
    const tile = tileId !== undefined ? full.get(tileId) : undefined;

    return {
        tile,
        from: move.from,
        to: move.to,
        color: self.color,
        isOpen: state.dialog[DialogType.TileMoveEnd].isOpen,
        language,
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    endTurn: () => dispatch(endTurn),
    moveTile: (boardTileFrom: number, boardTileTo: number) => dispatch(moveTile(boardTileFrom, boardTileTo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogTileMoveEnd);