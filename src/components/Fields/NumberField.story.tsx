import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';

import { NumberField } from '../..';

import { store, Form } from '../../../stories';

storiesOf('form fields/Number', module)
    .addDecorator(story => (
        <Provider store={store}>
            <IntlProvider locale="en" messages={{}}>
                <Form>{story()}</Form>
            </IntlProvider>
        </Provider>
    ))
    .add('NumberField', () => <NumberField name="numberField" label="Number field" />);
