import React, {FC} from 'react';

export const FormikFieldError: FC<{ error?: string; touched?: boolean }> = ({error, touched}) =>
  error && touched ? <div style={{color: 'red'}}>{error}</div> : null;
