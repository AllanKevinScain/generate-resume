import { FiUser } from 'react-icons/fi';

type ProfileAvatarProps = {
  previewUrl: string | null;
  onFileChange: (file: File | null) => void;
};

export function ProfileAvatar({ previewUrl, onFileChange }: ProfileAvatarProps) {
  return (
    <section className="flex flex-col gap-4 rounded-3xl border border-(--color-border) bg-[color-mix(in_srgb,var(--color-bg)_92%,transparent)] p-6 sm:flex-row sm:items-center">
      <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border border-(--color-border) bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)]">
        {previewUrl ? (
          <img src={previewUrl} alt="Foto de perfil" className="h-full w-full object-cover" />
        ) : (
          <FiUser aria-hidden="true" className="opacity-50" size={44} />
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold">Foto de perfil</h2>
        <p className="mt-1 text-sm opacity-70">JPEG, PNG ou WebP de até 5 MB.</p>
        <label className="mt-4 inline-flex cursor-pointer rounded-xl border border-(--color-border) px-4 py-2 text-sm font-medium transition hover:border-(--color-primary) hover:text-(--color-primary)">
          Selecionar foto
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
          />
        </label>
      </div>
    </section>
  );
}
