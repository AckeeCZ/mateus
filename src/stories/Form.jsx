import { compose } from 'redux';
import React from 'react';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { decorate } from '@storybook/addon-actions';

import Button from 'antd/lib/button';

const Form = ({ handleSubmit, children }) => (
    <form style={{ padding: '2em' }} onSubmit={handleSubmit}>
        {children}
        <Button type="primary" htmlType="submit">
            Submit
        </Button>
    </form>
);

Form.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.func, PropTypes.node]).isRequired,
};

const firstArg = decorate([args => args.slice(0, 1)]);

export default compose(
    injectIntl,
    reduxForm({
        form: 'fieldStoriesForm',
        onSubmit: firstArg.action('Form submitted'),
    }),
)(Form);
