import { TextAreaProps } from 'antd/es/input';
import TextAreaInput from '../Inputs/TextareaInput';
import wrapWithField from '../../HOC/wrapWithField';

const TextField = wrapWithField<TextAreaProps>(TextAreaInput);

export default TextField;
