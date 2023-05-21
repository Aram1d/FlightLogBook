import { makeTableFormManager } from "../../layout/managerFactory";
import { AircraftForm } from "./AircraftForm";
import { AircraftsTable } from "./AircraftsTable";

export const AircraftsManager = makeTableFormManager({
  Form: AircraftForm,
  Table: AircraftsTable,
});
