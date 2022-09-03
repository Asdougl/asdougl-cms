import {
  faArrowsSpin,
  faAtom,
  faCircleQuarters,
  faCircleQuestion,
  faFaceThinking,
  faHatWizard,
  faHurricane,
  faRotate,
  faSpinnerThird,
  faTire,
} from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef } from 'react'
import { randomFromArray } from '../utils/helpers'

const icons = [
  faSpinnerThird,
  faHurricane,
  faAtom,
  faRotate,
  faTire,
  faCircleQuarters,
  faArrowsSpin,
  faFaceThinking,
  faCircleQuestion,
  faHatWizard,
]

export const Loader = () => {
  const icon = useRef(randomFromArray(icons))
  return (
    <div className="relative h-8 w-8 rounded-full text-primary-400">
      <FontAwesomeIcon icon={icon.current} fixedWidth spin size="2x" />
    </div>
  )
}

export const FullLoader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center py-24">
      <Loader />
    </div>
  )
}

export const MiniLoader = () => {
  return (
    <div className="relative inline-block h-4 w-4 rounded-full">
      <FontAwesomeIcon icon={faSpinnerThird} fixedWidth spin />
    </div>
  )
}
