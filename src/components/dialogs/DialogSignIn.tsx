import React from 'react';
import './DialogSignIn.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import FormSignIn from '../forms/FormSignIn';

const DialogSignIn: React.FC<{}> = () => (
    <Dialog
        type={DialogType.SignIn}
        headline='Sign in'
        actionButtonText='Sign in'
    >
        <FormSignIn />
    </Dialog>
);

export default DialogSignIn;