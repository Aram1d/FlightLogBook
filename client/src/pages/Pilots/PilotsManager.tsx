import { PilotsTable } from "./PilotsTable";
import { PilotForm } from "./PilotForm";
import { makeTableFormManager } from "../../layout/managerFactory";

export const PilotsManager = makeTableFormManager({
  Form: PilotForm,
  Table: PilotsTable,
});
