import { useCallback, useEffect, useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { DateValue } from "@mantine/dates";
import dayjs from "dayjs";
import { z } from "zod";
import { AddFlightInput, AircraftClass, useLastFlightDateQuery } from "@api";
import { useAircraftsList } from "@hooks";

export const useFlightRecordState = () => {
  const [{ data }] = useLastFlightDateQuery();

  const { getInputProps, values, setFieldValue, ...restForm } =
    useForm<AddFlightInput>({
      initialValues: {
        departure: {
          place: "",
          date: null
        },
        arrival: {
          place: "",
          date: null
        },
        aircraft: "",
        aircraftClass: AircraftClass.SingleEngine,
        totalFlightTime: 0,
        pic: "",
        landings: {
          day: 0,
          night: 0
        },
        ifrApproaches: 0,
        operationalTime: {
          night: 0,
          ifr: 0
        },
        pilotFunctionTime: {
          pic: 0,
          coPilot: 0,
          dualCommand: 0,
          instructor: 0
        },
        simulatorType: "",
        remarks: ""
      },
      validate: values => {
        const tft = dayjs(values.arrival.date).diff(
          dayjs(values.departure.date),
          "minute"
        );

        return zodResolver(
          z.object({
            departure: z.object({
              place: z
                .string()
                .nonempty("Departure place is required")
                .length(4, "Departure place should have 4 characters"),
              date: z.date()
            }),
            arrival: z.object({
              place: z
                .string()
                .nonempty("Arrival place is required")
                .length(4, "Departure place should have 4 characters"),
              date: z
                .date()
                .min(
                  dayjs(values.departure.date).add(1, "m").toDate(),
                  "Arrival time should be after departure time"
                )
            }),
            aircraft: values.simulatorType
              ? z.string().nullable()
              : z
                  .string()
                  .nonempty(
                    "Aircraft is required unless you fill the simulation section"
                  ),
            totalFlightTime: z.literal(tft),
            pic: z
              .string()
              .nonempty("PIC is required")
              .nonempty("PIC is required"),
            landings: z.object({
              day: z.number().min(0, "Landings should be positive"),
              night: z.number().min(0, "Landings should be positive")
            }),
            operationalTime: z.object({
              night: z
                .number()
                .min(0, "Operational time should be positive")
                .max(
                  tft,
                  "Operational time should not be longer than total flight time"
                ),
              ifr: z
                .number()
                .min(0, "Operational time should be positive")
                .max(
                  tft,
                  "Operational time should not be longer than total flight time"
                )
            }),
            pilotFunctionTime: z.object({
              pic: z
                .number()
                .min(0, "PIC time should be positive")
                .max(
                  tft,
                  "PIC time should not be longer than total flight time"
                ),
              coPilot: z
                .number()
                .min(0, "Co-pilot time should be positive")
                .max(
                  tft,
                  "Co-pilot time should not be longer than total flight time"
                ),
              dualCommand: z
                .number()
                .min(0, "Dual command time should be positive")
                .max(
                  tft,
                  "Dual command time should not be longer than total flight time"
                ),
              instructor: z
                .number()
                .min(0, "Instructor time should be positive")
                .max(
                  tft,
                  "Instructor time should not be longer than total flight time"
                )
            })
          })
        )(values);
      }
    });

  useEffect(() => {
    setFieldValue("departure.date", data?.lastFlightDate ?? null);
  }, [data?.lastFlightDate]); // eslint-disable-line react-hooks/exhaustive-deps

  const acftList = useAircraftsList();

  const [adapter, setAdapter] = useState<"a" | "d">("a");

  const setDepartureTime = useCallback(
    (depDate: DateValue) => {
      setFieldValue("departure.date", depDate);
      if (values.arrival.date)
        setFieldValue(
          "totalFlightTime",
          depDate ? dayjs(values.arrival.date).diff(depDate, "minute") : 0
        );
      else setFieldValue("arrival.date", depDate);
    },
    [values.arrival.date] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const setArrivalTime = useCallback(
    (arrDate: DateValue) => {
      setFieldValue("arrival.date", arrDate);
      if (values.departure.date) {
        setFieldValue(
          "totalFlightTime",
          arrDate ? dayjs(arrDate).diff(values.departure.date, "minute") : 0
        );
      }
    },
    [values.departure.date] //eslint-disable-line react-hooks/exhaustive-deps
  );

  const setTotalFlightTime = useCallback(
    (duration: number) => {
      setFieldValue("totalFlightTime", duration);
      if (adapter === "a" && values.departure.date) {
        setFieldValue(
          "arrival.date",
          dayjs(values.departure.date).add(duration, "minute").toDate()
        );
      } else if (adapter === "d" && values.arrival.date) {
        setFieldValue(
          "departure.date",
          dayjs(values.arrival.date).subtract(duration, "minute").toDate()
        );
      }
    },
    [values.arrival.date, values.departure.date, adapter] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const setSimulationAcftType = useCallback(
    (acftType: string | null) => {
      setFieldValue("simulatorType", acftType);
      setFieldValue("aircraft", null);
      acftList.setSelectedModel(null);
    },

    //acftType passed as arg
    [acftList.setSelectedModel] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return {
    getInputProps,
    values,
    adapter,
    setAdapter,
    setFieldValue,
    ...restForm,

    acftList: {
      ...acftList,
      setSelectedModel: (model: string | null) => {
        acftList.setSelectedModel(model);
        setFieldValue("simulatorType", null);
      }
    },

    customHandlers: {
      setDepartureTime,
      setArrivalTime,
      setTotalFlightTime,
      setSimulationAcftType
    }
  };
};
