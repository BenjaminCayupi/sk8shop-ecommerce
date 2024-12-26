import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";

interface Props {
  isEdit: boolean;
}

export function CategoryForm({ isEdit }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button size="icon">
            <Edit />
          </Button>
        ) : (
          <Button>
            <Plus />
            Agregar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{`${
            isEdit ? "Editar" : "Crear"
          } Categoría`}</DialogTitle>
          <DialogDescription>
            Haz cambios en tus categorías aquí. Oprime guardar cuando estes
            listo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Nombre
            </Label>
            <Input id="name" value="" readOnly className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Descripción
            </Label>
            <Textarea
              placeholder="Descripción de la categoría"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="airplane-mode">Habilitado</Label>
            <Switch id="airplane-mode" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="mr-2">
              Cerrar
            </Button>
          </DialogClose>
          <Button type="submit">Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
