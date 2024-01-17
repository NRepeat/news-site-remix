import {Link} from '@remix-run/react';

const PreviewPageButton = () => {
  return (
    <Link to={'/constructor/preview'}>
      <span>Preview page</span>
    </Link>
  );
};

export default PreviewPageButton;
