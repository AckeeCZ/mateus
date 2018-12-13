import { TextAreaProps } from 'antd/lib/input';
import TextAreaInput from '../Inputs/TextareaInput';
import wrapWithField from '../../HOC/wrapWithField';

const TextField = wrapWithField<TextAreaProps>(TextAreaInput);

export default TextField;
