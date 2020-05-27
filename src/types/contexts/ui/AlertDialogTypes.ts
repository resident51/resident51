import { ReactNode } from 'react';

export interface AlertDialogOptions {
  title?: string;
  content: ReactNode;
  primaryAction?: {
    text: string;
    onClick?: () => Promise<void> | undefined;
  };
  secondaryAction?: {
    text: string;
    onClick?: () => Promise<void> | undefined;
  };
  onDismiss?: Function;
}

export interface AlertDialogControls {
  disclose: (options: AlertDialogOptions) => void;
  dismiss: () => void;
}

export type AlertDialogCtx = AlertDialogControls | null;
