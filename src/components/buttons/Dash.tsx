import React from 'react';
import './Dash.scss';
import HomeButton from './HomeButton';
import SwitchColorModeButton from './SwitchColorModeButton';
import RefreshButton from './RefreshButton';

const Dash: React.FC = () => (
    <div id='dash'>
        <HomeButton />
        <RefreshButton />
        <SwitchColorModeButton />
    </div>
);

export default Dash;