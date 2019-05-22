import { ReactNode } from 'react';
import { SelectField } from 'redux-form-antd';

export interface OptionData {
    value: string | number;
    label: ReactNode;
    key: string | number;
}

// extra props that are not defined in SelectProps from antd/es/select but rather added by redux-form-antd
export interface SelectProps {
    multiple?: boolean;
    options: OptionData[];
}

export default SelectField;
