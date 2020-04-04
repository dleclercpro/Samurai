import React, { Dispatch, ReactNode, SVGProps } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { Caste, Size2D } from '../types/GameTypes';
import './BoardTileCastePiece.scss';
import { AppAction } from '../actions';
import { ReactComponent as KatanaIcon } from '../icons/katana.svg';
import { ReactComponent as BuddhaIcon } from '../icons/buddha.svg';
import { ReactComponent as RiceIcon } from '../icons/rice.svg';

interface BoardTileCastePieceProps {
    tileSize: Size2D,
    caste: Caste,
}

interface BoardTileCastePieceState {
    
}

class BoardTileCastePiece extends React.Component<BoardTileCastePieceProps, BoardTileCastePieceState> {

    getIcon = (caste: Caste, props: SVGProps<SVGSVGElement>): ReactNode => {
        switch (caste) {
            case Caste.Military:
                return <KatanaIcon {...props} />
            case Caste.Religion:
                return <BuddhaIcon {...props} />
            case Caste.Commerce:
                return <RiceIcon {...props} />
            default:
                throw new Error('Wrong caste.')
        }
    }

    render() {
        const { tileSize, caste } = this.props;
        const width = tileSize.width / 3;
        const height = tileSize.height / 3;

        const svgProps = {
            x: tileSize.width / 2 - width / 2,
            y: tileSize.height / 2 - height / 2,
            width: width,
            height: height,
        }
    
        return this.getIcon(caste, svgProps);
    }
}

const mapStateToProps = (state: AppState) => ({
    
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(BoardTileCastePiece);