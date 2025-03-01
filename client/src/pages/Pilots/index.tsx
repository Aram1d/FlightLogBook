import { PilotsTable } from "./PilotsTable";
import { PilotForm } from "./PilotForm";
import { makeTableFormManager } from "@lib";

export const PilotsManager = makeTableFormManager({
  Form: PilotForm,
  Table: PilotsTable,
  tableWrapper: {
    title: "Pilots"
  }
});
