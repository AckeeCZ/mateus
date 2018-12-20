import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';

import { SelectField } from '../..';

import { store, Form } from '../../stories';

const getPopupContainer = () => document.body;

storiesOf('form fields/Select', module)
    .addDecorator(story => (
        <Provider store={store}>
            <IntlProvider locale="en" messages={{}}>
                {story()}
            </IntlProvider>
        </Provider>
    ))
    .add('SelectField', () => (
        <Form>
            <SelectField
                name="selectField"
                label="Select field"
                placeholder="Select a value"
                getPopupContainer={getPopupContainer} // required only in sandboxed story environment
                options={Array.from(Array(10).keys()).map(index => ({
                    value: index,
                    label: `Option #${index}`,
                    key: index,
                }))}
            />
        </Form>
    ))
    .add('SelectField: multiple values', () => (
        <Form initialValues={{ multiSelectField: ['5', '6'] }}>
            <SelectField
                name="multiSelectField"
                label="Multple value Select field"
                mode="multiple"
                getPopupContainer={getPopupContainer} // required only in sandboxed story environment
                options={Array.from(Array(10).keys()).map(index => ({
                    value: index,
                    label: `Option #${index}`,
                    key: index,
                }))}
            />
        </Form>
    ));
