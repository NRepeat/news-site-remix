import {useIsSubmitting} from 'remix-validated-form';

export const SubmitButton = () => {
  const isSubmitting = useIsSubmitting();
  console.log('🚀 ~ SubmitButton ~ isSubmitting:', isSubmitting);
  return (
    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  );
};
