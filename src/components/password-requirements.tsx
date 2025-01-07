import { Check, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Requirement {
  text: string;
  validator: (password: string) => boolean;
}

const requirements: Requirement[] = [
  {
    text: "Al menos 8 caracteres de longitud",
    validator: (password) => password.length >= 8,
  },
  {
    text: "Contiene al menos una letra mayúscula",
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    text: "Contiene al menos una letra minúscula",
    validator: (password) => /[a-z]/.test(password),
  },
  {
    text: "Contiene al menos un número",
    validator: (password) => /[0-9]/.test(password),
  },
];

interface PasswordRequirementsProps {
  password: string;
}

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const calculateStrength = (): number => {
    return requirements.reduce(
      (strength, requirement) =>
        requirement.validator(password) ? strength + 25 : strength,
      0
    );
  };

  return (
    <div className="space-y-4 mt-2">
      <Progress value={calculateStrength()} className="w-full" />
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Requisitos de la contraseña:</h3>
        <ul className="text-sm space-y-1">
          {requirements.map((req, index) => (
            <li key={index} className="flex items-center space-x-2">
              {req.validator(password) ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
              <span>{req.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
