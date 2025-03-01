import { useEffect, useState } from "react";
import { Combobox, TextInput, useCombobox } from "@mantine/core";

interface SelectCreatableProps {
  label: string;
  placeholder: string;
  data: string[];
  onCreate: (value: string) => void;
  value?: string;
  onChange: (value: string) => void;
  onSearchChange?: (value: string) => void;
}

export function SelectCreatable({
  label,
  data,
  value,
  onCreate,
  onChange,
  onSearchChange
}: SelectCreatableProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  });
  const [search, setSearch] = useState<string | null>(null);

  useEffect(() => {
    onSearchChange?.(search ?? "");
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    combobox.selectOption(data?.findIndex(item => item === value));
  });

  const exactOptionMatch = data.some(item => item === search);
  const filteredOptions = data.filter(item =>
    item.toLowerCase().includes((search ?? "").toLowerCase().trim())
  );

  const options = filteredOptions.map(item => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={val => {
        if (val === "$create") onCreate(search ?? "".trim().toUpperCase());
        onChange(val);
        setSearch(null);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <TextInput
          label={label}
          rightSection={<Combobox.Chevron />}
          value={typeof search === "string" ? search : value}
          onChange={event => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(null);
          }}
          placeholder="Search value"
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {!exactOptionMatch && (search ?? "").trim().length === 4 && (
            <Combobox.Option value="$create">
              + Add {(search ?? "").trim().toUpperCase()}
            </Combobox.Option>
          )}
          {options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
