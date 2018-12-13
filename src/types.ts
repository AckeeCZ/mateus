import actionTypes from './services/actionTypes';

export interface Action {
    type: actionTypes;
    [extraProps: string]: any;
}
