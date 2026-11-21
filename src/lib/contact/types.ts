export type FieldName =
  | "fullName"
  | "company"
  | "country"
  | "email"
  | "phone"
  | "products"
  | "volume"
  | "message";

export type FieldErrorCode =
  | "required"
  | "invalid_email"
  | "invalid_phone"
  | "too_short"
  | "too_long";

export type ContactFormValues = {
  fullName: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  products: string[];
  volume: string;
  message: string;
};

export type ContactFormState = {
  status: "idle" | "success" | "error";
  fieldErrors: Partial<Record<FieldName, FieldErrorCode>>;
  values: ContactFormValues;
  formError?: "send_failed" | "disabled";
};

export const emptyContactValues: ContactFormValues = {
  fullName: "",
  company: "",
  country: "",
  email: "",
  phone: "",
  products: [],
  volume: "",
  message: "",
};

export const initialContactFormState: ContactFormState = {
  status: "idle",
  fieldErrors: {},
  values: emptyContactValues,
};
