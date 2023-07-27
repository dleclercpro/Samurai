import React, { Dispatch } from 'react';
import './DialogTileMoveStart.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import { AppAction } from '../../actions';
import { startTileMove } from '../../actions/GameActions';
import { connect } from 'react-redux';
import i18n from '../../i18n';
import { AppState } from '../../types/StateTypes';

interface StateProps {
    language: i18n,
}

interface DispatchProps {
    startTileMove: () => void,
}

type Props = StateProps & DispatchProps

class DialogTileMoveStart extends React.Component<Props, {}> {

    handleAction = () => {
        const { startTileMove } = this.props;

        startTileMove();

        return Promise.resolve();
    }

    render() {
        const { language } = this.props;

        return (
            <Dialog
                type={DialogType.TileMoveStart}
                headline={language.getText('TILE_MOVE')}
                message={language.getText('TILE_MOVE_MESSAGE')}
                actionButtonText={language.getText('START_MOVE')}
                onAction={this.handleAction}
                onCancel={() => {}}
                isActionButtonActive
            />
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { language } = state.settings;

    return {
        language,
    };
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    startTileMove: () => dispatch(startTileMove),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogTileMoveStart);