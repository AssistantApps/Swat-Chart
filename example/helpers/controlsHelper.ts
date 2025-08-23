import { defaultChartConfig } from '../constants/defaultChart';
import { onTargetValue } from './eventHelper';

type OnChangeFuncType = (func: (prev: any) => any) => void;

export const subValue =
  <TIn, TOut>(manipulateValue: (orig: TIn) => TOut) =>
  (onChange: OnChangeFuncType, propName: string, subPropName: string, displayFunc: (newValue: TOut) => void) =>
  (event: any) => {
    const func = onTargetValue((newValue: TIn) =>
      onChange((prev: any) => {
        displayFunc(manipulateValue(newValue));
        const propValue = prev[propName];
        return { ...prev, [propName]: { ...propValue, [subPropName]: manipulateValue(newValue) } };
      }),
    );
    func(event);
  };
export const subSubValue =
  <TIn, TOut>(manipulateValue: (orig: TIn) => TOut) =>
  (
    onChange: OnChangeFuncType,
    propName: string,
    subPropName: string,
    subSubPropName: string,
    displayFunc: (newValue: TOut) => void,
  ) =>
  (event: any) => {
    const func = onTargetValue((newValue: TIn) =>
      onChange((prev: any) => {
        displayFunc(manipulateValue(newValue));
        const propValue = prev[propName];
        const propSubValue = propValue[subPropName];
        return {
          ...prev,
          [propName]: {
            ...propValue,
            [subPropName]: { ...propSubValue, [subSubPropName]: manipulateValue(newValue) },
          },
        };
      }),
    );
    func(event);
  };

export const subNumber = subValue<string, number>((val) => +val);
export const subSubNumber = subSubValue<string, number>((val) => +val);
export const subString = subValue<string, string>((val) => val);

export const getValueOfSubProperty = (chart: any, propName: string, subPropName: string) =>
  chart?.[propName]?.[subPropName] ?? (defaultChartConfig as any)[propName]?.[subPropName];

export const getValueOfSubSubProperty = (chart: any, propName: string, subPropName: string, subSubPropName: string) =>
  chart?.[propName]?.[subPropName]?.[subSubPropName] ??
  (defaultChartConfig as any)[propName]?.[subPropName]?.[subSubPropName];
