import React from 'react';
import './DialogGameOver.scss';
import Dialog from './Dialog';
import { connect } from 'react-redux';
import { AppState } from '../../types/StateTypes';
import { Player } from '../../types/GameTypes';
import { getWinners } from '../../selectors';
import { DialogType } from '../../types/DialogTypes';

interface StateProps {
    winners: Player[],
}

type Props = StateProps;

class DialogGameOver extends React.Component<Props, {}> {

    render() {
        const { winners } = this.props;
        let description;

        switch (winners.length) {
            case 0:
                description = 'There is no winner.'
                break;
            case 1:
                description = 'The winner is:'
                break;
            default:
                description = 'The winners are:'
                break;
        }

        return (
            <Dialog
                type={DialogType.GameOver}
                headline='Game Over'
                description={description}
                cancelButtonText={'OK'}
            >
                {winners.map((winner: Player) => (
                    <React.Fragment>
                        <strong>{winner.username}</strong>
                        <br/>
                    </React.Fragment>
                ))}
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    winners: getWinners(state.player),
});

export default connect(mapStateToProps, () => ({}))(DialogGameOver);