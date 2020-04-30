import React from 'react';
import './DialogNewTurn.scss';
import { DialogType } from '../../types/DialogTypes';
import DialogOK from './DialogOK';

const DialogNewTurn: React.FC = () => (
    <DialogOK
        type={DialogType.NewTurn}
        headline='New turn'
        message={"It's your turn to play!"}
    />
);

export default DialogNewTurn;