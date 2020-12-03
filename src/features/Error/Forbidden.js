import React from 'react';

import Error from './Error';

const Forbidden = () => {
  return (
    <Error title="403: Forbidden">
      You do not have permission to access the page or resource.
    </Error>
  );
};

export default Forbidden;
