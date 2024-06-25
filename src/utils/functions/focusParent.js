
/**
 * 
 * @description puts focus on input wrapper instead of input element
 * @satisfies hide the input element
 * @param {MouseEvent} e
 */
const focusParent = (e) => {

  const parent = e.target.parentNode;
  parent.style.borderColor = "#000000";
  parent.style.borderWidth = "1px";

  
};
export default focusParent