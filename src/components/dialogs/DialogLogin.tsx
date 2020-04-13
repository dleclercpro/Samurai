import React from 'react';
import './DialogLogin.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import FormLogin from '../forms/FormLogin';

const DialogLogin: React.FC<{}> = () => (
    <Dialog
        type={DialogType.Login}
        headline='Login'
        actionButtonText='Log in'
    >
        <FormLogin />
    </Dialog>
);

export default DialogLogin;