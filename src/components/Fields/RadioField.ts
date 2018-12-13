import { RadioGroupProps } from 'antd/lib/radio';
import RadioInput from '../Inputs/RadioInput';
import wrapWithField from '../../HOC/wrapWithField';

const RadioField = wrapWithField<RadioGroupProps>(RadioInput);

export default RadioField;
