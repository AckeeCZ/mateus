import moment from 'moment';
import { DatePickerInput, TimePickerInput, PickerProps } from '../Inputs/PickerInput';
import wrapWithField from '../../HOC/wrapWithField';

const valueToISOString = (value: string) => moment(value).toISOString();

const DatePickerField = wrapWithField<PickerProps>(DatePickerInput, { normalize: valueToISOString });
const TimePickerField = wrapWithField<PickerProps>(TimePickerInput, { normalize: valueToISOString });

export { DatePickerField, TimePickerField };
