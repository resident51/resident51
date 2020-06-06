import React from 'react';

import { Container } from '@material-ui/core';

import Routes from './Routes';
import VerificationBanner from './auth/VerificationBanner';

import useStyles from './_jss/Base.jss';

const Base: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <VerificationBanner />
      <Container className={classes.container} fixed>
        <Routes />
      </Container>
    </>
  );
};

export default Base;
