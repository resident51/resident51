import { useContext } from 'react';

import SelectableContext from 'react-bootstrap/SelectableContext';
import AccordionContext from 'react-bootstrap/AccordionContext';

const useAccordionToggle = (eventKey, onClick) => {
  const contextEventKey = useContext(AccordionContext);
  const onSelect = useContext(SelectableContext);

  const toReturn = e => {
    let eventKeyPassed = eventKey === contextEventKey ? null : eventKey;

    onSelect(eventKeyPassed, e);
    if(onClick) onClick(e);
  }

  return toReturn;
}

export default useAccordionToggle;