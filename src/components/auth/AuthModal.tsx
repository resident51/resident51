import React, { useCallback, useState } from 'react';

import clsx from 'clsx';
import { Grow, Slide } from '@material-ui/core';

import { useModal } from '@app/contexts/ui/Modal';

import SignInWrapper from './SignInWrapper';
import SignUp from './SignUp';

import useStyles from './_jss/AuthModal.jss';

enum SlidePosition {
  RIGHT = 'right',
  LEFT = 'left',
}

interface AuthModalProps {
  /**
   * The modal that will be face up on initial disclosure
   */
  initialVariant: 'sign-in' | 'sign-up';
}

const AuthModal: React.FC<AuthModalProps> = ({ initialVariant }) => {
  /**
   * The right slide is the "main" modal that shows face up on initial disclosure.
   * The secondary modal slides in from the left on a toggle.
   */
  const [activeSlide, setActiveSlide] = useState<SlidePosition>(SlidePosition.RIGHT);
  const [slideTimeout, setSlideTimeout] = useState<number | undefined>(0);
  const [open, setOpen] = useState<boolean>(true);
  const modalContext = useModal();
  const classes = useStyles();

  const handleClose = useCallback(() => {
    setOpen(false);
    const modalBackdropSelector = '[class*="modalRootContainer"] > div:first-child';
    const modalBackdrop = document.querySelector<HTMLElement>(modalBackdropSelector);
    if (modalBackdrop) {
      modalBackdrop.style.opacity = '0';
    }
  }, []);

  const toggleSlide = useCallback(() => {
    setActiveSlide(prevSlide => {
      if (prevSlide === SlidePosition.LEFT) {
        return SlidePosition.RIGHT;
      }
      return SlidePosition.LEFT;
    });
  }, []);

  const signUp = <SignUp onClose={handleClose} onSignInRedirect={toggleSlide} />;
  const signIn = <SignInWrapper onClose={handleClose} onSignUpRedirect={toggleSlide} />;
  const leftModal = initialVariant === 'sign-in' ? signUp : signIn;
  const rightModal = initialVariant === 'sign-in' ? signIn : signUp;

  const buildSlide = (position: SlidePosition): React.ReactElement => (
    <Slide
      in={activeSlide === position}
      // A slide on the left will slide right to transition in and vice versa
      direction={position === SlidePosition.LEFT ? 'right' : 'left'}
      timeout={slideTimeout}
    >
      <div className={clsx(classes.positionedModal)}>
        <Grow in={open} timeout={300} onExited={modalContext?.dismiss}>
          {position === 'left' ? leftModal : rightModal}
        </Grow>
      </div>
    </Slide>
  );

  return (
    <Grow in timeout={300} onEntered={(): void => setSlideTimeout(undefined)}>
      <div className={classes.authModalRoot}>
        {buildSlide(SlidePosition.LEFT)}
        {buildSlide(SlidePosition.RIGHT)}
      </div>
    </Grow>
  );
};

export default AuthModal;
