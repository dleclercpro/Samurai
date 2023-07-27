import React, { ReactNode } from 'react';
import './Form.scss';

interface OwnProps {
    id: string,
    children?: ReactNode,
}

type Props = OwnProps;

class Form extends React.Component<Props, {}> {

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    
    render() {
        const { id, children } = this.props;

        return (
            <form
                id={`form-${id}`}
                className='form'
                method='POST'
                onSubmit={this.handleSubmit}
            >
                <div className='fields'>
                    {children}
                </div>
            </form>
        );
    }
}

export default Form;