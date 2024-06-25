/**
 * @description Removes focus from input wrapper
 * @param {MouseEvent} e
 */
const blurParent = (e) => {
  const parent = e.target.parentNode;
  parent.style.borderColor = "rgb(194, 192, 192)";
  parent.style.borderWidth = "1px";
};
export default blurParent;
