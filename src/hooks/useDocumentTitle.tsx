import { useEffect } from 'react';

const useDocumentTitle = (title: string): void => {
  useEffect(() => {
    document.title = `Resident 51 | ${title}`;
  }, [title]);
};

export default useDocumentTitle;
