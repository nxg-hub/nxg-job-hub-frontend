import React from 'react'

const TextField = ({type, value, name, onchange, id, autoFocus, disabled}) => {
  return (
    <input disabled={disabled} autoFocus={autoFocus} onChange={onchange} value={value} id={id} name={name} type={type} />
  )
}

export default TextField