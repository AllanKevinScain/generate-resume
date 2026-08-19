import { Textarea } from '@/components';
import { motion } from 'framer-motion';
import type { ChangeEvent } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import type { ResourceFormFieldsProps } from './page.type';
import { Field, Grid } from 'safira-ui/react';

export function ResourceFormFields(props: ResourceFormFieldsProps) {
  const { config, values, onChange } = props;

  return (
    <Grid columns={2} gap={4} minItemWidth="16rem">
      {config.fields.map((field) => {
        const common = {
          label: field.label,
          required: !field.optional,
          value: values[field.name] ?? '',
          onChange: (
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
          ) => onChange(field.name, event.target.value),
        };

        if (field.kind === 'textarea') {
          return (
            <Textarea
              key={field.name}
              {...common}
              className={field.name === 'description' ? 'md:col-span-2' : undefined}
            />
          );
        }

        if (field.kind === 'select') {
          return (
            <motion.label
              key={field.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex flex-col gap-1 text-sm font-medium text-(--color-text)"
            >
              <span>
                {field.label}
                {!field.optional && <span className="ml-1 text-red-500">*</span>}
              </span>
              <div className="relative">
                <select
                  required={!field.optional}
                  value={values[field.name] ?? ''}
                  onChange={common.onChange}
                  className="w-full appearance-none rounded-xl border border-(--color-border) bg-(--color-bg) py-3 pr-12 pl-4 outline-none transition focus:border-(--color-primary)"
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <HiChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-(--color-text) opacity-60"
                  size={18}
                />
              </div>
            </motion.label>
          );
        }

        return (
          <div key={field.name} className={field.name === 'title' ? 'md:col-span-2' : undefined}>
            <Field {...common} type={field.kind === 'url' ? 'url' : 'text'} />
          </div>
        );
      })}
    </Grid>
  );
}
