import clsx from "clsx";
import { Label } from "../ui/label";
import FieldError from "./field-error";

interface Props {
  children: React.ReactNode;
  label: string;
  error?: string | undefined;
  className?: string;
}

export default function FieldContainer({
  children,
  label,
  error,
  className,
}: Props) {
  return (
    <div className={clsx("flex flex-col gap-3", className)}>
      <Label className={`text-left capitalize`}>{label}</Label>
      {children}
      <FieldError error={error} />
    </div>
  );
}
