import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import { unstable_useDateField as useDateField } from '@mui/x-date-pickers/DateField';
import { useLocalizationContext, useValidation } from '@mui/x-date-pickers/internals';
import useControlled from '@mui/utils/useControlled';
import { useDefaultizedDateRangeFieldProps } from '../../../SingleInputDateRangeField/useSingleInputDateRangeField';
import { validateDateRange } from '../validation/useDateRangeValidation';
import { rangeValueManager } from '../../utils/valueManagers';
export var useMultiInputDateRangeField = function useMultiInputDateRangeField(_ref) {
  var _firstDefaultValue$cu;
  var inSharedProps = _ref.sharedProps,
    startTextFieldProps = _ref.startTextFieldProps,
    startInputRef = _ref.startInputRef,
    unstableStartFieldRef = _ref.unstableStartFieldRef,
    endTextFieldProps = _ref.endTextFieldProps,
    endInputRef = _ref.endInputRef,
    unstableEndFieldRef = _ref.unstableEndFieldRef;
  var sharedProps = useDefaultizedDateRangeFieldProps(inSharedProps);
  var adapter = useLocalizationContext();
  var valueProp = sharedProps.value,
    defaultValue = sharedProps.defaultValue,
    format = sharedProps.format,
    onChange = sharedProps.onChange,
    disabled = sharedProps.disabled,
    readOnly = sharedProps.readOnly,
    selectedSections = sharedProps.selectedSections,
    onSelectedSectionsChange = sharedProps.onSelectedSectionsChange;
  var firstDefaultValue = React.useRef(defaultValue);
  var _useControlled = useControlled({
      name: 'useMultiInputDateRangeField',
      state: 'value',
      controlled: valueProp,
      default: (_firstDefaultValue$cu = firstDefaultValue.current) != null ? _firstDefaultValue$cu : rangeValueManager.emptyValue
    }),
    _useControlled2 = _slicedToArray(_useControlled, 2),
    value = _useControlled2[0],
    setValue = _useControlled2[1];

  // TODO: Maybe export utility from `useField` instead of copy/pasting the logic
  var buildChangeHandler = function buildChangeHandler(index) {
    return function (newDate, rawContext) {
      var newDateRange = index === 0 ? [newDate, value[1]] : [value[0], newDate];
      setValue(newDateRange);
      var context = _extends({}, rawContext, {
        validationError: validateDateRange({
          adapter: adapter,
          value: newDateRange,
          props: sharedProps
        })
      });
      onChange == null ? void 0 : onChange(newDateRange, context);
    };
  };
  var handleStartDateChange = useEventCallback(buildChangeHandler(0));
  var handleEndDateChange = useEventCallback(buildChangeHandler(1));
  var validationError = useValidation(_extends({}, sharedProps, {
    value: value
  }), validateDateRange, rangeValueManager.isSameError, rangeValueManager.defaultErrorState);
  var startFieldProps = _extends({
    error: !!validationError[0]
  }, startTextFieldProps, {
    disabled: disabled,
    readOnly: readOnly,
    format: format,
    unstableFieldRef: unstableStartFieldRef,
    value: valueProp === undefined ? undefined : valueProp[0],
    defaultValue: defaultValue === undefined ? undefined : defaultValue[0],
    onChange: handleStartDateChange,
    selectedSections: selectedSections,
    onSelectedSectionsChange: onSelectedSectionsChange
  });
  var endFieldProps = _extends({
    error: !!validationError[1]
  }, endTextFieldProps, {
    format: format,
    disabled: disabled,
    readOnly: readOnly,
    unstableFieldRef: unstableEndFieldRef,
    value: valueProp === undefined ? undefined : valueProp[1],
    defaultValue: defaultValue === undefined ? undefined : defaultValue[1],
    onChange: handleEndDateChange,
    selectedSections: selectedSections,
    onSelectedSectionsChange: onSelectedSectionsChange
  });
  var startDateResponse = useDateField({
    props: startFieldProps,
    inputRef: startInputRef
  });
  var endDateResponse = useDateField({
    props: endFieldProps,
    inputRef: endInputRef
  });
  return {
    startDate: startDateResponse,
    endDate: endDateResponse
  };
};