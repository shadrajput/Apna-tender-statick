const FormCheckRadio = (props) => {
  return (
    <label className={`${props.type} ${props.className}`}>
      {props.children}
      <span className="check" />
      <span className="pl-2">{props.label}</span>
    </label>
  )
}

export default FormCheckRadio
