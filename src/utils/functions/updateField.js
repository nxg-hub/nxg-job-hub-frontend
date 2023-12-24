/**
 *
 * @param {SetStateAction} setState

 */
export const updateField = (e, setState) => {
  let value = e.target.value;
  const field = e.target.name;
  setState((data) => {
    console.log(data)
  return  ({
      ...data,
      [field]: value,
    }
  
    );
  })
};
