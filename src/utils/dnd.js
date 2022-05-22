import $ from "jquery";

export function bindDndTargetEvents(el) {
  el.on("mouseenter", function () {
    this.classList.add("hover");
    $(this).parents("div.dnd-target").removeClass("hover");
  });
  el.on("mouseleave", function () {
    this.classList.remove("hover");
  });
}
