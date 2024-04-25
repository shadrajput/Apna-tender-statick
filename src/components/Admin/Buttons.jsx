import { Children, cloneElement } from 'react'

const Buttons = ({
  type = 'justify-start',
  mb = '-mb-3',
  classAddon = 'mr-3 last:mr-0 mb-3',
  noWrap = false,
  children,
  className,
}) => {
  return (
    <div
      className={`flex items-center ${type} ${className} ${mb} ${
        noWrap ? 'flex-nowrap' : 'flex-wrap'
      }`}
    >
      {Children.map(children, (child) =>
        child ? cloneElement(child, { className: `${classAddon} ${child.props.className}` }) : null
      )}
    </div>
  )
}

export default Buttons
