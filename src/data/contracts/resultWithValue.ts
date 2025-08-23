export type Result =
  | {
      isSuccess: true;
    }
  | {
      isSuccess: false;
      errorMessage: string;
      errorCode?: number;
    };

export type ResultWithValue<T> =
  | {
      isSuccess: true;
      value: T;
    }
  | {
      isSuccess: false;
      errorMessage: string;
      errorCode?: number;
    };
