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
    Dimensions.addEventListener('change', onChange);

    return () => Dimensions.removeEventListener('change', onChange);
  }, []);

  return dimensions;
};

export default useDimensions;
