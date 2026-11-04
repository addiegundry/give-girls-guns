'use client';

import { getFormProps, getInputProps, SubmissionResult, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { clsx } from 'clsx';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState } from 'react';

import { FieldError } from '@/vibes/soul/form/field-error';
import { FormStatus } from '@/vibes/soul/form/form-status';
import { Button } from '@/vibes/soul/primitives/button';

import { schema } from './schema';

type Action<State, Payload> = (
  prevState: Awaited<State>,
  formData: Payload,
) => State | Promise<State>;

export function InlineEmailForm({
  className,
  action,
  submitLabel = 'Submit',
  placeholder = 'Enter your email',
  layout = 'attached',
}: {
  className?: string;
  layout?: 'attached' | 'separate';
  placeholder?: string;
  submitLabel?: string;
  action: Action<{ lastResult: SubmissionResult | null; successMessage?: string }, FormData>;
}) {
  const t = useTranslations('Components.Subscribe');
  const subscribeSchema = schema({
    requiredMessage: t('Errors.emailRequired'),
    invalidMessage: t('Errors.invalidEmail'),
  });

  const [{ lastResult, successMessage }, formAction, isPending] = useActionState(action, {
    lastResult: null,
  });

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: subscribeSchema });
    },
    shouldValidate: 'onSubmit',
    shouldRevalidate: 'onInput',
  });

  return (
    <form
      {...getFormProps(form)}
      action={formAction}
      className={clsx(layout === 'attached' && 'space-y-2', className)}
    >
      {layout === 'separate' ? (
        <div className="inline-email-form-fields">
          <input
            {...getInputProps(fields.email, { type: 'email' })}
            aria-label={placeholder}
            autoComplete="email"
            data-1p-ignore
            key={fields.email.id}
            placeholder={placeholder}
          />
          <Button
            aria-label={submitLabel}
            disabled={isPending}
            loading={isPending}
            shape="rounded"
            size="small"
            type="submit"
          >
            {submitLabel}
          </Button>
        </div>
      ) : (
        <div
          className={clsx(
            'relative rounded-xl border bg-background text-base transition-colors duration-200 focus-within:border-primary focus:outline-none',
            form.errors?.length || fields.email.errors?.length
              ? 'border-error focus-within:border-error'
              : 'border-black focus-within:border-primary',
          )}
        >
          <input
            {...getInputProps(fields.email, { type: 'email' })}
            aria-label={placeholder}
            className="placeholder-contrast-gray-500 h-14 w-full bg-transparent pl-5 pr-16 text-foreground placeholder:font-normal focus:outline-none"
            data-1p-ignore
            key={fields.email.id}
            placeholder={placeholder}
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-2">
            <Button
              aria-label={submitLabel}
              loading={isPending}
              shape="circle"
              size="small"
              type="submit"
              variant="secondary"
            >
              <ArrowRight size={20} strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      )}
      {fields.email.errors && (
        <div aria-live="polite" id={fields.email.errorId}>
          {fields.email.errors.map((error) => (
            <FieldError key={error}>{error}</FieldError>
          ))}
        </div>
      )}
      {form.errors?.map((error, index) => (
        <FormStatus key={index} role="alert" type="error">
          {error}
        </FormStatus>
      ))}
      {form.status === 'success' && successMessage != null && (
        <FormStatus role="status">{successMessage}</FormStatus>
      )}
    </form>
  );
}
