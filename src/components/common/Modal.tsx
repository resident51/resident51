import React, { useEffect, useState } from 'react';

import clsx from 'clsx';
import { Grow, LinearProgress, Modal as MaterialModal, Paper } from '@material-ui/core';

import { ModalProps, useModal } from '@app/contexts/ui/Modal';

import useStyles from './_jss/Modal.jss';

interface ModalViewProps {
  isLoading: boolean;
  modalProps: ModalProps;
}

const ModalView: React.FC<ModalViewProps> = ({ children, isLoading, modalProps }) => {
  const { dismiss, isOpen } = useModal();
  const [content, setContent] = useState<React.ReactNode>(null);
  const classes = useStyles();

  useEffect(() => {
    if (isOpen) {
      setContent(children);
    }
  }, [children, isOpen]);

  const modalContent = ((): React.ReactNode => {
    if (modalProps.disablePaper) {
      return content;
    } else {
      const className = clsx(classes.paper, { [classes.loadingPaper]: isLoading });
      return (
        <>
          {isLoading ? (
            <div className={classes.loadingIndicator}>
              <LinearProgress variant="query" />
            </div>
          ) : null}
          <Paper className={className} elevation={10}>
            {content}
          </Paper>
        </>
      );
    }
  })();

  return (
    <MaterialModal
      className={classes.modalRootContainer}
      open={isOpen}
      onClose={dismiss}
      disableEscapeKeyDown={!!(modalProps.disableIndirectDismissal ?? true)}
      disableBackdropClick={!!(modalProps.disableIndirectDismissal ?? true)}
      closeAfterTransition
      disableRestoreFocus
    >
      <Grow
        in={isOpen}
        timeout={modalProps.disableTransition ? 0 : undefined}
        onExited={(): void => setContent(null)}
      >
        <div className={classes.modalContentContainer}>{modalContent}</div>
      </Grow>
    </MaterialModal>
  );
};

export default ModalView;
