import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import { unstable_useTimeField as useTimeField } from '@mui/x-date-pickers/TimeField';
import { useLocalizationContext, useUtils, useValidation } from '@mui/x-date-pickers/internals';
import useControlled from '@mui/utils/useControlled';
import { validateTimeRange } from '../validation/useTimeRangeValidation';
import { rangeValueManager } from '../../utils/valueManagers';
export var useDefaultizedTimeRangeFieldProps = function useDefaultizedTimeRangeFieldProps(props) {
  var _props$ampm, _props$disablePast, _props$disableFuture, _props$format;
  var utils = useUtils();
  var ampm = (_props$ampm = props.ampm) != null ? _props$ampm : utils.is12HourCycleInCurrentLocale();
  var defaultFormat = ampm ? utils.formats.fullTime12h : utils.formats.fullTime24h;
  return _extends({}, props, {
    disablePast: (_props$disablePast = props.disablePast) != null ? _props$disablePast : false,
    disableFuture: (_props$disableFuture = props.disableFuture) != null ? _props$disableFuture : false,
    format: (_props$format = props.format) != null ? _props$format : defaultFormat
  });
};
export var useMultiInputTimeRangeField = function useMultiInputTimeRangeField(_ref) {
  var _firstDefaultValue$cu;
  var inSharedProps = _ref.sharedProps,
    startTextFieldProps = _ref.startTextFieldProps,
    startInputRef = _ref.startInputRef,
    unstableStartFieldRef = _ref.unstableStartFieldRef,
    endTextFieldProps = _ref.endTextFieldProps,
    endInputRef = _ref.endInputRef,
    unstableEndFieldRef = _ref.unstableEndFieldRef;
  var sharedProps = useDefaultizedTimeRangeFieldProps(inSharedProps);
  var adapter = useLocalizationContext();
  var valueProp = sharedProps.value,
    defaultValue = sharedProps.defaultValue,
    format = sharedProps.format,
    onChange = sharedProps.onChange,
    disabled = sharedProps.disabled,
    readOnly = sharedProps.readOnly;
  var firstDefaultValue = React.useRef(defaultValue);
  var _useControlled = useControlled({
      name: 'useMultiInputTimeRangeField',
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
        validationError: validateTimeRange({
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
  }), validateTimeRange, rangeValueManager.isSameError, rangeValueManager.defaultErrorState);
  var startFieldProps = _extends({
    error: !!validationError[0]
  }, startTextFieldProps, {
    format: format,
    disabled: disabled,
    readOnly: readOnly,
    unstableFieldRef: unstableStartFieldRef,
    value: valueProp === undefined ? undefined : valueProp[0],
    defaultValue: defaultValue === undefined ? undefined : defaultValue[0],
    onChange: handleStartDateChange
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
    onChange: handleEndDateChange
  });
  var startDateResponse = useTimeField({
    props: startFieldProps,
    inputRef: startInputRef
  });
  var endDateResponse = useTimeField({
    props: endFieldProps,
    inputRef: endInputRef
  });
  return {
    startDate: startDateResponse,
    endDate: endDateResponse
  };
};