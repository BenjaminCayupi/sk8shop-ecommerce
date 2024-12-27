import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function FilterProductContent() {
  return (
    <Accordion type="multiple" className="w-full space-y-4">
      <AccordionItem value="disponibilidad" className="border-b">
        <AccordionTrigger className="hover:no-underline">
          Disponibilidad
        </AccordionTrigger>
        <AccordionContent className="pb-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="creature" />
            <Label
              htmlFor="creature"
              className="text-sm font-normal capitalize"
            >
              Creature (37)
            </Label>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="marca" className="border-b">
        <AccordionTrigger className="hover:no-underline">
          Marca
        </AccordionTrigger>
        <AccordionContent className="pb-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="creature" />
            <Label
              htmlFor="creature"
              className="text-sm font-normal capitalize"
            >
              Creature (37)
            </Label>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="medida" className="border-b">
        <AccordionTrigger className="hover:no-underline">
          Talla / Medida
        </AccordionTrigger>
        <AccordionContent className="pb-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="creature" />
            <Label
              htmlFor="creature"
              className="text-sm font-normal capitalize"
            >
              Creature (37)
            </Label>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
