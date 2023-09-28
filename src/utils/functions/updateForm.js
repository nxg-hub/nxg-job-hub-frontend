export const updateField = (value, fieldName, setState, data) =>{
  setState({
    ...data, [fieldName]: value
  })
  console.log(data)}
