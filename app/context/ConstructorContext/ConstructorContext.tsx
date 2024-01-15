import React, {createContext, useState} from 'react';
import {PageBlockInstance} from '~/components/PageConstructorBlocks/PageConstructorBlocks';

type PageConstructorContextType = {
  elements: PageBlockInstance[] | null;
  addElement: ({
    index,
    element,
  }: {
    index: number;
    element: PageBlockInstance;
  }) => void;
};

export const PageConstructorContext =
  createContext<PageConstructorContextType | null>(null);

const ConstructorContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [elements, setElement] = useState<PageBlockInstance[] | null>([]);
  const addElement = ({
    element,
    index,
  }: {
    index: number;
    element: PageBlockInstance;
  }) => {
    setElement(prev => {
      if (Array.isArray(prev)) {
        const newElement = [...prev];
        newElement.splice(index, 0, element);
        return newElement;
      }
      return prev;
    });
  };

  return (
    <PageConstructorContext.Provider value={{elements, addElement}}>
      {children}
    </PageConstructorContext.Provider>
  );
};

export default ConstructorContextProvider;
