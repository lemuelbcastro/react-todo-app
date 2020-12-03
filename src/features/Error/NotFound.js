import React from 'react';

import Error from './Error';

const NotFound = () => {
  return (
    <Error title="404: Not Found">
      The page or resource you are looking for was not found.
    </Error>
  );
};

export default NotFound;
