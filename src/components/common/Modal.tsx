import React, { useCallback, useEffect, useMemo, useState } from 'react';

import clsx from 'clsx';
import { Grow, LinearProgress, Modal as MaterialModal, Paper } from '@material-ui/core';

import usePrevious from '@app/hooks/usePrevious';
import { ModalOptions, useModal } from '@app/contexts/Modal';

import useStyles from './_jss/Modal.jss';

type ModalProps = Pick<ModalOptions, 'disablePaper' | 'disableIndirectDismissal'>;

interface ModalViewProps {
  isLoading: boolean;
  modalProps: ModalProps;
}

const ModalView: React.FC<ModalViewProps> = ({ children, isLoading, modalProps }) => {
  const { dismiss, isOpen } = useModal();
  const [isVisible, setIsVisible] = useState(isOpen);
  const classes = useStyles();

  const handleClose = useCallback(() => dismiss(true), [dismiss]);

  // On change to isOpen, transition modal in/out.
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      // Delay to give <Grow /> time to transition.
      setTimeout(() => setIsVisible(false), 400);
    }
  }, [isOpen]);

  // Keep child content one extra render while <Grow /> transitions out on close.
  const isClosing = usePrevious(isOpen) && !isOpen;
  const lastChildren = usePrevious(children);
  const content = isClosing ? lastChildren : children;
  const modalContent = useMemo(() => {
    if (modalProps.disablePaper) {
      return content;
    } else {
      const className = clsx(classes.paper, { [classes.loadingPaper]: isLoading });
      return (
        <Paper className={className} elevation={10}>
          {content}
        </Paper>
      );
    }
  }, [isLoading, content, modalProps.disablePaper, classes.paper, classes.loadingPaper]);

  return (
    <MaterialModal
      className={classes.modalRootContainer}
      open={isVisible}
      onClose={handleClose}
      disableEscapeKeyDown={!!(modalProps.disableIndirectDismissal ?? true)}
      disableBackdropClick={!!(modalProps.disableIndirectDismissal ?? true)}
      closeAfterTransition
    >
      <Grow in={isOpen} timeout={{ enter: 300, exit: 300 }}>
        <div className={classes.modalContentContainer}>
          {isLoading ? (
            <div className={classes.loadingIndicator}>
              <LinearProgress variant="query" />
            </div>
          ) : null}
          {modalContent}
        </div>
      </Grow>
    </MaterialModal>
  );
};

export default ModalView;
