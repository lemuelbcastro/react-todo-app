import React from 'react';

import Error from './Error';

const ServerError = () => {
  return (
    <Error title="500: Internal Server Error">
      The server encountered an internal error and was unable to complete your
      request.
    </Error>
  );
};

export default ServerError;
