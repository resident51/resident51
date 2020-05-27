import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import uniqid from 'uniqid';

import { AlertDialogControls, AlertDialogCtx, AlertDialogOptions } from '../../types';

import useStyles from './AlertDialogProvider.jss';

const AlertDialogContext = createContext<AlertDialogCtx>(null);
const useAlertDialog = (): AlertDialogCtx => useContext<AlertDialogCtx>(AlertDialogContext);

const AlertDialogProvider: React.FC = props => {
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<AlertDialogOptions | null>(null);
  const [promiseInProgress, setPromiseInProgress] = useState<boolean>(false);
  const contentKey = useRef<number>(1);
  const dismissCallback = useRef<Function | null>(null);
  const classes = useStyles();
  const alertId: string = uniqid('alert-dialog-');

  const disclose = useCallback((dialogOptions: AlertDialogOptions): void => {
    contentKey.current += 1;
    const { onDismiss = null } = dialogOptions;
    dismissCallback.current = onDismiss;
    setOptions(dialogOptions);
    setOpen(true);
  }, []);

  const dismiss = useCallback((skipDismissNotification?: boolean) => {
    if (!skipDismissNotification && dismissCallback.current) {
      dismissCallback.current();
    }
    dismissCallback.current = null;
    setOpen(false);
  }, []);

  const handleExited = useCallback((): void => {
    setOptions(null);
  }, []);

  const updateRootStyle = useCallback((ref?: HTMLElement) => {
    if (ref) {
      ref.style.zIndex = '1350';
    }
  }, []);

  const handleButtonClick = useCallback(
    (type: 'primary' | 'secondary') => {
      const callback =
        type === 'primary' ? options?.primaryAction?.onClick : options?.secondaryAction?.onClick;
      if (callback) {
        const result = callback();
        if (typeof result?.then === 'function') {
          setPromiseInProgress(true);
          result
            .then(() => {
              dismiss(true);
            })
            .catch((reason?: string) => {
              if (reason) {
                // display a snackbar
              }
            })
            .finally(() => setPromiseInProgress(false));
        }
      } else {
        dismiss(true);
      }
    },
    [dismiss, options],
  );

  const handleClose = useCallback(() => dismiss(), [dismiss]);

  const handlePrimaryClick = useCallback(() => handleButtonClick('primary'), [handleButtonClick]);

  const handleSecondaryClick = useCallback(() => handleButtonClick('secondary'), [
    handleButtonClick,
  ]);

  const contextValue = useMemo(
    (): AlertDialogControls => ({
      disclose,
      dismiss,
    }),
    [disclose, dismiss],
  );

  const dialogContent = useMemo(() => {
    if (options?.content) {
      if (typeof options.content === 'string') {
        return <DialogContentText>{options.content}</DialogContentText>;
      }
      return options.content;
    }
    return null;
  }, [options]);

  const dialogActions = useMemo(() => {
    const primaryButton: React.ReactNode = options?.primaryAction ? (
      <Button onClick={handlePrimaryClick} color="primary" disabled={promiseInProgress} autoFocus>
        {options.primaryAction.text}
      </Button>
    ) : null;
    const secondaryButton: React.ReactNode = options?.secondaryAction ? (
      <Button onClick={handleSecondaryClick} color="primary" disabled={promiseInProgress}>
        {options.secondaryAction.text}
      </Button>
    ) : null;

    if (options?.secondaryAction || options?.primaryAction) {
      return (
        <DialogActions>
          {secondaryButton}
          {primaryButton}
        </DialogActions>
      );
    }
    return null;
  }, [handlePrimaryClick, handleSecondaryClick, options, promiseInProgress]);

  return (
    <AlertDialogContext.Provider value={contextValue}>
      <Dialog
        classes={{ paper: classes.alertDialogContainer }}
        open={open}
        scroll="paper"
        onClose={handleClose}
        onExited={handleExited}
        aria-labelledby={`${alertId}-title`}
        aria-describedby={`${alertId}-content`}
        ref={updateRootStyle}
      >
        <div className={classes.alertDialogTitle}>
          <DialogTitle id={`${alertId}-title`}>{options?.title ? options.title : ''}</DialogTitle>
          <IconButton
            className={classes.alertDialogCancelButton}
            onClick={handleClose}
            disabled={promiseInProgress}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent id={`${alertId}-content`} key={contentKey.current}>
          {dialogContent}
        </DialogContent>
        {dialogActions}
      </Dialog>
      {props.children}
    </AlertDialogContext.Provider>
  );
};

export { AlertDialogContext, useAlertDialog };
export default AlertDialogProvider;
