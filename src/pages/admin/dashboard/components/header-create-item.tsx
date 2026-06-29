import { Button, Text } from "@/components";
import { Plus } from "lucide-react";

interface HeaderCreateItemProps {
  title: string;
  buttonDescription: string;
  handleAdd: () => void;
}

export function HeaderCreateItem(props: HeaderCreateItemProps) {
  const { handleAdd, title, buttonDescription } = props;
  return (
    <div className="flex items-center justify-between">
      <Text variant="h1" className="text-3xl font-bold text-(--color-text)">
        {title}
      </Text>
      <Button.solid onClick={handleAdd} className="flex items-center gap-2">
        <Plus size={20} />
        {buttonDescription}
      </Button.solid>
    </div>
  );
}
