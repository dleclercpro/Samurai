import React, { Dispatch } from 'react';
import './DialogTileChoice.scss';
import Dialog from './Dialog';
import Hand from './Hand';
import { connect } from 'react-redux';
import { AppAction } from '../actions';
import { deselectBoardTile } from '../actions/BoardActions';
import { deselectHandTile } from '../actions/GameActions';

interface DispatchProps {
    deselectBoardTile: () => void,
    deselectHandTile: () => void,
}

type Props = DispatchProps;

class DialogTileChoice extends React.Component<Props, {}> {

    handleClose = () => {
        const { deselectBoardTile, deselectHandTile } = this.props;

        deselectBoardTile();
        deselectHandTile();
    }

    render() {
        return (
            <Dialog
                type='tile-choice'
                headline='Tile Choice'
                description='Choose which tile to place on the empty space you just clicked on the board.'
                onClose={this.handleClose}
            >
                <Hand isPlayable />
            </Dialog>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    deselectBoardTile: () => dispatch(deselectBoardTile),
    deselectHandTile: () => dispatch(deselectHandTile),
});

export default connect(() => ({}), mapDispatchToProps)(DialogTileChoice);