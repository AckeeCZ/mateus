import actionTypes from './services/actionTypes';

export interface Action {
    type: actionTypes;
    [extraProps: string]: any;
}
export interface Console {
    error(...args: any[]): any;
    warn(...args: any[]): any;
    log(...args: any[]): any;
}
