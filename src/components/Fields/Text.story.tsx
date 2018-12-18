import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';

import { TextField, TextAreaField } from '../../';

import { store, Form } from '../../stories';

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
