import React, {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

import Modal from '@app/components/common/Modal';

export interface ModalOptions {
  disablePaper?: boolean;
  disableIndirectDismissal?: boolean;
  onDismiss?: () => void;
}
export interface ModalCtx {
  isOpen: boolean;
  disclose: (content: ReactElement, options?: ModalOptions) => void;
  dismiss: (skipDismissNotification?: boolean) => void;
}

type ModalProps = Pick<ModalOptions, 'disablePaper' | 'disableIndirectDismissal'>;

export const ModalContext = createContext<ModalCtx>({} as ModalCtx);
export const useModal = (): ModalCtx => useContext(ModalContext);

const ModalProvider: React.FC = props => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalProps, setModalProps] = useState<ModalProps>({});
  const dismissCallback = useRef<(() => void) | null>(null);

  const disclose = useCallback((content: ReactElement, modalOptions: ModalOptions = {}): void => {
    if (content.props) {
      const clonedContent = React.cloneElement(content, {
        setLoadingIndicator: setLoading,
      });
      setModalContent(clonedContent);
    } else {
      setModalContent(content);
    }
    dismissCallback.current = modalOptions.onDismiss ?? null;

    const { disablePaper, disableIndirectDismissal } = modalOptions;
    setModalProps({ disablePaper, disableIndirectDismissal });
    setIsOpen(true);
  }, []);

  const dismiss = useCallback((skipDismissNotification?: boolean) => {
    if (!skipDismissNotification && dismissCallback.current) {
      dismissCallback.current();
    }
    dismissCallback.current = null;
    setModalProps({});
    setIsOpen(false);
    setLoading(false);
    setModalContent(null);
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, disclose, dismiss }}>
      <Modal isLoading={isLoading} modalProps={modalProps}>
        {modalContent}
      </Modal>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
