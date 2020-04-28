import React, { Dispatch } from 'react';
import './DialogTileMoveStart.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import { AppAction } from '../../actions';
import { startTileMove } from '../../actions/GameActions';
import { connect } from 'react-redux';

interface DispatchProps {
    startTileMove: () => void,
}

type Props = DispatchProps

class DialogTileMoveStart extends React.Component<Props, {}> {

    handleAction = () => {
        const { startTileMove } = this.props;

        startTileMove();

        return Promise.resolve();
    }

    render() {

        return (
            <Dialog
                type={DialogType.TileMoveStart}
                headline='Tile Move'
                message='Do you want to move a tile you played somewhere else on the board? If so, select first the tile, then its new location.'
                actionButtonText='Start Move'
                onAction={this.handleAction}
                isActionButtonActive
            />
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    startTileMove: () => dispatch(startTileMove),
});

export default connect(() => ({}), mapDispatchToProps)(DialogTileMoveStart);