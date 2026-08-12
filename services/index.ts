/**
 * Service layer placeholders — call Prisma / external APIs from here.
 * Keep Server Components thin by importing services.
 */

export async function healthCheck(): Promise<{ ok: boolean }> {
  return { ok: true };
}
