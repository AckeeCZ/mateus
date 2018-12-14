import React from 'react';
import { Field, BaseFieldProps } from 'redux-form';
import { Omit } from 'utility-types';
import { FormItemProps } from 'antd/lib/form';
import { merge } from 'lodash';

import { logger } from '../config';

function wrapWithField<P>(
    component: React.ComponentType<P>,
    injectProps?: { [prop: string]: any },
): React.SFC<P & Omit<BaseFieldProps, 'component'> & FormItemProps> {
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
        return <Field component={component} {...merge(p, props)} />;
    };
}

export default wrapWithField;
