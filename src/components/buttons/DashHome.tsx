import React from 'react';
import './DashHome.scss';
import LanguageButton from './LanguageButton';

const DashHome: React.FC = () => (
    <div id='dash-home'>
        <LanguageButton language='de' />
        <LanguageButton language='en' />
        <LanguageButton language='fr' />
    </div>
);

export default DashHome;