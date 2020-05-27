import { ReactNode } from 'react';

export interface ModalOptions {
  content: ReactNode;
  disablePaper?: boolean;
  disableIndirectDismissal?: boolean;
  onDismiss?: () => void;
}

export interface ModalControls {
  disclose: (options: ModalOptions) => void;
  dismiss: () => void;
}

export type ModalCtx = ModalControls | null;
