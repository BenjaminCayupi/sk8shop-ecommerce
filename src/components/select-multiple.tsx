"use client";
import { useState } from "react";
import MultipleSelector, { Option } from "./ui/multiple-selector";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

const OPTIONS: Option[] = [
  { label: "S", value: "nextjs" },
  { label: "M", value: "react" },
  { label: "L", value: "remix" },
  { label: "XL", value: "vite" },
];

const SizeSelect = ({}) => {
  const [value, setValue] = useState<Option[]>([]);
  return (
    <div className="w-full">
      <MultipleSelector
        value={value}
        onChange={setValue}
        defaultOptions={OPTIONS}
        hidePlaceholderWhenSelected
        placeholder="Seleccionar tallas"
        creatable
        emptyIndicator={
          <p className="text-center text-sm  text-gray-600 dark:text-gray-400">
            No quedan tallas
          </p>
        }
      />
      <p className="text-xs ml-2 mt-1 text-slate-500">
        Puede seleccionar múltiples tallas o comenzar a escribir para crear una
        nueva
      </p>
      {value.length > 0 &&
        value.map((item) => (
          <div
            key={item.label}
            className="flex flex-row mt-4 align-middle justify-between"
          >
            <div className="w-1/6 flex">
              <Badge variant="outline" className="w-4/6 flex justify-center">
                {item.label}
              </Badge>
            </div>
            <Input
              id="name"
              value=""
              readOnly
              className="w-5/6"
              placeholder="Cantidad"
            />
          </div>
        ))}
    </div>
  );
};

export default SizeSelect;
