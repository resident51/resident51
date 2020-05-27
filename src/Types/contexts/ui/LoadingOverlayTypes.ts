export interface LoadingOverlayConfig {
  key: string;
  active: boolean;
}

export interface LoadingOverlayControls {
  activate: () => void;
  deactivate: () => void;
  deregister: () => void;
}

export interface LoadingOverlayInitializer {
  register: () => LoadingOverlayControls;
}

export type LoadingOverlayCtx = LoadingOverlayInitializer | null;
