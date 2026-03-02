interface TitleProps {
  title: string;
  description: string;
}

export function Title(props: TitleProps) {
  const { title, description } = props;

  return (
    <>
      <h2 className="text-(--color-text) text-2xl font-bold">{title}</h2>
      <p className="text-(--color-text) opacity-70 mb-4">{description}</p>
    </>
  );
}
