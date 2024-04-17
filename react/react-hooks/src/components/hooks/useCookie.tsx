import { useCallback, useState } from 'react';

import Cookies from 'js-cookie';

const useWWCookie = (cookieName: string) => {
  const [value, setValue] = useState(() => Cookies.get(cookieName) || null);
  const updateCookie = useCallback(
    (newVal: string) => {
      const news = JSON.stringify(newVal);
      Cookies.set(cookieName, news);
      setValue(news);
    },
    [cookieName],
  );

  const deleteCookie = () => {
    Cookies.remove(cookieName);
    setValue(null);
  };

  return [value, updateCookie, deleteCookie];
};

export default useWWCookie;
