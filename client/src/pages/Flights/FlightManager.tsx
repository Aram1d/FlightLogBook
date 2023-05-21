import { FlightRecordForm } from "./FlightRecordForm";
import { FlightTable } from "./FlightTable";
import { makeTableFormManager } from "../../layout/managerFactory";

export const FlightManager = makeTableFormManager({
  Form: FlightRecordForm,
  Table: FlightTable,
});
