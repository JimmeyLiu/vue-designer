import $ from "jquery";

// function _removeParentHover(el, origin) {
//   if (el.id === "container") {
//     return;
//   }
//   if (el !== origin && el.tagName === "DIV") {
//     console.log("remove " + el);
//     // el.classList.remove("hover");
//   }
//   _removeParentHover(el.parentElement, origin);
// }

export function removeParentHover(el) {
    $(el).parents("div").css
}
