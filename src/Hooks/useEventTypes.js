import { useState } from 'react';

const useEventTypes = () => {
  const [social, setSocial] = useState(true);
  const [meal, setMeal] = useState(true);
  const [community, setCommunity] = useState(true);
  const [meeting, setMeeting] = useState(true);
  const [alumni, setAlumni] = useState(true);
  const [campus, setCampus] = useState(true);

  const displayTypes = {
    social: [social, setSocial],
    meal: [meal, setMeal],
    community: [community, setCommunity],
    meeting: [meeting, setMeeting],
    alumni: [alumni, setAlumni],
    campus: [campus, setCampus]
  }

  return displayTypes;
}

export default useEventTypes;