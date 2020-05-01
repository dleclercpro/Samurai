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

    getMessage = () => {
        const { winners } = this.props;

        switch (winners.length) {
            case 0:
                return 'There is no winner.';
            case 1:
                return `The winner is: ${winners[0].username}`;
            default:
                return `The winners are: ${winners.reduce((result, winner, i) => {
                    const { username } = winner;

                    return result + ((i + 1 === winners.length) ? username : username + ', ');
                }, '')}`;
        }
    }

    render() {
        return (
            <DialogOK
                type={DialogType.GameOver}
                headline='Game Over'
                message={this.getMessage()}
            >
            </DialogOK>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    winners: getWinners(state.players),
});

export default connect(mapStateToProps, () => ({}))(DialogGameOver);