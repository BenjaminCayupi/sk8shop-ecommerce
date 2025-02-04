import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Edit, Plus, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit: boolean;
  id: number | undefined;
  toggleEdit: (id: number) => Promise<void>;
  openModal: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  formLoading: boolean;
  loading: boolean;
  closeForm: () => void;
  children: React.ReactNode;
}

export default function FormDialog({
  open,
  onOpenChange,
  isEdit,
  id,
  toggleEdit,
  openModal,
  loading,
  formLoading,
  closeForm,
  onSubmit,
  children,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button
            size="icon"
            onClick={() => id !== undefined && toggleEdit(id)}
          >
            <Edit />
          </Button>
        ) : (
          <Button onClick={openModal}>
            <Plus />
            Agregar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-5xl">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{`${
              isEdit ? "Editar" : "Crear"
            } Producto`}</DialogTitle>
            <DialogDescription>
              Haz cambios en tus productos aquí. Oprime guardar cuando estés
              listo.
            </DialogDescription>
          </DialogHeader>
          {formLoading ? (
            <div className="w-full h-[250px] content-center justify-items-center">
              <Loader2 className="motion-preset-spin" size={50} />
            </div>
          ) : (
            children
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="mr-2"
                disabled={loading}
                onClick={closeForm}
              >
                Cerrar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="animate-spin" />}
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
