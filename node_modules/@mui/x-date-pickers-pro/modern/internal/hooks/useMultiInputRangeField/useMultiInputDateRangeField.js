import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import { unstable_useDateField as useDateField } from '@mui/x-date-pickers/DateField';
import { useLocalizationContext, useValidation } from '@mui/x-date-pickers/internals';
import useControlled from '@mui/utils/useControlled';
import { useDefaultizedDateRangeFieldProps } from '../../../SingleInputDateRangeField/useSingleInputDateRangeField';
import { validateDateRange } from '../validation/useDateRangeValidation';
import { rangeValueManager } from '../../utils/valueManagers';
export const useMultiInputDateRangeField = ({
  sharedProps: inSharedProps,
  startTextFieldProps,
  startInputRef,
  unstableStartFieldRef,
  endTextFieldProps,
  endInputRef,
  unstableEndFieldRef
}) => {
  const sharedProps = useDefaultizedDateRangeFieldProps(inSharedProps);
  const adapter = useLocalizationContext();
  const {
    value: valueProp,
    defaultValue,
    format,
    onChange,
    disabled,
    readOnly,
    selectedSections,
    onSelectedSectionsChange
  } = sharedProps;
  const firstDefaultValue = React.useRef(defaultValue);
  const [value, setValue] = useControlled({
    name: 'useMultiInputDateRangeField',
    state: 'value',
    controlled: valueProp,
    default: firstDefaultValue.current ?? rangeValueManager.emptyValue
  });

  // TODO: Maybe export utility from `useField` instead of copy/pasting the logic
  const buildChangeHandler = index => {
    return (newDate, rawContext) => {
      const newDateRange = index === 0 ? [newDate, value[1]] : [value[0], newDate];
      setValue(newDateRange);
      const context = _extends({}, rawContext, {
        validationError: validateDateRange({
          adapter,
          value: newDateRange,
          props: sharedProps
        })
      });
      onChange?.(newDateRange, context);
    };
  };
  const handleStartDateChange = useEventCallback(buildChangeHandler(0));
  const handleEndDateChange = useEventCallback(buildChangeHandler(1));
  const validationError = useValidation(_extends({}, sharedProps, {
    value
  }), validateDateRange, rangeValueManager.isSameError, rangeValueManager.defaultErrorState);
  const startFieldProps = _extends({
    error: !!validationError[0]
  }, startTextFieldProps, {
    disabled,
    readOnly,
    format,
    unstableFieldRef: unstableStartFieldRef,
    value: valueProp === undefined ? undefined : valueProp[0],
    defaultValue: defaultValue === undefined ? undefined : defaultValue[0],
    onChange: handleStartDateChange,
    selectedSections,
    onSelectedSectionsChange
  });
  const endFieldProps = _extends({
    error: !!validationError[1]
  }, endTextFieldProps, {
    format,
    disabled,
    readOnly,
    unstableFieldRef: unstableEndFieldRef,
    value: valueProp === undefined ? undefined : valueProp[1],
    defaultValue: defaultValue === undefined ? undefined : defaultValue[1],
    onChange: handleEndDateChange,
    selectedSections,
    onSelectedSectionsChange
  });
  const startDateResponse = useDateField({
    props: startFieldProps,
    inputRef: startInputRef
  });
  const endDateResponse = useDateField({
    props: endFieldProps,
    inputRef: endInputRef
  });
  return {
    startDate: startDateResponse,
    endDate: endDateResponse
  };
};