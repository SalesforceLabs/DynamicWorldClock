import { LightningElement, track } from "lwc";

const columns = [
  {
    label: "Label",
    fieldName: "label",
    initialWidth: 182
  },
  {
    label: "Name",
    fieldName: "name",
    initialWidth: 109
  },
  {
    label: "Type",
    fieldName: "type",
    initialWidth: 66
  },
  {
    label: "Required",
    fieldName: "required",
    type: "boolean",
    initialWidth: 73
  },
  {
    label: "Default",
    fieldName: "default",
    initialWidth: 116
  },
  {
    label: "Description",
    fieldName: "description"
  }
];

const appPageData = [
  {
    name: "showCard",
    type: "Boolean",
    required: false,
    default: "true",
    label: "Show Card",
    description: "Hide/Show the surrounding SLDS card."
  },
  {
    name: "icon",
    type: "String",
    required: false,
    default: "custom:custom25",
    label: "SLDS Icon",
    description:
      "SLDS Icon names in the format 'utility:down' - 'utility' = category, and 'down' = specific icon to be displayed."
  },
  {
    name: "cardTitle",
    type: "String",
    required: false,
    default: "Dynamic World Clock",
    label: "Card Title",
    description: "The title of the clock card."
  },
  {
    name: "hideSystemTime",
    type: "Boolean",
    required: false,
    default: "false",
    label: "Hide System Time",
    description: "Hide/Show the system time."
  },
  {
    name: "additionalTimeLocations",
    type: "String",
    required: false,
    default: "Dublin,New York",
    label: "Additional Time Locations",
    description: "A comma seperated list of locations to derive time from."
  }
];

const recordPageData = [
  {
    name: "showCard",
    type: "Boolean",
    required: false,
    default: "true",
    label: "Show Card",
    description: "Hide/Show the surrounding SLDS card."
  },
  {
    name: "icon",
    type: "String",
    required: false,
    default: "custom:custom25",
    label: "SLDS Icon",
    description:
      "SLDS Icon names in the format 'utility:down' - 'utility' = category, and 'down' = specific icon to be displayed."
  },
  {
    name: "cardTitle",
    type: "String",
    required: false,
    default: "Dynamic World Clock",
    label: "Card Title",
    description: "The title of the clock card."
  },
  {
    name: "sourceTimeField",
    type: "Reference",
    required: true,
    default: "<Record Field>",
    label: "Source Time Field",
    description: "Standard or Custom Field in which to derive a time from."
  },
  {
    name: "hideSystemTime",
    type: "Boolean",
    required: false,
    default: "false",
    label: "Hide System Time",
    description: "Hide/Show the system time."
  },
  {
    name: "additionalTimeLocations",
    type: "String",
    required: false,
    default: "Dublin,New York",
    label: "Additional Time Locations",
    description: "A comma seperated list of locations to derive time from."
  }
];

const utilityBarData = [
  {
    name: "showCard",
    type: "Boolean",
    required: false,
    default: "true",
    label: "Show Card",
    description: "Hide/Show the surrounding SLDS card."
  },
  {
    name: "icon",
    type: "String",
    required: false,
    default: "custom:custom25",
    label: "SLDS Icon",
    description:
      "SLDS Icon names in the format 'utility:down' - 'utility' = category, and 'down' = specific icon to be displayed."
  },
  {
    name: "cardTitle",
    type: "String",
    required: false,
    default: "Dynamic World Clock",
    label: "Card Title",
    description: "The title of the clock card."
  },
  {
    name: "hideSystemTime",
    type: "Boolean",
    required: false,
    default: "false",
    label: "Hide System Time",
    description: "Hide/Show the system time."
  },
  {
    name: "additionalTimeLocations",
    type: "String",
    required: false,
    default: "Dublin,New York",
    label: "Additional Time Locations",
    description: "A comma seperated list of locations to derive time from."
  }
];

export default class LwcInfoTable extends LightningElement {
  @track columns = columns;
  @track appPageData = appPageData;
  @track recordPageData = recordPageData;
  @track utilityBarData = utilityBarData;
}
