import React from 'react';
import { useSelector } from 'react-redux';
import loading from '../../images/loadinganim.gif';

export default function Loading(props) {
  let { storeLoading, rehydrating } = props || false;

  const layOutLoading = useSelector((state) => state?.utilityCallFunctionSlice?.isLoading);

  const isLoading = layOutLoading || storeLoading || rehydrating;

  return (
    <>
      {isLoading && (
        <div className="al_mainLoading">
          <img src={loading} alt="loading" />
        </div>
      )}
    </>
  );
}
