import { useId } from "react";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { AlertIcon, ChevronDownIcon } from "./icons";

function fieldClasses(hasError: boolean, className = "") {
  return `w-full rounded-md border bg-surface px-3 py-2 font-sans text-sm text-ink transition-colors ${
    hasError ? "border-error" : "border-border-strong"
  } ${className}`;
}

interface FieldShellProps {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  errorId: string;
  children: ReactNode;
}

function FieldShell({
  id,
  label,
  optional,
  error,
  errorId,
  children,
}: FieldShellProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-sans text-sm font-medium text-ink">
        {label}
        {optional && (
          <span className="ml-1 font-normal text-text-muted">(optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={errorId}
          className="flex items-center gap-1.5 font-sans text-xs text-error"
        >
          <AlertIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  id?: string;
  label: string;
  optional?: boolean;
  error?: string;
}

export function TextInput({
  label,
  optional,
  error,
  id: idProp,
  className = "",
  ...props
}: TextInputProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;

  return (
    <FieldShell
      id={id}
      label={label}
      optional={optional}
      error={error}
      errorId={errorId}
    >
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={fieldClasses(!!error, className)}
        {...props}
      />
    </FieldShell>
  );
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> {
  id?: string;
  label: string;
  optional?: boolean;
  error?: string;
}

export function Select({
  label,
  optional,
  error,
  id: idProp,
  className = "",
  children,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;

  return (
    <FieldShell
      id={id}
      label={label}
      optional={optional}
      error={error}
      errorId={errorId}
    >
      <div className="relative">
        <select
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={fieldClasses(!!error, `appearance-none pr-9 ${className}`)}
          {...props}
        >
          {children}
        </select>
        <ChevronDownIcon
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          aria-hidden="true"
        />
      </div>
    </FieldShell>
  );
}

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  id?: string;
  label: string;
  optional?: boolean;
  error?: string;
}

export function Textarea({
  label,
  optional,
  error,
  id: idProp,
  className = "",
  rows = 4,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;

  return (
    <FieldShell
      id={id}
      label={label}
      optional={optional}
      error={error}
      errorId={errorId}
    >
      <textarea
        id={id}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={fieldClasses(!!error, className)}
        {...props}
      />
    </FieldShell>
  );
}
