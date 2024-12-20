import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function SortByFilter() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Ordenar por:" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ordenar por:</SelectLabel>
          <SelectItem value="apple">Menor precio</SelectItem>
          <SelectItem value="banana">Mayor precio</SelectItem>
          <SelectItem value="blueberry">Mas nuevo</SelectItem>
          <SelectItem value="grapes">Mas antiguo</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
