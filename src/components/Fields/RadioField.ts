import { RadioGroupProps } from 'antd/es/radio';
import RadioInput from '../Inputs/RadioInput';
import wrapWithField from '../../HOC/wrapWithField';

const RadioField = wrapWithField<RadioGroupProps>(RadioInput);

export default RadioField;
