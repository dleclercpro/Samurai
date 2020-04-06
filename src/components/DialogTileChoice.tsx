import React, { Dispatch } from 'react';
import './DialogTileChoice.scss';
import Dialog from './Dialog';
import Hand from './Hand';
import { connect } from 'react-redux';
import { AppAction } from '../actions';
import { deselectBoardTile } from '../actions/BoardActions';
import { deselectPlayerTile } from '../actions/PlayerActions';

interface DispatchProps {
    deselectBoardTile: () => void,
    deselectPlayerTile: () => void,
}

type Props = DispatchProps;

class DialogTileChoice extends React.Component<Props, {}> {

    handleClose = () => {
        const { deselectBoardTile, deselectPlayerTile } = this.props;

        deselectBoardTile();
        deselectPlayerTile();
    }

    render() {
        return (
            <Dialog type='tile-choice' headline='Tile Choice' onClose={this.handleClose}>
                <section className='text'>
                    <p>This is a test.</p>
                </section>
                <section className='content'>
                    <Hand isPlayable />
                </section>
            </Dialog>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    deselectBoardTile: () => dispatch(deselectBoardTile),
    deselectPlayerTile: () => dispatch(deselectPlayerTile),
});

export default connect(() => ({}), mapDispatchToProps)(DialogTileChoice);