import type { Tag } from '@/models/tag'

export interface AssignmentType {
  name: String
  complete: boolean
  id: number
  tags: Tag[]
}
