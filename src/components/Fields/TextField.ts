import { InputProps } from 'antd/es/input';
import TextInput from '../Inputs/TextInput';
import wrapWithField from '../../HOC/wrapWithField';

const TextField = wrapWithField<InputProps>(TextInput);

export default TextField;
