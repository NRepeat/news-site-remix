import { useIsSubmitting } from 'remix-validated-form';

export const SubmitButton = ({ canSubmit }: { canSubmit: boolean }) => {
  const isSubmitting = useIsSubmitting();

  return (
    <button type="submit" disabled={isSubmitting || !canSubmit}>
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  );
};
