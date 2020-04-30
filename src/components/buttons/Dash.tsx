import React from 'react';
import './Dash.scss';
import HomeButton from './HomeButton';
import SwitchColorModeButton from './SwitchColorModeButton';

const Dash: React.FC = () => (
    <div id='dash'>
        <HomeButton />
        <SwitchColorModeButton />
    </div>
);

export default Dash;