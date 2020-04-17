import React from 'react';
import './DialogCreateGame.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import FormCreateGame from '../forms/FormCreateGame';

const DialogCreateGame: React.FC<{}> = () => (
    <Dialog
        type={DialogType.CreateGame}
        headline='Create game'
        message='Provide the following information to create a new game:'
    >
        <FormCreateGame />
    </Dialog>
);

export default DialogCreateGame;