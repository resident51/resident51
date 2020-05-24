import React from 'react';

import { useHistory } from 'react-router-dom';

import useDocumentTitle from '../hooks/useDocumentTitle';

// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';

const NotFound: React.FC = () => {
  useDocumentTitle('Not Found');

  const history = useHistory();

  return (
    <>
      <h1 className="my-4 text-center">Bad News Bears:</h1>
      <p className="my-5 text-center lead">
        There is nothing here. Are you happy? Is this what you wanted? *Ruffles your hair* Gah, I
        can't stay mad at you :^)
      </p>
    </>
  );
};

export default NotFound;
