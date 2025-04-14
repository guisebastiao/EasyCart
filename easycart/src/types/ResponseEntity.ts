import { Paging } from "@/types/Paging";
import { FieldError } from "@/types/FieldError";

export interface ResponseEntity<T = any> {
  token(token: any): unknown;
  status: number;
  message: string;
  data: T;
  success: boolean;
  isAuthenticated: boolean;
  paging: Paging;
  fieldErrors: FieldError[];
}
