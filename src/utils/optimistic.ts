import type { QueryClient } from "@tanstack/react-query";

export async function beginOptimistic<T>(
  queryClient: QueryClient,
  queryKey: readonly unknown[],
): Promise<{ previous: T | undefined }> {
  await queryClient.cancelQueries({ queryKey });
  return { previous: queryClient.getQueryData<T>(queryKey) };
}

export function rollback(
  queryClient: QueryClient,
  queryKey: readonly unknown[],
  previous: unknown,
) {
  if (previous !== undefined) {
    queryClient.setQueryData(queryKey, previous);
  }
}
