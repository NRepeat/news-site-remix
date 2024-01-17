import React, {Dispatch, SetStateAction, createContext, useState} from 'react';
import {PageBlockInstance} from '~/components/PageConstructorBlocks/PageConstructorBlocks';

type PageConstructorContextType = {
  elements: PageBlockInstance[] | null;
  setElement: React.Dispatch<React.SetStateAction<PageBlockInstance[] | null>>;
  addElement: ({
    index,
    element,
  }: {
    index: number;
    element: PageBlockInstance;
  }) => void;
  updateElement: ({
    id,
    element,
  }: {
    id: string;
    element: PageBlockInstance;
  }) => void;
  removeElement: ({id}: {id: string}) => void;
  selectedElement: PageBlockInstance | null;
  setSelectedElement: Dispatch<SetStateAction<PageBlockInstance | null>>;
};

export const PageConstructorContext =
  createContext<PageConstructorContextType | null>(null);

const ConstructorContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [elements, setElement] = useState<PageBlockInstance[] | null>([]);
  const [selectedElement, setSelectedElement] =
    useState<PageBlockInstance | null>(null);
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
  const updateElement = ({
    id,
    element,
  }: {
    id: string;
    element: PageBlockInstance;
  }) => {
    setElement(prev => {
      if (Array.isArray(prev)) {
        const newElement = [...prev];
        const index = newElement.findIndex(el => el.id === id);
        newElement[index] = element;
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
      value={{
        setElement,
        elements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement,
      }}
    >
      {children}
    </PageConstructorContext.Provider>
  );
};

export default ConstructorContextProvider;
