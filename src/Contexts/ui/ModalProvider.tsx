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

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import uniqid from 'uniqid';

import { ModalCtx, ModalOptions } from '../../types';

import useStyles from './ModalProvider.jss';

const ModalContext = createContext<ModalCtx>(null);
const useModal = (): ModalCtx => useContext(ModalContext);

type ModalProps = Pick<ModalOptions, 'disablePaper' | 'disableIndirectDismissal'>;

const ModalProvider: React.FC = props => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [modalProps, setModalProps] = useState<ModalProps>({});
  const dismissCallback = useRef<(() => void) | null>(null);
  const contentKey = useRef<string>();
  const classes = useStyles();

  const updateRootStyle = useCallback((ref?: HTMLElement) => {
    if (ref) {
      ref.style.zIndex = '1325';
    }
  }, []);

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
  }, []);

  const dismiss = useCallback((skipDismissNotification?: boolean) => {
    if (!skipDismissNotification && dismissCallback.current) {
      dismissCallback.current();
    }
    dismissCallback.current = null;
    setOpen(false);
    setContent(null);
    setModalProps({});
  }, []);
  const handleClose = useCallback(() => dismiss(true), [dismiss]);
  const dismissWithoutNotification = useCallback(() => dismiss(), [dismiss]);

  const contextValue = useMemo(
    () => ({
      disclose,
      dismiss: dismissWithoutNotification,
    }),
    [disclose, dismissWithoutNotification],
  );

  const modalContent = useMemo(() => {
    if (modalProps.disablePaper) {
      return content;
    }
    return (
      <Paper className={classes.paper} elevation={10}>
        {content}
      </Paper>
    );
  }, [classes.paper, content, modalProps.disablePaper]);

  return (
    <ModalContext.Provider value={contextValue}>
      <Modal
        ref={updateRootStyle}
        className={classes.modalRootContainer}
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown={!!(modalProps.disableIndirectDismissal ?? true)}
        disableBackdropClick={!!(modalProps.disableIndirectDismissal ?? true)}
      >
        <div className={classes.modalContentContainer}>
          <Backdrop className={classes.modalLoadingContainer} open={isLoading}>
            <CircularProgress thickness={4} />
          </Backdrop>
          <React.Fragment key={contentKey.current}>{modalContent}</React.Fragment>
        </div>
      </Modal>
      {props.children}
    </ModalContext.Provider>
  );
};

export { ModalContext, useModal };
export default ModalProvider;
