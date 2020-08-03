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

import Modal from '@app/components/common/Modal';

export interface ModalOptions {
  disablePaper?: boolean;
  disableIndirectDismissal?: boolean;
  disableTransition?: boolean;
  onDismiss?: () => void;
}
export interface ModalCtx {
  isOpen: boolean;
  disclose: (content: ReactElement, options?: ModalOptions) => void;
  dismiss: () => void;
}

export type ModalProps = Omit<ModalOptions, 'onDismiss'>;

export const ModalContext = createContext<ModalCtx>({} as ModalCtx);
export const useModal = (): ModalCtx => useContext(ModalContext);

const ModalProvider: React.FC = props => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalProps, setModalProps] = useState<ModalProps>({});
  const dismissCallback = useRef<(() => void) | null>(null);

  const disclose = useCallback((content: ReactElement, modalOptions: ModalOptions = {}): void => {
    if (content.props && !modalOptions.disablePaper) {
      const clonedContent = React.cloneElement(content, {
        setLoadingIndicator: setLoading,
      });
      setModalContent(clonedContent);
    } else {
      setModalContent(content);
    }
    dismissCallback.current = modalOptions.onDismiss ?? null;

    const newModalProps = { ...modalOptions, onDismiss: undefined };
    setModalProps(newModalProps);
    setIsOpen(true);
  }, []);

  const dismiss = useCallback(() => {
    if (dismissCallback.current) {
      dismissCallback.current();
    }
    dismissCallback.current = null;
    setIsOpen(false);
    setLoading(false);
    setModalContent(null);
  }, []);

  const modalContextValue = useMemo(() => ({ isOpen, disclose, dismiss }), [
    isOpen,
    disclose,
    dismiss,
  ]);

  return (
    <ModalContext.Provider value={modalContextValue}>
      <Modal isLoading={isLoading} modalProps={modalProps}>
        {modalContent}
      </Modal>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
