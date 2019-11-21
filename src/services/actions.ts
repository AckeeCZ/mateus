import { Action as ReduxAction } from 'redux';
import { Action } from '../types';
import actionTypes from './actionTypes';

const submitForm = <FormValues = object>(form: string, submitActionCreator: ReduxAction, customData?: object) => {
    return (data: FormValues): Action => ({
        data,
        customData,
        form,
        submitActionCreator,
        type: actionTypes.FORM_SUBMIT,
    });
};

export default submitForm;
