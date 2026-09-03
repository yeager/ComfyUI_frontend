import { generateUUID } from '@comfyorg/shared-frontend-utils/formatUtil'

// Using a template string for this is resulting in complex type workarounds. No current benefit beyond dev reading.
export type UUID = string

/** Special-case zero-UUID, consisting entirely of zeros. Used as a default value. */
export const zeroUuid = '00000000-0000-0000-0000-000000000000'

/**
 * Creates a UUIDv4 string.
 * @returns A new UUIDv4 string
 * @throws When the Web Crypto API is unavailable
 */
export function createUuidv4(): UUID {
  return generateUUID()
}

/** Ensures an entity has a stable, non-zero UUID and returns it. */
export function ensureNonZeroUuid(entity: { id: UUID }): UUID {
  if (entity.id === zeroUuid) entity.id = createUuidv4()
  return entity.id
}
