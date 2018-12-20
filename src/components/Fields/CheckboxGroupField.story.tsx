import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';

import { CheckboxGroupField } from '../..';

import { Form, store } from '../../../stories';

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
