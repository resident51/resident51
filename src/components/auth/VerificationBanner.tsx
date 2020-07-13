import React, { useState } from 'react';

import { Alert } from '@material-ui/lab';
import { Collapse } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

import { LoadingOverlay } from '@app/contexts/ui/LoadingOverlay';
import { sendAccountVerificationEmail } from '@app/firebase/firebase';
import { useSnackbar } from '@app/contexts/ui/Snackbar';
import { useUser } from '@app/contexts/services/User';

import Link from '../common/Link';

import useStyles from './_jss/VerificationBanner.jss';

const VerificationBanner: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const enqueueSnackbar = useSnackbar();
  const { user } = useUser();
  const classes = useStyles();

  const toggleCollapse = (): void => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleVerificationLink = async (): Promise<void> => {
    try {
      setLoading(true);
      await sendAccountVerificationEmail({ email: user?.email });
      enqueueSnackbar('Verification email sent.', { variant: 'success' });
    } catch {
      enqueueSnackbar('Unable to send verification email. Please try again', {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const emailVerificationBanner = (
    <Alert
      key="verify-email"
      severity="warning"
      icon={false}
      classes={{ message: classes.verificationBannerMessage }}
    >
      Please verify your email by following the link in your inbox.{' '}
      <Link underline="always" onClick={handleVerificationLink}>
        Resend verification link
      </Link>
    </Alert>
  );

  const hallVerificationBanner = (
    <Alert
      key="verify-hall"
      severity="warning"
      icon={false}
      classes={{ message: classes.verificationBannerMessage }}
    >
      Your hall isn't verified. Please ask your hall president to verify you.
    </Alert>
  );

  const banners: React.ReactNode[] = [
    !user?.emailVerified && emailVerificationBanner,
    !user?.hallVerified && hallVerificationBanner,
  ].filter(Boolean);

  if (!user) {
    return null;
  }
  return (
    <div className={classes.verificationBannerContainer}>
      {banners?.[0]}
      <Collapse in={open}>{banners.slice(1)}</Collapse>
      {banners.length > 1 && (
        <Link component="div" className={classes.collapseToggle} onClick={toggleCollapse}>
          {open ? (
            <KeyboardArrowUp viewBox="5 5 14 14" />
          ) : (
            <KeyboardArrowDown viewBox="5 5 14 14" />
          )}
        </Link>
      )}
      <LoadingOverlay open={isLoading} />
    </div>
  );
};

export default VerificationBanner;