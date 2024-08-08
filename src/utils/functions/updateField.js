/**
 *
 * @param {SetStateAction} setState

 */
export const updateField = (e, setState) => {
  const value = e.target.value;
  const field = e.target.name;

  setState((data) => {
    // Convert the tags field to an array if the field is "tags"
    if (field === "tags") {
      const tagsArray = value.split(",").map((tag) => tag.trim());
      return {
        ...data,
        [field]: tagsArray,
      };
    }

    return {
      ...data,
      [field]: value,
    };
  });
};




// /**
//  *
//  * @param {SetStateAction} setState

//  */
// export const updateField = (e, setState) => {
//   let value = e.target.value;
//   const field = e.target.name;
//   setState((data) => {
//   return  ({
//       ...data,
//       [field]: value,
//     }
  
//     );
//   })
// };
