import { BlankWindowComponent } from './BlankWindow'
import { SimpleWindowComponent } from './SimpleWindow'

export function getComponent(type: string) {
  if (type == BlankWindowComponent.name) return BlankWindowComponent

  return SimpleWindowComponent
}
