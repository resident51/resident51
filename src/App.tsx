import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import Base from '@app/components/Base';
import Navigation from '@app/components/navigation/Navigation';
import Resident51Contexts from '@app/contexts';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Resident51Contexts>
        <Navigation>
          <Base />
        </Navigation>
      </Resident51Contexts>
    </BrowserRouter>
  );
};

export default App;
