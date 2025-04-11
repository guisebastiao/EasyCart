import { TextInputProps } from "react-native";
import { Units } from "./Units";

export interface QuantityInputProps extends TextInputProps {
  value: string;
  unit: Units;
  onChangeValue: (value: string) => void;
  onChangeUnit: (unit: Units) => void;
}
