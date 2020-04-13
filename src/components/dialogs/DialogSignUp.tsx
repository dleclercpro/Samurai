import React from 'react';
import './DialogSignUp.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import FormSignUp from '../forms/FormSignUp';

const DialogSignUp: React.FC<{}> = () => (
    <Dialog
        type={DialogType.SignUp}
        headline='Sign up'
        message='Provide the following information to register as a user:'
        actionButtonText='Sign up'
    >
        <FormSignUp />
    </Dialog>
);

export default DialogSignUp;