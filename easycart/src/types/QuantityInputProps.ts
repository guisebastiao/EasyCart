import { TextInputProps } from "react-native";
import { FieldError } from "react-hook-form";
import { Units } from "@/types/Units";

export interface QuantityInputProps extends TextInputProps {
  quantity: number;
  unit: Units;
  onChangeQuantity: (value: number) => void;
  onChangeUnit: (unit: Units) => void;
  msgError?: FieldError | null;
  dropDownUp?: boolean;
}
