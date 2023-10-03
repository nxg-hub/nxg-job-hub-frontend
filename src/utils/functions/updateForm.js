 /**
 *
 *
 * @param {PointerEventValue} value
 * @param {FormDataKey} fieldName
 * @param {SetStateAction} setState
 * @param {FormData} data
 */
export const updateField = (value, fieldName, setState, data) =>{
  setState({
    ...data, [fieldName]: value
  })}
