import React, {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import clsx from 'clsx';
import uniqid from 'uniqid';
import { Grow, LinearProgress, Modal, Paper } from '@material-ui/core';

import { ModalCtx, ModalOptions } from '../../types';

import useStyles from './ModalProvider.jss';

const ModalContext = createContext<ModalCtx>(null);
const useModal = (): ModalCtx => useContext(ModalContext);

type ModalProps = Pick<ModalOptions, 'disablePaper' | 'disableIndirectDismissal'>;

const ModalProvider: React.FC = props => {
  const [open, setOpen] = useState<boolean>(false);
  const [transitionIn, setTransitionIn] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [modalProps, setModalProps] = useState<ModalProps>({});
  const dismissCallback = useRef<(() => void) | null>(null);
  const contentKey = useRef<string>();
  const classes = useStyles();

  const disclose = useCallback((modalOptions: ModalOptions): void => {
    contentKey.current = uniqid('modal-');
    if ((modalOptions.content as ReactElement)?.props) {
      const clonedContent = React.cloneElement(modalOptions.content as ReactElement, {
        setLoadingIndicator: setLoading,
      });
      setContent(clonedContent);
    } else {
      setContent(modalOptions.content);
    }
    dismissCallback.current = modalOptions.onDismiss ?? null;
    setModalProps({
      disablePaper: modalOptions.disablePaper,
      disableIndirectDismissal: modalOptions.disableIndirectDismissal,
    });
    setOpen(true);
    setTransitionIn(true);
  }, []);

  const dismiss = useCallback((skipDismissNotification?: boolean) => {
    if (!skipDismissNotification && dismissCallback.current) {
      dismissCallback.current();
    }
    dismissCallback.current = null;
    setTransitionIn(false);
    setModalProps({});
    setTimeout(() => {
      setOpen(false);
      setLoading(false);
      setContent(null);
    }, 400);
  }, []);
  const handleClose = useCallback(() => dismiss(true), [dismiss]);
  const dismissWithoutNotification = useCallback(() => dismiss(), [dismiss]);

  const modalContent = useMemo(() => {
    if (modalProps.disablePaper) {
      return content;
    }
    return (
      <Paper className={clsx(classes.paper, { [classes.loadingPaper]: isLoading })} elevation={10}>
        {content}
      </Paper>
    );
  }, [classes.loadingPaper, classes.paper, content, isLoading, modalProps.disablePaper]);

  return (
    <ModalContext.Provider value={{ disclose, dismiss: dismissWithoutNotification }}>
      <Modal
        className={classes.modalRootContainer}
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown={!!(modalProps.disableIndirectDismissal ?? true)}
        disableBackdropClick={!!(modalProps.disableIndirectDismissal ?? true)}
        closeAfterTransition
      >
        <Grow in={transitionIn} timeout={{ enter: 300, exit: 300 }}>
          <div className={classes.modalContentContainer}>
            {isLoading ? (
              <div className={classes.loadingIndicator}>
                <LinearProgress variant="query" />
              </div>
            ) : null}
            <React.Fragment key={contentKey.current}>{modalContent}</React.Fragment>
          </div>
        </Grow>
      </Modal>
      {props.children}
    </ModalContext.Provider>
  );
};

export { ModalContext, useModal };
export default ModalProvider;
