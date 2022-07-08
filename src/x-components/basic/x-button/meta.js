import XButton from "./XButton.vue";
import PropertyForm from "./PropertyForm.vue";
import EventForm from "./EventForm.vue";

export default {
  name: "x-button",
  component: XButton,
  title: "按钮",
  group: "basic",
  panel: {
    propertyForm: PropertyForm,
    eventForm: EventForm,
  },
  export: {
    events: [
      {
        name: "click",
        title: "点击按钮",
        args: ["e"],
      },
    ],
  },
};
