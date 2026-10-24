import * as React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  id,
  label,
  required,
  error,
  hint,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={`space-y-1.5 ${className || ""}`}>
      <label
        htmlFor={id}
        className="block text-xs sm:text-sm font-bold text-slate-800"
      >
        {label}
        {required && (
          <span className="text-amber-700 ml-1 font-black" aria-label="required">
            *
          </span>
        )}
      </label>

      {children}

      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-slate-500">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${id}-error`} className="text-xs font-semibold text-rose-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
