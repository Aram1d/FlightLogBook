import { AircraftForm } from "./AircraftForm";
import { AircraftsTable } from "./AircraftsTable";
import { makeTableFormManager } from "@lib";

export const AircraftsManager = makeTableFormManager({
  Form: AircraftForm,
  Table: AircraftsTable,
  tableWrapper: {
    title: "Aircrafts"
  }
});
