import React from 'react';
import './DialogNewTurn.scss';
import { DialogType } from '../../types/DialogTypes';
import DialogOK from './DialogOK';
import { connect } from 'react-redux';
import { AppState } from '../../types/StateTypes';
import { FULL_HAND_SIZE } from '../../constants';
import i18n from '../../i18n';
import { FX_SOUND_NEW_TURN } from '../../config';

interface StateProps {
    nTilesLeft: number,
    isOpen: boolean,
    language: i18n,
}

type Props = StateProps;

class DialogNewTurn extends React.Component<Props> {

    private sound: HTMLAudioElement;

    constructor(props: Props) {
        super(props);

        this.sound = new Audio(FX_SOUND_NEW_TURN);
    }

    componentDidUpdate(prevProps: Props) {
        const { isOpen } = this.props;

        if (!prevProps.isOpen && isOpen) {
            this.sound.play().catch((e) => { });
        }
    }
    
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
    const { isOpen } = state.dialog[DialogType.NewTurn];
    const { language } = state.settings;
    
    return {
        nTilesLeft: FULL_HAND_SIZE - nPlayedTiles,
        isOpen,
        language,
    };
};

export default connect(mapStateToProps)(DialogNewTurn);