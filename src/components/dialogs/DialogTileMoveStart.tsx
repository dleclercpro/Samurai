import React, { Dispatch } from 'react';
import './DialogTileMoveStart.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import { AppAction } from '../../actions';
import { startTileMove } from '../../actions/GameActions';
import { connect } from 'react-redux';
import i18n from '../../translator';

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
                headline={i18n.getText('TILE_MOVE')}
                message={i18n.getText('TILE_MOVE_MESSAGE')}
                actionButtonText={i18n.getText('START_MOVE')}
                onAction={this.handleAction}
                onCancel={() => {}}
                isActionButtonActive
            />
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    startTileMove: () => dispatch(startTileMove),
});

export default connect(() => ({}), mapDispatchToProps)(DialogTileMoveStart);