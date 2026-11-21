"use client";

import { CircleCheck, LoaderCircle, Send, TriangleAlert } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { sendContactMessage } from "@/lib/contact/actions";
import {
  initialContactFormState,
  type FieldName,
} from "@/lib/contact/types";

type ProductOption = {
  id: string;
  name: string;
};

type ContactFormProps = {
  productOptions: ProductOption[];
};

const inputClass =
  "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/70 focus:border-olive-dark focus:outline-none focus:ring-2 focus:ring-olive/30";

type FieldProps = {
  name: FieldName;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

function Field({
  name,
  label,
  required,
  error,
  hint,
  children,
  className,
}: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-plum">
            {" "}
            *
          </span>
        ) : null}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint && !error ? (
        <p className="mt-1 text-xs text-muted">{hint}</p>
      ) : null}
      {error ? (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm({ productOptions }: ContactFormProps) {
  const t = useTranslations("Form");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const startedAtRef = useRef<HTMLInputElement>(null);
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialContactFormState,
  );

  useEffect(() => {
    if (startedAtRef.current) {
      startedAtRef.current.value = String(Date.now());
    }
  }, []);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-xl bg-olive/10 px-6 py-10 text-center"
      >
        <CircleCheck
          aria-hidden="true"
          className="h-12 w-12 text-olive-dark"
        />
        <h3 className="text-xl font-semibold text-plum">{t("successTitle")}</h3>
        <p className="max-w-md text-sm leading-6 text-muted">
          {t("successBody")}
        </p>
      </div>
    );
  }

  const preselected = searchParams.get("product");
  const selectedProducts =
    state.status === "error"
      ? state.values.products
      : preselected
        ? [preselected]
        : [];

  const errorFor = (name: FieldName) => {
    const code = state.fieldErrors[name];

    return code ? t(`errors.${code}`) : undefined;
  };

  const describedBy = (name: FieldName) =>
    state.fieldErrors[name] ? `${name}-error` : undefined;

  const borderFor = (name: FieldName) =>
    state.fieldErrors[name] ? "border-red-600" : "border-border";

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="startedAt" ref={startedAtRef} />
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className="text-xs text-muted">{t("requiredHint")}</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="fullName"
          label={t("fullName")}
          required
          error={errorFor("fullName")}
        >
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            defaultValue={state.values.fullName}
            aria-invalid={Boolean(state.fieldErrors.fullName)}
            aria-describedby={describedBy("fullName")}
            className={`${inputClass} ${borderFor("fullName")}`}
          />
        </Field>

        <Field
          name="company"
          label={t("company")}
          required
          error={errorFor("company")}
        >
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            maxLength={150}
            defaultValue={state.values.company}
            aria-invalid={Boolean(state.fieldErrors.company)}
            aria-describedby={describedBy("company")}
            className={`${inputClass} ${borderFor("company")}`}
          />
        </Field>

        <Field
          name="country"
          label={t("country")}
          required
          error={errorFor("country")}
        >
          <input
            id="country"
            name="country"
            type="text"
            autoComplete="country-name"
            required
            maxLength={100}
            defaultValue={state.values.country}
            aria-invalid={Boolean(state.fieldErrors.country)}
            aria-describedby={describedBy("country")}
            className={`${inputClass} ${borderFor("country")}`}
          />
        </Field>

        <Field
          name="email"
          label={t("email")}
          required
          error={errorFor("email")}
        >
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            defaultValue={state.values.email}
            aria-invalid={Boolean(state.fieldErrors.email)}
            aria-describedby={describedBy("email")}
            className={`${inputClass} ${borderFor("email")}`}
          />
        </Field>

        <Field
          name="phone"
          label={t("phone")}
          required
          error={errorFor("phone")}
          hint={t("phoneHint")}
          className="sm:col-span-2"
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={40}
            defaultValue={state.values.phone}
            aria-invalid={Boolean(state.fieldErrors.phone)}
            aria-describedby={describedBy("phone")}
            className={`${inputClass} ${borderFor("phone")}`}
          />
        </Field>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-foreground">
          {t("products")}{" "}
          <span className="font-normal text-muted">({t("optional")})</span>
        </legend>
        <p className="mt-1 text-xs text-muted">{t("productsHint")}</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {productOptions.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border px-3 py-2 text-sm text-foreground transition-colors hover:border-olive/60 has-[:checked]:border-olive-dark has-[:checked]:bg-olive/10"
            >
              <input
                type="checkbox"
                name="products"
                value={option.id}
                defaultChecked={selectedProducts.includes(option.id)}
                className="h-4 w-4 accent-olive-dark"
              />
              {option.name}
            </label>
          ))}
        </div>
      </fieldset>

      <Field
        name="volume"
        label={`${t("volume")} (${t("optional")})`}
        error={errorFor("volume")}
      >
        <input
          id="volume"
          name="volume"
          type="text"
          maxLength={200}
          placeholder={t("volumePlaceholder")}
          defaultValue={state.values.volume}
          aria-invalid={Boolean(state.fieldErrors.volume)}
          aria-describedby={describedBy("volume")}
          className={`${inputClass} ${borderFor("volume")}`}
        />
      </Field>

      <Field
        name="message"
        label={t("message")}
        required
        error={errorFor("message")}
      >
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={2000}
          placeholder={t("messagePlaceholder")}
          defaultValue={state.values.message}
          aria-invalid={Boolean(state.fieldErrors.message)}
          aria-describedby={describedBy("message")}
          className={`${inputClass} ${borderFor("message")}`}
        />
      </Field>

      {state.formError ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <TriangleAlert
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0"
          />
          {state.formError === "disabled" ? t("disabled") : t("sendFailed")}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-plum-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? (
          <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
        ) : (
          <Send aria-hidden="true" className="h-4 w-4" />
        )}
        {isPending ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
