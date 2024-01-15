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
  removeElement: ({id}: {id: string}) => void;
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

  const removeElement = ({id}: {id: string}) => {
    setElement(prev => {
      if (Array.isArray(prev)) {
        return prev.filter(element => element.id !== id);
      }
      return prev;
    });
  };

  return (
    <PageConstructorContext.Provider
      value={{elements, addElement, removeElement}}
    >
      {children}
    </PageConstructorContext.Provider>
  );
};

export default ConstructorContextProvider;
