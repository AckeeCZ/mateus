import { SelectProps as AntdSelectProps } from 'antd/es/select';
import SelectInput, { SelectProps } from '../Inputs/SelectInput';
import wrapWithField from '../../HOC/wrapWithField';

const SelectField = wrapWithField<SelectProps & AntdSelectProps>(SelectInput);

export default SelectField;
