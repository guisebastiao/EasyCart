import { TextInputProps } from "react-native";
import { FieldError } from "react-hook-form";

export interface InputProps extends TextInputProps {
  type: "text" | "password";
  name: string;
  msgError?: FieldError;
}
