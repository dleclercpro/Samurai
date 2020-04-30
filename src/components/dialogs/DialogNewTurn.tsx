import React from 'react';
import './DialogNewTurn.scss';
import { DialogType } from '../../types/DialogTypes';
import DialogOK from './DialogOK';
import { connect } from 'react-redux';
import { AppState } from '../../types/StateTypes';
import { FULL_HAND_SIZE } from '../../constants';

interface StateProps {
    nTilesLeft: number,
}

type Props = StateProps;

class DialogNewTurn extends React.Component<Props> {
    
    render() {
        const { nTilesLeft } = this.props;

        return (
            <DialogOK
                type={DialogType.NewTurn}
                headline='New turn'
                message={`It's your turn to play! You have ${nTilesLeft} tiles left to play.`}
            />
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const nPlayedTiles = state.players.self.playedTiles.size;
    
    return {
        nTilesLeft: FULL_HAND_SIZE - nPlayedTiles,
    };
};

export default connect(mapStateToProps, () => ({}))(DialogNewTurn);