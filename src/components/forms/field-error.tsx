interface Props {
  error: string | undefined;
}

export default function FieldError({ error }: Props) {
  return <>{error && <p className="text-sm text-red-400 w-full">{error}</p>}</>;
}
