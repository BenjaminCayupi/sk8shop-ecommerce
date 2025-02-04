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
    <>
      <Label className={`text-left capitalize ${className}`}>{label}</Label>
      {children}
      <FieldError error={error} />
    </>
  );
}
