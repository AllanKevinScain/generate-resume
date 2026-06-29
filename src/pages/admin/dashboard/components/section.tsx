import { Text } from "@/components";
import { Link } from "react-router";

interface SectionProps {
  name: string;
  description: string;
  path: string;
}

export function Section(props: SectionProps) {
  const { name, description, path } = props;

  return (
    <Link
      to={path}
      aria-label={`Gerenciar ${name}`}
      className="group rounded-lg border border-(--color-border) bg-(--color-card) p-6 transition-colors hover:border-(--color-primary)"
    >
      <Text variant="h3" className="mb-2 transition-colors group-hover:text-(--color-primary)">
        {name}
      </Text>
      <Text variant="p" className="opacity-70">
        {description}
      </Text>
    </Link>
  );
}
