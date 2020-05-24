import React from 'react';

import { Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import AlertDialogProvider from 'contexts/ui/AlertDialogProvider';
import LoadingOverlayProvider from 'contexts/ui/LoadingOverlayProvider';
import ModalProvider from 'contexts/ui/ModalProvider';
import { useEvents } from 'contexts/Events';
import { useUser } from 'contexts/User';

import Header from './navigation/Header';
import history from './navigation/history';

const Home: React.FC = () => {
  const { user } = useUser();
  const { events } = useEvents();
  return (
    <SnackbarProvider maxSnack={3}>
      <LoadingOverlayProvider>
        <AlertDialogProvider>
          <ModalProvider>
            <Header />
            <Router history={history}>
              <div>
                hey {user.displayName || 'pal'}, there's {events ? events.length : '(loading)'}{' '}
                events.
              </div>
            </Router>
          </ModalProvider>
        </AlertDialogProvider>
      </LoadingOverlayProvider>
    </SnackbarProvider>
  );
};

export default Home;
