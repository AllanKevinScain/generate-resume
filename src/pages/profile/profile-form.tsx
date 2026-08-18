import { Button, Card, Field, Grid, Stack, Textarea } from '@/components';
import {
  ADDRESS_FIELDS,
  PERSONAL_FIELDS,
  SOCIAL_FIELDS,
  type ProfileField,
} from './constants/profile-fields';
import type { ProfileFormValues } from './profile.types';
import { formatPhone } from './utils/format-phone';

type ProfileFormProps = {
  values: ProfileFormValues;
  isSaving: boolean;
  onChange: (field: keyof ProfileFormValues, value: string) => void;
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
};

function Fields({
  fields,
  values,
  onChange,
}: Pick<ProfileFormProps, 'values' | 'onChange'> & { fields: ProfileField[] }) {
  return fields.map((field) => (
    <Field
      key={field.name}
      label={field.name === 'phone' ? `${field.label} (+55)` : field.label}
      type={field.type ?? 'text'}
      required={field.required ?? false}
      autoComplete={field.autoComplete}
      value={field.name === 'phone' ? formatPhone(values[field.name]) : values[field.name]}
      onChange={(event) => {
        const value = field.name === 'phone' ? formatPhone(event.target.value) : event.target.value;
        onChange(field.name, value);
      }}
    />
  ));
}

export function ProfileForm({ values, isSaving, onChange, onSubmit }: ProfileFormProps) {
  return (
    <Card className="rounded-3xl border border-(--color-border) bg-[color-mix(in_srgb,var(--color-bg)_92%,transparent)] p-6">
      <form onSubmit={onSubmit}>
        <Stack gap={6}>
          <div>
            <h2 className="text-xl font-semibold">Dados pessoais</h2>
            <Grid columns={2} gap={4} minItemWidth="16rem" className="mt-4">
              <Fields fields={PERSONAL_FIELDS} values={values} onChange={onChange} />
            </Grid>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Endereço</h2>
            <Grid columns={2} gap={4} minItemWidth="16rem" className="mt-4">
              <Fields fields={ADDRESS_FIELDS} values={values} onChange={onChange} />
            </Grid>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Links</h2>
            <Grid columns={2} gap={4} minItemWidth="16rem" className="mt-4">
              <Fields fields={SOCIAL_FIELDS} values={values} onChange={onChange} />
            </Grid>
          </div>
          <Textarea
            label="Bibliografia / apresentação"
            required={false}
            maxLength={5000}
            value={values.biography}
            onChange={(event) => onChange('biography', event.target.value)}
          />
          <div className="flex justify-end">
            <Button variant="primary" type="submit" disabled={isSaving}>
              {isSaving ? 'Salvando...' : 'Salvar perfil'}
            </Button>
          </div>
        </Stack>
      </form>
    </Card>
  );
}
