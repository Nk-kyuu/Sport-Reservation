import { Validator, BaseDateValidationProps } from '@mui/x-date-pickers/internals';
import { DateValidationError } from '@mui/x-date-pickers/models';
import { DateRange, DayRangeValidationProps } from '../../models';
export interface DateRangeComponentValidationProps<TDate> extends DayRangeValidationProps<TDate>, Required<BaseDateValidationProps<TDate>> {
}
export declare const validateDateRange: Validator<DateRange<any>, any, DateRangeValidationError, DateRangeComponentValidationProps<any>>;
type DateRangeValidationErrorValue = DateValidationError | 'invalidRange' | null;
export type DateRangeValidationError = [
    DateRangeValidationErrorValue,
    DateRangeValidationErrorValue
];
export {};
