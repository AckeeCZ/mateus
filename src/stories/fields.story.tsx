// import 'babel-polyfill';
import React from 'react';
import { IntlProvider, InjectedIntl } from 'react-intl';
import { Provider } from 'react-redux';
import { reducer as form, FormErrors } from 'redux-form';
import moment from 'moment';

import { storiesOf } from '@storybook/react';

import {
    TextField,
    TextAreaField,
    NumberField,
    SelectField,
    DatePickerField,
    TimePickerField,
    CheckboxGroupField,
    RadioField,
    SwitchField,
    SliderField,
} from '..';

import configureStore from './configureStore';

import Form from './Form';

import './fields.story.scss';

const reducers = {
    form,
};

const store = configureStore({}, reducers);

storiesOf('form fields/Text', module)
    .addDecorator(story => (
        <Provider store={store}>
            <IntlProvider locale="en" messages={{}}>
                <Form>{story()}</Form>
            </IntlProvider>
        </Provider>
    ))
    .add('TextField', () => <TextField name="textField" label="Text field" />)
    .add('TextField: type password', () => <TextField name="passwordField" type="password" label="Password field" />)
    .add('TextAreaField', () => <TextAreaField name="textAreaField" label="Textarea field" />);

storiesOf('form fields/Number', module)
    .addDecorator(story => (
        <Provider store={store}>
            <IntlProvider locale="en" messages={{}}>
                <Form>{story()}</Form>
            </IntlProvider>
        </Provider>
    ))
    .add('NumberField', () => <NumberField name="numberField" label="Number field" />);

storiesOf('form fields/Select', module)
    .addDecorator(story => (
        <Provider store={store}>
            <IntlProvider locale="en" messages={{}}>
                <Form initialValues={{ multiSelectField: ['5', '6'] }}>{story()}</Form>
            </IntlProvider>
        </Provider>
    ))
    .add('SelectField', () => (
        <SelectField
            name="selectField"
            label="Select field"
            placeholder="Select a value"
            options={Array.from(Array(10).keys()).map(index => ({
                value: index,
                label: `Option #${index}`,
                key: index,
            }))}
        />
    ))
    .add('SelectField: multiple values', () => (
        <SelectField
            name="multiSelectField"
            label="Multple value Select field"
            mode="multiple"
            options={Array.from(Array(10).keys()).map(index => ({
                value: index,
                label: `Option #${index}`,
                key: index,
            }))}
        />
    ));

storiesOf('form fields/Checkbox', module)
    .addDecorator(story => (
        <Provider store={store}>
            <IntlProvider locale="en" messages={{}}>
                <Form initialValues={{ checkboxGroupField: ['selected'] }}>{story()}</Form>
            </IntlProvider>
        </Provider>
    ))
    .add('CheckboxGroupField', () => (
        <CheckboxGroupField
            name="checkboxGroupField"
            label="Checkbox group field"
            options={[
                {
                    label: 'Selected box',
                    value: 'selected',
                },
                {
                    label: 'Disabled box',
                    value: 'disabled',
                    disabled: true,
                },
                {
                    label: 'Unselected box',
                    value: 'unSelected',
                },
            ]}
        />
    ))
    .add('CheckboxGroupField: default values', () => (
        <CheckboxGroupField
            name="checkboxGroupFieldDefaultValue"
            label="Checkbox group field"
            defaultValue={['val2']}
            options={[
                {
                    label: 'Value 1',
                    value: 'val1',
                },
                {
                    label: 'Value 2',
                    value: 'val2',
                },
            ]}
        />
    ));

storiesOf('form fields/Radio', module)
    .addDecorator(story => (
        <Provider store={store}>
            <IntlProvider locale="en" messages={{}}>
                <Form initialValues={{ radioField: 1 }}>{story()}</Form>
            </IntlProvider>
        </Provider>
    ))
    .add('RadioField', () => (
        <RadioField
            name="checkboxField"
            label="Select field"
            options={[
                {
                    label: 'First',
                    value: 1,
                },
                {
                    label: 'Second',
                    value: 2,
                    disabled: true,
                },
                {
                    label: 'Third',
                    value: 3,
                },
            ]}
        />
    ));

storiesOf('form fields/Switch', module)
    .addDecorator(story => (
        <Provider store={store}>
            <IntlProvider locale="en" messages={{}}>
                <Form initialValues={{ checkedSwitchField: true }}>{story()}</Form>
            </IntlProvider>
        </Provider>
    ))
    .add('SwitchField', () => <SwitchField name="switchField" label="Switch field" />)
    .add('CheckedSwitchField', () => (
        <SwitchField name="checkedSwitchField" label="Checked switch field" checkedChildren="+" unCheckedChildren="-" />
    ));

storiesOf('form fields/Slider', module)
    .addDecorator(story => (
        <Provider store={store}>
            <IntlProvider locale="en" messages={{}}>
                <Form initialValues={{ sliderField: 50 }}>{story()}</Form>
            </IntlProvider>
        </Provider>
    ))
    .add('SliderField', () => <SliderField name="sliderField" label="Slider field" min={0} max={100} />)
    .add('MarkedSliderField', () => (
        <SliderField
            name="markedSliderField"
            label="Marked slider field"
            min={0}
            max={100}
            marks={{ 0: '0px', 50: '50px', 100: '100px' }}
            step={5}
        />
    ));

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
