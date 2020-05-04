import React from 'react';
import './DashHome.scss';
import LanguageButton from './LanguageButton';
import { Language } from '../../types/GameTypes';

const DashHome: React.FC = () => (
    <div id='dash-home'>
        <LanguageButton language={Language.EN} />
        <LanguageButton language={Language.DE} />
        <LanguageButton language={Language.FR} />
    </div>
);

export default DashHome;