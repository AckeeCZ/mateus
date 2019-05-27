import { CheckboxGroupProps } from 'antd/es/checkbox';
import CheckboxGroupInput from '../Inputs/CheckboxGroupInput';
import wrapWithField from '../../HOC/wrapWithField';

const CheckboxGroupField = wrapWithField<CheckboxGroupProps>(CheckboxGroupInput);

export default CheckboxGroupField;
