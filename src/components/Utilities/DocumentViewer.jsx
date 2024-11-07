import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { setMenuOrPdfExpend } from '../../../store/EducationaChatBot/slice';
import { Spinner } from 'reactstrap'; // Use any spinner or loading component you prefer
import { setActionTypeAndActionData } from '../../store/UtilityCallFunction/slice';
import { getActionTypes } from '../../_mock/internalJsControl';

export const DocumentViewer = React.memo((props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const actionData = useSelector((state) => (state?.utilityCallFunctionSlice?.actionData));

    let { link, fileType } = actionData;

    const menuExpandHandle = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT, actionData: null }))
    };

    const handleIframeLoad = () => {
        setLoading(false);
    };

    return (
        <React.Fragment>
            <div className="al_pdf_expand">
                <i
                    className="icon_alfred_close pointer text-end"
                    onClick={menuExpandHandle}
                ></i>

                {/* Show loading spinner until iframe is loaded */}
                {loading && (
                    <div className="text-center my-4 d-flex align-items-center h-100 justify-content-center">
                        <Spinner color="primary" />
                        <p className='mb-0'>{`Loading ${fileType}...`}</p>
                    </div>
                )}

                {/* PDF Viewer using iframe */}
                {link ? (
                    <iframe
                        src={link}
                        width="100%"
                        height="auto"
                        title="PDF Viewer"
                        style={{ border: 'none', height: "100%" }}
                        onLoad={handleIframeLoad} // Triggered when iframe content is loaded
                    ></iframe>
                ) : (
                    <p className='mb-0'>No PDF available to display.</p>
                )}
            </div>
        </React.Fragment>
    );
});
