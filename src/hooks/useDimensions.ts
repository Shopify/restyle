import {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';

import {Dimensions as DimensionsType} from '../types';

const useDimensions = () => {
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

  return dimensions;
};

export default useDimensions;
