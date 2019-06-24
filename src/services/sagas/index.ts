import { getFormValues, getFormInitialValues, reset, startSubmit, stopSubmit, FormErrors } from 'redux-form';
import { takeEvery, put, select } from 'redux-saga/effects';

import { Action } from '../../types';

import types from '../actionTypes';

function* handleGeneralFormSubmit(action: Action) {
    const { submitActionCreator, form } = action;
    const data = yield select(getFormValues(form));
    const initialData = yield select(getFormInitialValues(form));

    function* start() {
        yield put(startSubmit(form));
    }

    function* stop(errors: FormErrors) {
        yield put(stopSubmit(form, errors));
    }

    function* res() {
        yield put(reset(form));
    }

    if (!submitActionCreator) {
        return;
    }

    yield put({
        ...submitActionCreator(),
        data,
        form,
        initialData,
        reset: res,
        startSubmit: start,
        stopSubmit: stop,
    });
}

export default function*() {
    yield takeEvery(types.FORM_SUBMIT, handleGeneralFormSubmit);
}
