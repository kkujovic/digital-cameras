import type { Camera } from '@/types/camera'

const BASE = '/api/cameras'

export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number   // 0-based current page
  size: number
}

export async function fetchCameras(
  page: number,
  size: number,
  search: string,
): Promise<PageResponse<Camera>> {
  const params = new URLSearchParams({ page: String(page), size: String(size) })
  if (search) params.set('search', search)
  const res = await fetch(`${BASE}?${params}`)
  if (!res.ok) throw new Error('Failed to fetch cameras')
  return res.json()
}

export async function updateCamera(id: number, camera: Camera): Promise<Camera> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(camera),
  })
  if (!res.ok) throw new Error('Failed to update camera')
  return res.json()
}

export async function createCamera(camera: Omit<Camera, 'id'>): Promise<Camera> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(camera),
  })
  if (!res.ok) throw new Error('Failed to create camera')
  return res.json()
}

export async function deleteCamera(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete camera')
}
