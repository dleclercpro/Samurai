import React from 'react';
import './DialogTileSwitch.scss';
import Dialog from './Dialog';
import { DialogType } from '../types/DialogTypes';
import Button from './Button';

class DialogTileSwitch extends React.Component<{}, {}> {

    handleClose = () => {

    }

    getActionButton = () => {
        return (
            <Button isActive action={() => {}}>Switch</Button>
        );
    }

    render() {
        return (
            <Dialog
                type={DialogType.TileSwitch}
                headline='Tile Switch'
                description='Do you want to switch two of your tiles?'
                onClose={this.handleClose}
                actionButton={this.getActionButton()}
            >
            </Dialog>
        );
    }
}

export default DialogTileSwitch;