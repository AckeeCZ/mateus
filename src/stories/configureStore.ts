import { combineReducers, createStore, applyMiddleware, compose, Middleware, ReducersMapObject } from 'redux';

declare global {
    interface Window { devToolsExtension?: Function; }
}

export default function configureStore(
    initialState: { [key: string]: any },
    reducer: ReducersMapObject,
    ...customMiddlewares: Middleware[]
) {
    const middlewares = [...customMiddlewares].filter(m => !!m);

    const middleware = applyMiddleware(...middlewares);
    const enhancer = compose(
        middleware,

        window.devToolsExtension ? window.devToolsExtension() : (r: any) => r,
    );

    const store = createStore(combineReducers(reducer), initialState, enhancer);

    return store;
}
