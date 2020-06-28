import React, { useCallback, useEffect, useMemo, useState } from 'react';

import clsx from 'clsx';
import { Grow, LinearProgress, Modal as MaterialModal, Paper } from '@material-ui/core';

import { ModalOptions, useModal } from '@app/contexts/Modal';

import useStyles from './_jss/Modal.jss';

type ModalProps = Pick<ModalOptions, 'disablePaper' | 'disableIndirectDismissal'>;

interface ModalViewProps {
  isLoading: boolean;
  modalProps: ModalProps;
}

const ModalView: React.FC<ModalViewProps> = ({ children, isLoading, modalProps }) => {
  const { dismiss, isOpen } = useModal();
  const [content, setContent] = useState<React.ReactNode>(null);
  const classes = useStyles();

  const handleClose = useCallback(() => dismiss(true), [dismiss]);

  useEffect(() => {
    if (isOpen) {
      setContent(children);
    }
  }, [children, isOpen]);

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
      open={isOpen}
      onClose={handleClose}
      disableEscapeKeyDown={!!(modalProps.disableIndirectDismissal ?? true)}
      disableBackdropClick={!!(modalProps.disableIndirectDismissal ?? true)}
      closeAfterTransition
      disableRestoreFocus
    >
      <Grow in={isOpen} onExited={(): void => setContent(null)}>
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
