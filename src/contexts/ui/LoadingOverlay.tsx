import PropTypes, { InferProps } from 'prop-types';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import uniqid from 'uniqid';
import { Backdrop, CircularProgress } from '@material-ui/core';

import {
  LoadingOverlayConfig,
  LoadingOverlayControls,
  LoadingOverlayCtx,
  LoadingOverlayInitializer,
} from '@app/types';

const LoadingOverlayContext = createContext<LoadingOverlayCtx>(null);

const LoadingOverlayProvider: React.FC = props => {
  const [registeredLoaders, setRegisteredLoaders] = useState<LoadingOverlayConfig[]>([]);
  const isOpen: boolean = registeredLoaders.some(loader => loader.active);

  const setLoaderStatus = useCallback((key: string, value: boolean) => {
    setRegisteredLoaders((loaders: LoadingOverlayConfig[]) => {
      const dupLoaders = [...loaders];
      const requestedLoader = dupLoaders.find((loader: LoadingOverlayConfig) => {
        return loader.key === key;
      });
      if (requestedLoader) {
        requestedLoader.active = value;
      }
      return dupLoaders;
    });
  }, []);

  const deregisterLoader = useCallback((key: string) => {
    setRegisteredLoaders((loaders: LoadingOverlayConfig[]) => {
      const dupLoaders = [...loaders];
      const requestedLoaderIndex: number = dupLoaders.findIndex((loader: LoadingOverlayConfig) => {
        return loader.key === key;
      });
      if (requestedLoaderIndex >= 0) {
        dupLoaders.splice(requestedLoaderIndex, 1);
      }
      return dupLoaders;
    });
  }, []);

  const registerLoader = useCallback((): LoadingOverlayControls => {
    const key: string = uniqid();
    setRegisteredLoaders(prevState => [...prevState, { key, active: false }]);
    return {
      activate: (): void => setLoaderStatus(key, true),
      deactivate: (): void => setLoaderStatus(key, false),
      deregister: (): void => deregisterLoader(key),
    };
  }, [deregisterLoader, setLoaderStatus]);

  const contextValue: LoadingOverlayInitializer = useMemo(
    () => ({
      register: registerLoader,
    }),
    [registerLoader],
  );

  return (
    <LoadingOverlayContext.Provider value={contextValue}>
      <Backdrop style={{ zIndex: 1400 }} open={isOpen}>
        {isOpen && <CircularProgress thickness={4} color="primary" />}
      </Backdrop>
      {props.children}
    </LoadingOverlayContext.Provider>
  );
};

const LoadingOverlayProps = {
  open: PropTypes.bool,
};

const LoadingOverlay: React.FC<InferProps<typeof LoadingOverlayProps>> = props => {
  const loadingOverlayContext: LoadingOverlayCtx = useContext(LoadingOverlayContext);
  const loadingControls = useRef<LoadingOverlayControls | null>(null);

  useEffect(() => {
    const controls: LoadingOverlayControls | undefined = loadingOverlayContext?.register();
    if (controls) {
      loadingControls.current = controls;
    }

    return controls?.deregister || undefined;
  }, [loadingOverlayContext]);

  useEffect(() => {
    if (loadingControls.current) {
      if (props.open) {
        loadingControls.current.activate();
      } else {
        loadingControls.current.deactivate();
      }
    }
  }, [props.open]);

  return null;
};

export { LoadingOverlay };
export default LoadingOverlayProvider;
