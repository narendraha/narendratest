import React from 'react';
import loading from '../../../images/loadinganim.gif';

export default function Loading() {
  return (
    <div className="al_mainLoading">
        <img src={loading} alt="loading" />
    </div>
  )
}
