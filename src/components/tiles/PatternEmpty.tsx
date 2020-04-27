import React from 'react';
import './PatternEmpty.scss';

const PatternEmpty: React.FC = () => (
    <pattern id='pattern-empty' width='24' height='24' patternTransform='rotate(-30 0 0)' patternUnits='userSpaceOnUse'>
        <line x1='12' y1='0' x2='12' y2='24' />
    </pattern>
)

export default PatternEmpty;