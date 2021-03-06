import XFormInput from "./XFormInput.vue";
import PropertyForm from "./PropertyForm.vue";
import EventForm from "./EventForm.vue";

export default {
  name: "x-form-input",
  component: XFormInput,
  title: "单行文本",
  group: "form",
  panel: {
    propertyForm: PropertyForm,
    eventForm: EventForm,
  },
  export: {
    events: [
      {
        name: "click",
        args: ["e"],
      },
    ],
    methods: [
      {
        name: "getValue",
        args: [],
      },
    ],
  },
};
