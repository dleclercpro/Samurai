import React from 'react';
import './DialogPlayGame.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import FormPlayGame from '../forms/FormPlayGame';

const DialogPlayGame: React.FC<{}> = () => (
    <Dialog
        type={DialogType.PlayGame}
        headline='Play game'
        message='Please enter the ID of the game you want to play in:'
    >
        <FormPlayGame />
    </Dialog>
);

export default DialogPlayGame;