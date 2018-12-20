import React from 'react';
import { IntlProvider, InjectedIntl } from 'react-intl';
import { Provider } from 'react-redux';
import { FormErrors } from 'redux-form';
import moment from 'moment';

import { storiesOf } from '@storybook/react';

import { DatePickerField, TimePickerField } from '../..';

import { store, Form } from '../../../stories';

const validateRequired = (fieldName: string) => (
    values: { [key: string]: any },
    { intl }: { intl: InjectedIntl },
): FormErrors => {
    const errors: { [key: string]: string } = {};

    if (!values[fieldName]) {
        errors[fieldName] = intl.formatMessage({ id: 'field.validate.required' }, { name: fieldName });
    }

    return errors;
};
const intlMessages = {
    'field.validate.required': 'Field {name} is required',
};

storiesOf('form fields/DatePicker', module)
    .addDecorator(story => (
        <Provider store={store}>
            <IntlProvider locale="en" messages={intlMessages}>
                {story()}
            </IntlProvider>
        </Provider>
    ))
    .add('DatePicker', () => (
        <Form initialValues={{ datePicker: moment().toISOString() }}>
            <DatePickerField name="datePicker" label="Datepicker Field" displayFormat="DD/MM/YYYY" />
        </Form>
    ))
    .add('localized validation', () => (
        <Form initialValues={{ datePicker: moment().toISOString() }} validate={validateRequired('datePicker')}>
            <DatePickerField
                name="datePicker"
                label="Datepicker Field with localized validation"
                displayFormat="DD/MM/YYYY"
            />
        </Form>
    ));

storiesOf('form fields/TimePicker', module)
    .addDecorator(story => (
        <Provider store={store}>
            <IntlProvider locale="en" messages={intlMessages}>
                {story()}
            </IntlProvider>
        </Provider>
    ))
    .add('TimePicker', () => (
        <Form>
            <TimePickerField name="timePicker" label="Timepicker Field" displayFormat="H:mm:ss" />
        </Form>
    ))
    .add('localized validation', () => (
        <Form validate={validateRequired('timePicker')}>
            <TimePickerField
                name="timePicker"
                label="Timepicker Field with localized validation"
                displayFormat="H:mm:ss"
            />
        </Form>
    ));
