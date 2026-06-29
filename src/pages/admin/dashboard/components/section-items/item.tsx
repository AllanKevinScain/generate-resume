import { Text } from "@/components";
import { Button } from "@/components/button";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

interface ItemProps {
  id: string;
  name?: string;
  title?: string;
  description: string;
  index: number;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function Item(props: ItemProps) {
  const { id, index, name, title, description, onEdit, onDelete } = props;
  const displayName = title || name || "No title";

  return (
    <motion.li
      key={id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group relative border-b border-[color-mix(in_srgb,var(--color-border)_60%,transparent)] py-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[color-mix(in_srgb,var(--color-primary)_5%,transparent)] opacity-0 transition group-hover:opacity-100" />

      <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-[linear-gradient(to_bottom,var(--color-primary),var(--color-secondary))] opacity-0 transition group-hover:opacity-100" />

      <div className="relative flex items-center justify-between pr-4 pl-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-(--color-text) transition group-hover:text-(--color-primary)">
            {displayName}
          </h3>
          <Text className="mt-1 line-clamp-2">{description}</Text>
        </div>

        <div className="flex gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
          {onEdit && (
            <Button.ghost
              onClick={() => onEdit(id)}
              aria-label={`Update ${displayName}`}
              className="h-auto p-2 text-(--color-text) hover:text-(--color-primary)"
            >
              <Pencil size={18} />
            </Button.ghost>
          )}
          {onDelete && (
            <Button.ghost
              onClick={() => onDelete(id)}
              aria-label={`Remove ${displayName}`}
              className="h-auto p-2 text-red-500 hover:text-red-600"
            >
              <Trash2 size={18} />
            </Button.ghost>
          )}
        </div>
      </div>
    </motion.li>
  );
}
