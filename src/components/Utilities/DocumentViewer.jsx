import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'reactstrap'; // Use any spinner or loading component you prefer
import { getActionTypes } from '../../_mock/internalJsControl';
import { setActionTypeAndActionData } from '../../store/UtilityCallFunction/slice';
import img from "../../images/doctorbot.png"

export const DocumentViewer = React.memo((props) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const actionData = useSelector((state) => (state?.utilityCallFunctionSlice?.actionData));

    let { link, fileType } = actionData || "";

    const handleIframeLoad = () => {
        setLoading(false);
    };

    const handleCloseDocView = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT, actionData: null }));
    }

    return (
        <React.Fragment>
            {/* Show loading spinner until iframe is loaded */}
            {loading && (
                <div className="text-center my-4 d-flex align-items-center h-100 justify-content-center">
                    <Spinner color="primary" />
                    <p className='mb-0'>{`Loading ${fileType}...`}</p>
                </div>
            )}

            {/* PDF Viewer using iframe */}
            {link !== null ? (
                <>
                    <i
                        className="icon_alfred_close pointer text-end"
                        onClick={handleCloseDocView}
                    ></i>
                    <iframe
                        src={img}
                        width="100%"
                        height="auto"
                        title="PDF Viewer"
                        style={{ border: 'none', height: "100%" }}
                        onLoad={handleIframeLoad} // Triggered when iframe content is loaded
                    ></iframe>
                </>
            ) : (
                <p className='mb-0'>No PDF available to display.</p>
            )}
        </React.Fragment>
    );
});
