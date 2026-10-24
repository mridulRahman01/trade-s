import { Resolver, FieldValues, ResolverOptions, ResolverResult } from "react-hook-form";
import { z } from "zod";
import { toNestErrors } from "@hookform/resolvers";

/**
 * Compatible Zod resolver for React Hook Form that supports Zod v4 (issues array)
 * and safely nests errors using @hookform/resolvers without explicit any.
 */
export function zodResolver<T extends FieldValues>(
  schema: z.ZodType
): Resolver<T> {
  return async (values: T, _context: unknown, options: ResolverOptions<T>): Promise<ResolverResult<T>> => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data as T, errors: {} };
    }

    const rawErrors: Record<string, { type: string; message: string }> = {};
    for (const issue of result.error.issues) {
      const field = issue.path.join(".");
      if (!rawErrors[field]) {
        rawErrors[field] = {
          type: issue.code || "validation",
          message: issue.message,
        };
      }
    }

    return {
      values: {} as Record<string, never>,
      errors: toNestErrors(rawErrors, options),
    } as ResolverResult<T>;
  };
}
