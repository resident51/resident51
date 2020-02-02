import { useState } from 'react';

// import { EventType } from '../Types/'; // tried coercing type below to EventType...

export type Statuple = [boolean, (next: boolean) => void];
export interface EventTypeFilterState {
  [type: string]: Statuple;
}
/**
 * State for storing the list of filtered/un-filtered event types
 */
const useEventTypes = (): EventTypeFilterState => {
  const [social, setSocial] = useState(true);
  const [meal, setMeal] = useState(true);
  const [community, setCommunity] = useState(true);
  const [meeting, setMeeting] = useState(true);
  const [alumni, setAlumni] = useState(true);
  const [campus, setCampus] = useState(true);

  const displayTypes: EventTypeFilterState = {
    social: [social, setSocial],
    meal: [meal, setMeal],
    community: [community, setCommunity],
    meeting: [meeting, setMeeting],
    alumni: [alumni, setAlumni],
    campus: [campus, setCampus],
  };

  return displayTypes;
};

export default useEventTypes;
