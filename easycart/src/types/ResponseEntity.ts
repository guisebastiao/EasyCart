import { PagingResponse } from "@/types/PagingResponse";
import { FieldErrorResponse } from "@/types/FieldErrorResponse";

export interface ResponseEntity<T = any> {
  status: number;
  message: string;
  data: T;
  success: boolean;
  isAuthenticated: boolean;
  paging: PagingResponse;
  fieldErrors: FieldErrorResponse[];
}
