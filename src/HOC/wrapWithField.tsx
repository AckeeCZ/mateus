import React from 'react';
import { Field, BaseFieldProps } from 'redux-form';
// import { Partial } from 'utility-types';
import { FormItemProps } from 'antd/lib/form';
import { merge } from 'lodash';

import { logger } from '../config';

type BaseProps = BaseFieldProps & FormItemProps;

type InjectProps<InProps, OutProps> = (p: InProps & BaseProps) => OutProps;

const isInjectProps = <InProps, OutProps>(fn: any): fn is InjectProps<InProps, OutProps> => {
    return typeof fn === 'function';
};

function wrapWithField<ComponentProps, InjectedProps = {}>(
    component: React.ComponentType<ComponentProps>,
    injectProps?: InjectedProps | InjectProps<ComponentProps, InjectedProps>,
): React.SFC<ComponentProps & BaseProps> {
    return props => {
        let injected = {} as InjectedProps;
        if (isInjectProps<ComponentProps, InjectedProps>(injectProps)) {
            injected = injectProps(props);
            if (typeof injected !== 'object') {
                injected = {} as InjectedProps;
                logger.warn(
                    `injectProps function has to return an object.` +
                        `It has returned ${typeof injected}. Fallbacking to an empty object.`,
                );
            }
        } else if (typeof injectProps === 'object') {
            injected = injectProps;
        } else if (typeof injectProps !== 'undefined') {
            logger.warn(
                `Type of injectProps is ${typeof injectProps}.` +
                    `Only "function" and "object" are supported. Fallbacking to an empty object.`,
            );
        }

        const mergedProps: InjectedProps & ComponentProps & BaseProps = merge(injected, props);
        return (
            <Field
                /**
                 * This currently only solution I found to make compilation works. It's not perfect and probably
                 * there is some lack of typing, but without it I was receiving this error:
                 *
                 *    Type 'ComponentClass<ComponentProps, any>' is not assignable to type '"input"'
                 */
                component={component as unknown as 'input'}
                props={undefined}
                {...mergedProps}
            />
        );
    };
}

export default wrapWithField;
