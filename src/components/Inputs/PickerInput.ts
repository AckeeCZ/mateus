import { FocusEvent } from 'react';
import { Omit } from 'utility-types';
import { customMap, createComponent } from 'redux-form-antd';
import { WrappedFieldProps, BaseFieldProps, WrappedFieldInputProps } from 'redux-form';
import TimePicker from 'antd/lib/time-picker';
import DatePicker from 'antd/lib/date-picker';
import { PickerProps as AntdPickerProps, SinglePickerProps } from 'antd/lib/date-picker/interface';
import { FormItemProps } from 'antd/lib/form';
import moment from 'moment';

import { logger } from '../../config';

export interface PickerProps extends AntdPickerProps, SinglePickerProps {
    displayFormat: string;
}

const pickerMap = customMap(
    (
        mapProps: PickerProps & BaseFieldProps & WrappedFieldInputProps & FormItemProps,
        {
            input: { onChange, value, onFocus, onBlur },
            meta: { error },
            displayFormat,
        }: PickerProps & WrappedFieldProps,
    ): Omit<BaseFieldProps, 'format'> & FormItemProps & AntdPickerProps & SinglePickerProps => {
        if (!displayFormat) {
            logger.warn('Property displayFormat is not set. Always set the property to prevent bugs!');
        }
        const date = moment(value);
        let lastChangeValue: null | moment.Moment = null;
        return {
            ...mapProps,
            onChange: (e: any, v: string) => {
                const val = moment(v, displayFormat);
                lastChangeValue = val;
                onChange(val);
            },
            onFocus: (e: FocusEvent) => {
                onFocus(e);
            },
            onBlur: () => {
                onBlur(lastChangeValue || value);
            },
            value: date.isValid() ? date : undefined, // null,
            help: error,
            validateStatus: error ? 'error' : 'success',
            hasFeedback: false,
            format: displayFormat,
        };
    },
);

const picker = (Picker: React.ComponentType) => createComponent(Picker, pickerMap);

const TimePickerInput = picker(TimePicker);
const DatePickerInput = picker(DatePicker);

export { TimePickerInput, DatePickerInput };

export default picker;
