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
        <AccordionContent className="pb-4">
          <p>asd</p>
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
          Medida
        </AccordionTrigger>
        <AccordionContent className="pb-4">
          <p>asd</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="concavo" className="border-b">
        <AccordionTrigger className="hover:no-underline">
          Concavo
        </AccordionTrigger>
        <AccordionContent className="pb-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="high" />
            <Label htmlFor="high" className="text-sm font-normal capitalize">
              High (2)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="med" />
            <Label htmlFor="med" className="text-sm font-normal capitalize">
              Med (32)
            </Label>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="tecnologia" className="border-b">
        <AccordionTrigger className="hover:no-underline">
          Tecnologia
        </AccordionTrigger>
        <AccordionContent className="pb-4">
          <p>asd</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
