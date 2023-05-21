import { useAircaftsRegsQuery } from "../api/gqlTypes";
import { uniq } from "lodash-es";
import { useState } from "react";

export const useAircraftsList = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [{ data }] = useAircaftsRegsQuery();

  const acftModels = uniq(
    data?.aircrafts.items.map((acft) => acft.model) ?? []
  );
  const acftRegs = selectedModel
    ? data?.aircrafts.items
        .filter((acft) => acft.model === selectedModel)
        .map((acft) => ({
          label: acft.registration,
          value: acft.id,
        })) ?? []
    : data?.aircrafts.items.map((acft) => ({
        label: acft.registration,
        value: acft.id,
      })) ?? [];

  return {
    acftModels,
    acftRegs,
    selectedModel,
    setSelectedModel,
    setAircraftId: (id: string | null) => {
      setSelectedModel(
        data?.aircrafts.items.find((acft) => acft.id === id)?.model ?? null
      );
    },
  };
};
