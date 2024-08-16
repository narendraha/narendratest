import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loading from '../../images/loadinganim.gif';
import { setLoading } from '../../store/UtilityCallFunction/slice';

export default function Loading(props) {
  const dispatch = useDispatch();
  let { storeLoading, rehydrating } = props || false;

  const layOutLoading = useSelector((state) => state?.utilityCallFunctionSlice?.isLoading);

  const isLoading = layOutLoading || storeLoading || rehydrating;

  useEffect(() => {
    if (rehydrating) {
      dispatch(setLoading(true));
    } else if (!layOutLoading && !storeLoading) {
      dispatch(setLoading(false));
    }
  }, [rehydrating, layOutLoading, storeLoading, dispatch]);

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
