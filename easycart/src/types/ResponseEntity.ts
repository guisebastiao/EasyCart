interface ResponseEntity<T = any> {
  status: number;
  message: string;
  data: T;
  success: boolean;
  isAuthenticated: boolean;
  paging: Paging;
  fieldErrors: FieldError[];
}
