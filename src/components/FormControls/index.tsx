import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { useId } from "react";
import { Link } from "react-router-dom";
import { cn } from "tailwind-variants";

import { Button } from "../Button";
import { formControlVariants } from "./formControlVariants";

type FieldPresentationProps = {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  labelClassName?: string;
  className?: string;
  wrapperClassName?: string;
  focusStyle?: "ring" | "border";
};

type FormInputProps = FieldPresentationProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "id"> & {
    leadingAdornment?: ReactNode;
  };

type FormLabelProps = {
  htmlFor: string;
  children: ReactNode;
  className?: string;
};

export function FormLabel({ htmlFor, children, className }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "mb-2 block text-sm font-semibold text-gray-700",
        className,
      )}
    >
      {children}
    </label>
  );
}

export function FormInput({
  id,
  label,
  description,
  focusStyle = "ring",
  leadingAdornment,
  labelClassName,
  className,
  wrapperClassName,
  ...inputProps
}: FormInputProps) {
  return (
    <div className={wrapperClassName}>
      <FormLabel htmlFor={id} className={labelClassName}>
        {label}
      </FormLabel>
      {leadingAdornment ? (
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
            {leadingAdornment}
          </span>
          <input
            {...inputProps}
            id={id}
            className={cn(
              formControlVariants({ focusStyle }),
              "pl-12 pr-4",
              className,
            )}
          />
        </div>
      ) : (
        <input
          {...inputProps}
          id={id}
          className={cn(formControlVariants({ focusStyle }), className)}
        />
      )}
      {description && (
        <p className="mt-2 text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
}

type FormTextareaProps = FieldPresentationProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className" | "id">;

export function FormTextarea({
  id,
  label,
  description,
  focusStyle = "ring",
  labelClassName,
  className,
  wrapperClassName,
  ...textareaProps
}: FormTextareaProps) {
  return (
    <div className={wrapperClassName}>
      <FormLabel htmlFor={id} className={labelClassName}>
        {label}
      </FormLabel>
      <textarea
        {...textareaProps}
        id={id}
        className={cn(
          formControlVariants({ resize: "vertical", focusStyle }),
          className,
        )}
      />
      {description && (
        <p className="mt-2 text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
}

type FormSelectProps = FieldPresentationProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "className" | "id"> & {
    children: ReactNode;
  };

export function FormSelect({
  id,
  label,
  description,
  focusStyle = "ring",
  labelClassName,
  className,
  wrapperClassName,
  children,
  ...selectProps
}: FormSelectProps) {
  return (
    <div className={wrapperClassName}>
      <FormLabel htmlFor={id} className={labelClassName}>
        {label}
      </FormLabel>
      <select
        {...selectProps}
        id={id}
        className={cn(
          formControlVariants({ focusStyle }),
          "bg-white",
          className,
        )}
      >
        {children}
      </select>
      {description && (
        <p className="mt-2 text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
}

type FormSwitchProps = {
  label: ReactNode;
  description?: ReactNode;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
};

type FormCheckboxProps = {
  label: ReactNode;
  description?: ReactNode;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  checkboxClassName?: string;
};

export function FormCheckbox({
  label,
  description,
  checked,
  disabled = false,
  onCheckedChange,
  className,
  checkboxClassName,
}: FormCheckboxProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-4",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onCheckedChange(event.target.checked)}
        disabled={disabled}
        className={cn("h-4 w-4", checkboxClassName)}
      />
      <span>
        <span className="block text-sm font-semibold text-gray-700">
          {label}
        </span>
        {description && (
          <span className="block text-xs text-gray-500">{description}</span>
        )}
      </span>
    </label>
  );
}

export function FormSwitch({
  label,
  description,
  checked,
  disabled = false,
  onCheckedChange,
  className,
}: FormSwitchProps) {
  const labelId = useId();

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg bg-gray-50 p-4",
        className,
      )}
    >
      <div>
        <p id={labelId} className="text-sm font-semibold text-gray-700">
          {label}
        </p>
        {description && (
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-labelledby={labelId}
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 rounded-full transition",
          checked ? "bg-blue-600" : "bg-gray-300",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        <span
          className={cn(
            "inline-block h-5 w-5 translate-y-0.5 rounded-full bg-white shadow transition",
            checked ? "translate-x-5" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  );
}

type FormSectionProps = {
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  headingClassName?: string;
  descriptionClassName?: string;
};

export function FormSection({
  title,
  description,
  children,
  className,
  headingClassName,
  descriptionClassName,
}: FormSectionProps) {
  return (
    <section className={cn("rounded-xl bg-white p-6 shadow-sm", className)}>
      {title && (
        <h2
          className={cn(
            "mb-5 text-lg font-semibold text-gray-900",
            headingClassName,
          )}
        >
          {title}
        </h2>
      )}
      {description && (
        <p className={cn("mb-5 text-sm text-gray-600", descriptionClassName)}>
          {description}
        </p>
      )}
      {children}
    </section>
  );
}

type FormErrorMessageProps = {
  message: string;
  className?: string;
};

export function FormErrorMessage({
  message,
  className,
}: FormErrorMessageProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700",
        className,
      )}
    >
      {message}
    </div>
  );
}

type FormActionsProps = {
  cancelTo: string;
  cancelLabel?: string;
  isSubmitting: boolean;
  submitLabel: string;
  submittingLabel: string;
  className?: string;
  cancelClassName?: string;
  submitClassName?: string;
};

export function FormActions({
  cancelTo,
  cancelLabel = "Cancelar",
  isSubmitting,
  submitLabel,
  submittingLabel,
  className,
  cancelClassName,
  submitClassName,
}: FormActionsProps) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
        className,
      )}
    >
      <Link
        to={cancelTo}
        className={cn(
          "inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50",
          cancelClassName,
        )}
      >
        {cancelLabel}
      </Link>
      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className={submitClassName}
      >
        {isSubmitting ? submittingLabel : submitLabel}
      </Button>
    </div>
  );
}
