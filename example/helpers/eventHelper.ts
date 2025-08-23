export interface HtmlElementEvent<T> {
  target: {
    value: T;
  };
}

export interface ClickEvent {
  preventDefault: () => void;
  stopPropagation: () => void;
  button: number;
}

export const onTargetValue =
  <T>(funcOnEvent: (result: T) => void) =>
  (event: HtmlElementEvent<T>) => {
    const value = event.target?.value;
    if (value == null) return;

    funcOnEvent(value);
  };

export const preventDefault = (event: any) => {
  event?.preventDefault?.();
  return event;
};
