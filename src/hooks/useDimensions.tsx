import React, {useState, useEffect, useContext} from 'react';
import {Dimensions} from 'react-native';

import {Dimensions as DimensionsType} from '../types';

const DimensionsContext = React.createContext<DimensionsType>({
  width: 0,
  height: 0,
});

export const DimensionsProvider = ({children}: {children: React.ReactNode}) => {
  const [dimensions, setDimensions] = useState<DimensionsType>(
    Dimensions.get('window'),
  );

  const onChange = ({window}: {window: DimensionsType}) => {
    setDimensions(window);
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', onChange) as any;

    return () =>
      // Using removeEventListener is deprecated in react-native > 0.65 and will throw warning. Use .remove() if available.
      subscription && subscription.remove
        ? subscription.remove()
        : Dimensions.removeEventListener('change', onChange);
  }, []);

  return (
    <DimensionsContext.Provider value={dimensions}>
      {children}
    </DimensionsContext.Provider>
  );
};

const useDimensions = () => useContext(DimensionsContext);

export default useDimensions;
