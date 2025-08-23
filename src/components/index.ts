import { BlankWindowComponent } from './BlankWindow'
import { SimpleWindowComponent } from './SimpleWindow'
import { TabsWindowComponent } from './TabsWindow'

export function getComponent(type: string) {
  switch (type) {
    case 'SimpleWindow':
      return SimpleWindowComponent
    case 'TabsWindow':
      return TabsWindowComponent
    default:
      return BlankWindowComponent
  }
}
