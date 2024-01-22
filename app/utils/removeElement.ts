import {type SubmitFunction} from '@remix-run/react';

export const removeElement = ({
  id,
  sub,
  slug,
}: {
  slug?: string;
  sub: SubmitFunction;
  id: string;
}) => {
  const type = 'removeElement';
  sub(
    {id, type},
    {
      action: `/admin/${slug}/constructor`,
      method: 'POST',
    }
  );
};
