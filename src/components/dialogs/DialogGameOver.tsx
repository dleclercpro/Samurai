import React from 'react';
import './DialogGameOver.scss';
import { connect } from 'react-redux';
import { AppState } from '../../types/StateTypes';
import { Player } from '../../types/GameTypes';
import { getWinners } from '../../selectors';
import { DialogType } from '../../types/DialogTypes';
import DialogOK from './DialogOK';

interface StateProps {
    winners: Player[],
}

type Props = StateProps;

class DialogGameOver extends React.Component<Props, {}> {

    render() {
        const { winners } = this.props;
        let message;

        switch (winners.length) {
            case 0:
                message = 'There is no winner.'
                break;
            case 1:
                message = 'The winner is:'
                break;
            default:
                message = 'The winners are:'
                break;
        }

        return (
            <DialogOK
                type={DialogType.GameOver}
                headline='Game Over'
                message={message}
            >
                {winners.map((winner: Player) => (
                    <React.Fragment>
                        <strong>{winner.username}</strong>
                        <br/>
                    </React.Fragment>
                ))}
            </DialogOK>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    winners: getWinners(state.players),
});

export default connect(mapStateToProps, () => ({}))(DialogGameOver);