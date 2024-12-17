interface Props {
  title: string;
  additionalStyles?: string;
}
export default function SectionTitle({ title, additionalStyles }: Props) {
  return (
    <div className="text-center">
      <h2
        className={`${
          additionalStyles ? additionalStyles : ""
        } "mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"`}
      >
        {title}
      </h2>
    </div>
  );
}
