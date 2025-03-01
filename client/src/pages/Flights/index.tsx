import { FlightRecordForm } from "./FlightRecordForm";
import { FlightTable } from "./FlightTable";
import { makeTableFormManager } from "@lib";

export const FlightManager = makeTableFormManager({
  Form: FlightRecordForm,
  Table: FlightTable,
  tableWrapper: {
    title: "Flights"
  }
});
