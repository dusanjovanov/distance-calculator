import { Combobox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { defaultButtonClassName } from "./Button";
import { defaultInputClassName } from "./Input";

export type SelectFieldProps<Item> = {
  items: Item[];
  itemToString: (item: Item | null) => string;
  isLoading?: boolean;
  value: Item | null;
  onChange?: (value: Item) => void;
  placeholder?: string;
  comboboxClassName?: string;
  onSearch?: (search: string) => void;
};

export const Select = <Item,>({
  items,
  itemToString,
  value,
  placeholder,
  comboboxClassName,
  onChange,
  onSearch,
}: SelectFieldProps<Item>) => {
  const [search, setSearch] = React.useState("");

  const _onSearch = (search: string) => {
    setSearch(search);
    if (typeof onSearch === "function") {
      onSearch(search);
    }
  };

  return (
    <Combobox
      value={value}
      onChange={(value) => {
        if (typeof onChange === "function") {
          onChange(value as Item);
        }
      }}
    >
      <div className="relative">
        <div
          className={twMerge("flex items-stretch w-full", comboboxClassName)}
        >
          <Combobox.Button as="div" className="flex-1">
            <Combobox.Input
              className={twMerge(defaultInputClassName, "rounded-r-none")}
              displayValue={(item) => itemToString(item as any)}
              value={search}
              onChange={(e) => _onSearch(e.target.value)}
              placeholder={placeholder}
              autoComplete="off"
            />
          </Combobox.Button>
          <Combobox.Button
            className={twMerge(defaultButtonClassName, "rounded-l-none")}
          >
            &#8595;
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => _onSearch("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
            {items.length === 0 && search !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              items.map((item, index) => (
                <Combobox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                      active ? "bg-blue-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {(item as any).name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 right-0 flex items-center pr-3 text-lg ${
                            active ? "text-white" : "text-blue-600"
                          }`}
                        >
                          ✓
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};
