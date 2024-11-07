import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { setMenuOrPdfExpend } from '../../../store/EducationaChatBot/slice';
import { Spinner } from 'reactstrap'; // Use any spinner or loading component you prefer


export const DocumentViewer = React.memo((props) => {
    
    const [loading, setLoading] = useState(true);

    const actionData = useSelector((state) => (state?.utilityCallFunctionSlice?.actionData));

    let { link, fileType } = actionData;

    const handleIframeLoad = () => {
        setLoading(false);
    };

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
        </React.Fragment>
    );
});
