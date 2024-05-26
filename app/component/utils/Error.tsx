import React, { ReactNode } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

function Error({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="error">
      <div className="icon">
        <FaExclamationCircle />
      </div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default Error;
