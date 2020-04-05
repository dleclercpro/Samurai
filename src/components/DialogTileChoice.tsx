import React from 'react';
import { Size2D } from '../types/GameTypes';
import './DialogTileChoice.scss';
import Dialog from './Dialog';
import Hand from './Hand';

interface Props {
    tileSize: Size2D,
    tileStroke: number,
}

const DialogTileChoice: React.FC<Props> = (props) => {
    const { tileSize, tileStroke } = props;
    
    return (
        <Dialog type='player-tile-choice' headline='Player Tile Choice'>
            <section className='text'>
                <p>This is a test.</p>
            </section>
            <section className='tiles'>
                <Hand tileSize={tileSize} tileStroke={tileStroke} />
            </section>
        </Dialog>
    );
}

export default DialogTileChoice;