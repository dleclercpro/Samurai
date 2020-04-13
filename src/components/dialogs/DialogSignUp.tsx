import React from 'react';
import './DialogSignUp.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import FormSignUp from '../forms/FormSignUp';

const DialogSignUp: React.FC<{}> = () => (
    <Dialog
        type={DialogType.SignUp}
        headline='Sign Up'
        description='Provide the following information to sign up:'
        actionButtonText='Sign up'
        onClose={() => {}}
        hideButtons
    >
        <FormSignUp
        
        />
    </Dialog>
);

export default DialogSignUp;