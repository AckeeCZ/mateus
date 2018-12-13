import { InputNumberProps } from 'antd/lib/input-number';
import NumberInput from '../Inputs/NumberInput';
import wrapWithField from '../../HOC/wrapWithField';

const NumberField = wrapWithField<InputNumberProps>(NumberInput);

export default NumberField;
