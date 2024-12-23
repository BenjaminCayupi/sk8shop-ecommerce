interface Props {
  title: string;
}

export default function PageTitle({ title }: Props) {
  return <h2 className="text-2xl font-bold mb-8 capitalize">{title}</h2>;
}
