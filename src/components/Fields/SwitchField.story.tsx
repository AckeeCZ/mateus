import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';

import { SwitchField } from '../../';

import { store, Form } from '../../../stories';

storiesOf('form fields/Switch', module)
    .addDecorator(story => (
        <Provider store={store}>
            <IntlProvider locale="en" messages={{}}>
                {story()}
            </IntlProvider>
        </Provider>
    ))
    .add('SwitchField', () => (
        <Form initialValues={{}}>
            <SwitchField name="switchField" label="Switch field" />
        </Form>
    ))
    .add('CheckedSwitchField', () => (
        <Form initialValues={{ checkedSwitchField: true }}>
            <SwitchField
                name="checkedSwitchField"
                label="Checked switch field"
                checkedChildren="+"
                unCheckedChildren="-"
            />
        </Form>
    ));
