import type {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
  RefCallBack,
  UseFormWatch,
} from "react-hook-form";

export type FieldProps<T = string> = {
  value: T;
  onChange: (value: T | React.ChangeEvent<unknown>) => void;
  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
  ref?: RefCallBack;
};

export interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export interface FormWatch<T extends FieldValues> {
  watch: UseFormWatch<T>;
}

export interface FormInputProps<T extends FieldValues>
  extends Omit<FormFieldProps<T>, "name"> {
  field: ControllerRenderProps<T, Path<T>>;
}
