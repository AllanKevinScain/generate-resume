import { Button, Skeleton, Text } from "@/components";
import type { ModalProps } from "@/types";

interface HandleExcludeModalProps extends ModalProps {
  isLoading: boolean;
  textContent: string;
  onSubmit: () => void;
}

export function HandleExcludeModal(props: HandleExcludeModalProps) {
  const { textContent, onClose, isOpen, isLoading, onSubmit } = props;

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <dialog
      open={isOpen}
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <div className="flex w-full max-w-lg flex-col gap-4 rounded-2xl border border-(--color-border) bg-(--color-bg) p-6 shadow-2xl">
        <Text variant="h3" className="mb-2">
          {textContent}
        </Text>

        <div className="mt-4 flex justify-end gap-3">
          <Button.outline type="button" onClick={onClose}>
            Cancel
          </Button.outline>
          <Button.solid onClick={onSubmit}>Save</Button.solid>
        </div>
      </div>
    </dialog>
  );
}
