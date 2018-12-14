import React from 'react';
import { Field, BaseFieldProps } from 'redux-form';
import { Omit } from 'utility-types';
import { FormItemProps } from 'antd/lib/form';
import { merge } from 'lodash';

import { logger } from '../config';

type BaseProps = Omit<BaseFieldProps, 'component'> & FormItemProps;

function wrapWithField<Props1, Props2 = {}>(
    component: React.ComponentType<Props1>,
    injectProps?: ((p: Props1 & BaseProps) => Props2) | Props2,
): React.SFC<Props1 & BaseProps> {
    return props => {
        let p = {};
        if (typeof injectProps === 'function') {
            p = injectProps(props);
            if (typeof p !== 'object') {
                p = {};
                logger.warn(
                    `injectProps function has to return an object.` +
                        `It has returned ${typeof p}. Fallbacking to an empty object.`,
                );
            }
        } else if (typeof injectProps === 'object') {
            p = injectProps;
        } else if (typeof injectProps !== 'undefined') {
            logger.warn(
                `Type of injectProps is ${typeof injectProps}.` +
                    `Only "function" and "object" are supported. Fallbacking to an empty object.`,
            );
        }
        type MergedProps = Props1 & BaseProps & Props2;
        const mergedProps: MergedProps = merge(p, props);
        return <Field component={component} {...mergedProps} />;
    };
}

export default wrapWithField;
