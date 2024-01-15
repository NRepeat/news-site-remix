import {useContext} from 'react';
import {PageConstructorContext} from '~/context/ConstructorContext/ConstructorContext';

const useConstructor = () => {
  const context = useContext(PageConstructorContext);

  if (!context) {
    throw new Error('Not constructor context');
  }
  return context;
};

export default useConstructor;
