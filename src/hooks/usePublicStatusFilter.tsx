import { useState } from 'react';

export interface PublicStatusFilterState {
  public: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  private: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

/**
 * State for storing the list of filtered/un-filtered event types
 */
const usePublicStatusFilter = (): PublicStatusFilterState => {
  const [showPublic, setShowPublic] = useState(true);
  const [showPrivate, setShowPrivate] = useState(true);

  const publicStatusFilters: PublicStatusFilterState = {
    public: [showPublic, setShowPublic],
    private: [showPrivate, setShowPrivate],
  };

  return publicStatusFilters;
};

export default usePublicStatusFilter;
