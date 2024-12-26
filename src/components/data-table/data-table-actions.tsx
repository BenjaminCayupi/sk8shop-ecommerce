import { Search, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function DataTableActions() {
  return (
    <div className="mb-3 flex flex-row justify-between">
      <div className="w-4/6 sm:w-4/6">
        <div className="flex flex-row">
          <Input type="text" placeholder="Filtrar" className="mr-2" />
          <Button type="submit">
            <Search />
          </Button>
        </div>
      </div>
      <div className="w-2/6 flex justify-end">
        <Button>
          <Plus />
          Agregar
        </Button>
      </div>
    </div>
  );
}
