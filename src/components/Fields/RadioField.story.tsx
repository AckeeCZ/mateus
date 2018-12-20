import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';

import { RadioField } from '../..';

import { store, Form } from '../../stories';

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
            name="radioField"
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
