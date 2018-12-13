import { CheckboxGroupProps } from 'antd/lib/checkbox';
import CheckboxGroupInput from '../Inputs/CheckboxGroupInput';
import wrapWithField from '../../HOC/wrapWithField';

const CheckboxGroupField = wrapWithField<CheckboxGroupProps>(CheckboxGroupInput);

export default CheckboxGroupField;
