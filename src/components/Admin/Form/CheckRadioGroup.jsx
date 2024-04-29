import { Children, cloneElement } from 'react'

const FormCheckRadioGroup = (props) => {
  return (
    <div className={`flex justify-start flex-wrap -mb-3 ${props.isColumn ? 'flex-col' : ''}`}>
      {Children.map(props.children, (child) =>
        cloneElement(child, { className: `mr-6 mb-3 last:mr-0 ${child.props.className}` })
      )}
    </div>
  )
}

export default FormCheckRadioGroup
