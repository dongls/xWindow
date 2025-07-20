import IconClose from './close.svg?raw'
import IconMax from './max.svg?raw'
import IconWindow from './window.svg?raw'
import IconPin from './pin.svg?raw'
import IconRestore from './restore.svg?raw'

export { IconClose, IconMax, IconPin, IconWindow, IconRestore }

export function useIcons(): Record<string, string> {
  return {
    IconClose,
    IconMax,
    IconPin,
    IconWindow,
    IconRestore,
  }
}
