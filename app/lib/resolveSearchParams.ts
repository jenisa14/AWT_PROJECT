/**
 * Resolve searchParams for list pages (Next 15 may pass Promise).
 */
export async function resolveMsg(
  searchParams: Promise<{ msg?: string }> | { msg?: string } | undefined
): Promise<string | undefined> {
  if (!searchParams) return undefined;
  const resolved =
    typeof (searchParams as Promise<{ msg?: string }>).then === "function"
      ? await (searchParams as Promise<{ msg?: string }>)
      : (searchParams as { msg?: string });
  return resolved?.msg;
}
