import { z } from "zod";
import { products } from "@/lib/products";
import type {
  ContactFormState,
  ContactFormValues,
  FieldErrorCode,
  FieldName,
} from "@/lib/contact/types";

const validProductIds = new Set(products.map((product) => product.id));

// The message of each rule is the error code the UI translates.
const requiredText = (max: number) =>
  z.string().trim().min(1, "required").max(max, "too_long");

const contactSchema = z.object({
  fullName: requiredText(100),
  company: requiredText(150),
  country: requiredText(100),
  email: requiredText(200).regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "invalid_email"),
  phone: requiredText(40).regex(/^[+\d\s().-]{5,40}$/, "invalid_phone"),
  products: z.array(z.string()),
  volume: z.string().trim().max(200, "too_long"),
  message: z
    .string()
    .trim()
    .min(1, "required")
    .min(10, "too_short")
    .max(2000, "too_long"),
});

function readText(formData: FormData, name: string) {
  const value = formData.get(name);

  return typeof value === "string" ? value : "";
}

export function readContactValues(formData: FormData): ContactFormValues {
  const selected = formData
    .getAll("products")
    .filter(
      (value): value is string =>
        typeof value === "string" && validProductIds.has(value),
    );

  return {
    fullName: readText(formData, "fullName"),
    company: readText(formData, "company"),
    country: readText(formData, "country"),
    email: readText(formData, "email"),
    phone: readText(formData, "phone"),
    products: [...new Set(selected)],
    volume: readText(formData, "volume"),
    message: readText(formData, "message"),
  };
}

export function validateContactValues(values: ContactFormValues) {
  const result = contactSchema.safeParse(values);

  if (result.success) {
    return { success: true as const, values: result.data };
  }

  const fieldErrors: ContactFormState["fieldErrors"] = {};

  for (const issue of result.error.issues) {
    const field = issue.path[0] as FieldName | undefined;

    if (field && !fieldErrors[field]) {
      fieldErrors[field] = issue.message as FieldErrorCode;
    }
  }

  return { success: false as const, fieldErrors };
}
