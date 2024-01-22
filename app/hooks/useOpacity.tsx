import {useState} from 'react';

const useOpacity = () => {
  const [opacity, setOpacity] = useState<boolean>(false);
  return {opacity, setOpacity};
};

export default useOpacity;
