import { EmptyState, Text } from "@/components";
import { Item } from "./item";

export type SectionItemsType = {
  id: string;
  name?: string;
  title?: string;
  description: string;
};

interface SectionItemsProps {
  name: string;
  items: SectionItemsType[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function SectionItems(props: SectionItemsProps) {
  const { name, items = [], onEdit, onDelete } = props;

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[50vh] max-h-125 w-[120vw] max-w-225 -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <Text variant="h2" className="mb-14 font-extrabold sm:text-4xl">
          {name}
        </Text>

        <ul className="flex w-full flex-col">
          {items.length !== 0 &&
            items.map((i, index) => <Item key={i.id} index={index} {...i} onEdit={onEdit} onDelete={onDelete} />)}

          {items.length === 0 && <EmptyState description="Nothing here yet!" />}
        </ul>
      </div>
    </div>
  );
}
