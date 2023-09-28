export const updateField = (value, fieldName, setState, data) =>{
  setState({
    ...data, [fieldName]: value
  })}
