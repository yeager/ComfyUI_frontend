import { describe, expect, it, vi } from 'vitest'

import { createUuidv4, ensureNonZeroUuid, zeroUuid } from './uuid'

describe('createUuidv4', () => {
  it('uses secure random values when randomUUID is unavailable', () => {
    vi.stubGlobal('crypto', {
      getRandomValues: (bytes: Uint8Array) => bytes.fill(0)
    })

    expect(createUuidv4()).toBe('00000000-0000-4000-8000-000000000000')
  })

  it('throws when Web Crypto is unavailable', () => {
    vi.stubGlobal('crypto', undefined)

    expect(() => createUuidv4()).toThrow(
      'Web Crypto is required to generate a UUID'
    )
  })
})

describe('ensureNonZeroUuid', () => {
  it('replaces the zero uuid and returns the new id', () => {
    const entity = { id: zeroUuid }

    const id = ensureNonZeroUuid(entity)

    expect(id).not.toBe(zeroUuid)
    expect(entity.id).toBe(id)
  })

  it('keeps an existing non-zero id', () => {
    const entity = { id: 'ffffffff-ffff-4fff-bfff-ffffffffffff' }

    expect(ensureNonZeroUuid(entity)).toBe(entity.id)
  })
})
