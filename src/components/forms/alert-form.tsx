import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function AlertForm() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-3">Alerta</h3>
      <Input
        id="name"
        className="w-[50%]"
        /* {...register("price", productValidations.price)} */
      />
      <div className="mt-4">
        <Button>Guardar</Button>
      </div>
    </div>
  );
}
