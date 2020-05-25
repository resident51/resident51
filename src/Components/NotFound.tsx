import React from 'react';
import { Link } from 'react-router-dom';

import useDocumentTitle from '../Hooks/useDocumentTitle';

const NotFound: React.FC = () => {
  useDocumentTitle('Not Found');

  return (
    <div>
      <h1 className="my-4 text-center">Bad News Bears:</h1>
      <p className="my-5 text-center lead">
        There is nothing here. Are you happy? Is this what you wanted? *Ruffles your hair* Gah, I
        can't stay mad at you :^)
      </p>
      <Link to="/">Back to Civilization!</Link>
    </div>
  );
};

export default NotFound;
