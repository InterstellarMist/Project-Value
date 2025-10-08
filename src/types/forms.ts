import type { RefCallBack } from "react-hook-form";

export type FormFieldProps<T = string> = {
  value: T;
  onChange: (val: T) => void;
  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
  ref?: RefCallBack;
};
