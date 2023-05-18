import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Middleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './reducers';
import { createLogger } from 'redux-logger';
import App from './components/App';

const middleware: Middleware[] = [ thunkMiddleware ];
const loggerMiddleware = createLogger({ collapsed: true });

if (process.env.NODE_ENV === 'development') {
    middleware.push(loggerMiddleware);
}

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);