import { Children, cloneElement } from 'react'
import Icon from '../Icon'

const FormField = ({ icons = [], ...props }) => {
  const childrenCount = Children.count(props.children)

  let elementWrapperClass = ''

  switch (childrenCount) {
    case 2:
      elementWrapperClass = 'grid grid-cols-1 gap-3 md:grid-cols-2'
      break
    case 3:
      elementWrapperClass = 'grid grid-cols-1 gap-3 md:grid-cols-3'
  }

  const controlClassName = [
    props.className,
    'px-3 py-2 max-w-full border-gray-700 rounded w-full dark:placeholder-gray-400',
    'focus:ring-1 focus:ring-blue-600 focus:border-blue-600 focus:outline-none',
    props.hasTextareaHeight ? 'h-24' : 'h-12',
    props.isBorderless ? 'border-0' : 'border',
    props.isTransparent ? 'bg-transparent' : 'bg-white dark:bg-slate-800',
  ].join(' ')

  return (
    <div className="mb-6 last:mb-0 w-full">
      {props.label && (
        <label
          htmlFor={props.labelFor}
          className={`block font-bold mb-2 ${props.labelFor ? 'cursor-pointer' : ''}`}
        >
          {props.label}
        </label>
      )}
      <div className={`${elementWrapperClass}`}>
        {Children.map(props.children, (child, index) => (
          <div className="relative">
            {cloneElement(child, {
              className: `${controlClassName} ${icons[index] ? 'pl-10' : ''}`,
            })}
            {icons[index] && (
              <Icon
                path={icons[index]}
                w="w-10"
                h={props.hasTextareaHeight ? 'h-full' : 'h-12'}
                className="absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"
              />
            )}
          </div>
        ))}
      </div>
      {props.help && (
        <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">{props.help}</div>
      )}
    </div>
  )
}

export default FormField
