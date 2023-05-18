import React, { Dispatch } from 'react';
import './DialogCasteChoice.scss';
import Dialog from './Dialog';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { DialogType } from '../../types/DialogTypes';
import { AppState } from '../../types/StateTypes';
import { openDialog } from '../../actions/DialogActions';
import { Caste, CasteSwapStep } from '../../types/GameTypes';
import { deselectTileFromForSwap, deselectTileToForSwap, finishCasteSwap, deselectCasteFromForSwap, deselectCasteToForSwap } from '../../actions/GameActions';
import CasteComponent from '../CasteComponent';
import i18n from '../../i18n';

interface StateProps {
    isChoosingFrom: boolean,
    isChoosingTo: boolean,
    hasChosenFrom: boolean,
    hasChosenTo: boolean,
    isActionButtonActive: boolean,
    castes: Caste[],
    isOpen: boolean,
    language: i18n,
}

interface DispatchProps {
    deselectTileFromForSwap: () => void,
    deselectTileToForSwap: () => void,
    deselectCasteFromForSwap: () => void,
    deselectCasteToForSwap: () => void,
    finishCasteSwap: () => void,
    openCasteSwapEndDialog: () => void,
}

type Props = StateProps & DispatchProps;

interface State {
    castes: Caste[],
}

class DialogCasteChoice extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            castes: [],
        };
    }

    componentDidUpdate(prevProps: Props) {
        const { isOpen, castes } = this.props;

        // We set its content when opening dialog, so store
        // changes do not alter it
        if (!prevProps.isOpen && isOpen) {
            this.setState({
                castes,
            });
        }
    }

    handleCancel = () => {
        const { isChoosingFrom, isChoosingTo, hasChosenFrom, hasChosenTo, deselectTileFromForSwap, deselectTileToForSwap, deselectCasteFromForSwap, deselectCasteToForSwap } = this.props;

        if (hasChosenFrom) {
            deselectCasteFromForSwap();
            deselectTileFromForSwap();
        }
        if (isChoosingFrom) {
            deselectTileFromForSwap();
        }

        if (hasChosenTo) {
            deselectCasteToForSwap();
            deselectTileToForSwap();
        }
        if (isChoosingTo) {
            deselectTileToForSwap();
        }
    }

    handleAction = () => {
        const { hasChosenFrom, hasChosenTo, finishCasteSwap, openCasteSwapEndDialog } = this.props;

        if (hasChosenFrom) {
            finishCasteSwap();
        }

        if (hasChosenTo) {
            openCasteSwapEndDialog();            
        }

        return Promise.resolve();
    }

    render() {
        const { isActionButtonActive, language } = this.props;
        const { castes } = this.state;

        return (
            <Dialog
                type={DialogType.CasteChoice}
                headline={language.getText('CASTE_CHOICE')}
                message={language.getText('CASTE_CHOICE_MESSAGE')}
                actionButtonText={language.getText('CHOOSE')}
                cancelButtonText={language.getText('BACK')}
                onCancel={this.handleCancel}
                onAction={this.handleAction}
                isActionButtonActive={isActionButtonActive}
            >
                <div className='icons'>
                    {castes && castes.map((caste: Caste, index: number) => (
                        <CasteComponent
                            key={`caste-component-${index}--dialog-caste-choice`}
                            caste={caste}
                        />
                    ))}
                </div>
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { step, selection } = state.game;
    const { tiles } = state.board;
    const { language } = state.settings;

    const isChoosingFrom = step === CasteSwapStep.ChooseCasteFrom;
    const isChoosingTo = step === CasteSwapStep.ChooseCasteTo;
    const hasChosenFrom = step === CasteSwapStep.ChooseFromDone;
    const hasChosenTo = step === CasteSwapStep.ChooseToDone;

    let selectedTileId;
    if (isChoosingFrom || hasChosenFrom) {
        selectedTileId = selection.swap.from.tile;
    } else if (isChoosingTo || hasChosenTo) {
        selectedTileId = selection.swap.to.tile;
    } else {
        selectedTileId = -1;
    }

    const selectedTile = tiles.get(selectedTileId);
    const castes = selectedTile ? selectedTile.castes : [];

    const isActionButtonActive = hasChosenFrom || hasChosenTo;

    return {
        isChoosingFrom,
        isChoosingTo,
        hasChosenFrom,
        hasChosenTo,
        isActionButtonActive,
        castes,
        isOpen: state.dialog[DialogType.CasteChoice].isOpen,
        language,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    deselectTileFromForSwap: () => dispatch(deselectTileFromForSwap),
    deselectTileToForSwap: () => dispatch(deselectTileToForSwap),
    deselectCasteFromForSwap: () => dispatch(deselectCasteFromForSwap),
    deselectCasteToForSwap: () => dispatch(deselectCasteToForSwap),
    finishCasteSwap: () => dispatch(finishCasteSwap),
    openCasteSwapEndDialog: () => dispatch(openDialog(DialogType.CasteSwapEnd)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogCasteChoice);