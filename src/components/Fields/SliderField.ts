import { SliderProps } from 'antd/es/slider';
import SliderInput from '../Inputs/SliderInput';
import wrapWithField from '../../HOC/wrapWithField';

const SliderField = wrapWithField<SliderProps>(SliderInput);

export default SliderField;
