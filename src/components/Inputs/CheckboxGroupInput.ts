import { FocusEvent } from 'react';
import { customMap, createComponent } from 'redux-form-antd';
import { WrappedFieldProps } from 'redux-form';
import { default as Checkbox } from 'antd/lib/checkbox';

const CheckboxGroup = Checkbox.Group;

interface Props {
    defaultValue: string[];
}

const checkboxGroupMap = customMap(
    (
        { defaultValue, ...mapProps }: Props,
        { input: { onChange, onBlur, onFocus, value = [] } }: WrappedFieldProps,
    ) => ({
        ...mapProps,
        onChange,
        onFocus: (e: FocusEvent) => {
            onFocus(e);
        },
        onBlur: () => {
            onBlur(undefined);
        },
        value: !value ? defaultValue : value,
    })
);

export default createComponent(CheckboxGroup, checkboxGroupMap);
