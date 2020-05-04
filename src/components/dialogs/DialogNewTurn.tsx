import React from 'react';
import './DialogNewTurn.scss';
import { DialogType } from '../../types/DialogTypes';
import DialogOK from './DialogOK';
import { connect } from 'react-redux';
import { AppState } from '../../types/StateTypes';
import { FULL_HAND_SIZE } from '../../constants';
import i18n from '../../i18n';

interface StateProps {
    nTilesLeft: number,
    language: i18n,
}

type Props = StateProps;

class DialogNewTurn extends React.Component<Props> {
    
    render() {
        const { nTilesLeft, language } = this.props;

        return (
            <DialogOK
                type={DialogType.NewTurn}
                headline={language.getText('NEW_TURN')}
                message={language.getText('NEW_TURN_MESSAGE', { nTilesLeft })}
            />
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const nPlayedTiles = state.players.self.playedTiles.size;
    const { language } = state.user;
    
    return {
        nTilesLeft: FULL_HAND_SIZE - nPlayedTiles,
        language,
    };
};

export default connect(mapStateToProps, () => ({}))(DialogNewTurn);