import { Input, Textarea } from '@/components';
import { motion } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi2';
import type { ChangeEvent } from 'react';
import type { ResourceConfig, ResourceFormValues } from './resource-management.types';

type ResourceFormFieldsProps = {
  config: ResourceConfig;
  values: ResourceFormValues;
  onChange: (field: string, value: string) => void;
};

export function ResourceFormFields(props: ResourceFormFieldsProps) {
  const { config, values, onChange } = props;

  return (
    <div className="grid gap-4 md:grid-cols-2">
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
                  className="w-full appearance-none rounded-xl border border-(--color-border) bg-(--color-bg) py-3 pl-4 pr-12 outline-none transition focus:border-(--color-primary)"
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
          <Input
            key={field.name}
            {...common}
            type={field.kind === 'url' ? 'url' : 'text'}
            className={field.name === 'title' ? 'md:col-span-2' : undefined}
          />
        );
      })}
    </div>
  );
}
