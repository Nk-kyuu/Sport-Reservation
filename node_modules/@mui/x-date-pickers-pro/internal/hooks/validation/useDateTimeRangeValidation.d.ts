import { Validator, BaseDateValidationProps, TimeValidationProps, ValidationProps } from '@mui/x-date-pickers/internals';
import { DateTimeValidationError } from '@mui/x-date-pickers/models';
import { DayRangeValidationProps } from '../../models/dateRange';
import { DateRange } from '../../models/range';
export interface DateTimeRangeComponentValidationProps<TDate> extends DayRangeValidationProps<TDate>, TimeValidationProps<TDate>, Required<BaseDateValidationProps<TDate>> {
}
export declare const validateDateTimeRange: Validator<DateRange<any>, any, DateTimeRangeValidationError, DateTimeRangeComponentValidationProps<any>>;
type DateTimeRangeValidationErrorValue = DateTimeValidationError | 'invalidRange' | null;
export type DateTimeRangeValidationError = [
    DateTimeRangeValidationErrorValue,
    DateTimeRangeValidationErrorValue
];
export declare const useDateRangeValidation: <TDate>(props: ValidationProps<DateTimeRangeValidationError, DateRange<TDate>, DateTimeRangeComponentValidationProps<TDate>>) => DateTimeRangeValidationError;
export {};
