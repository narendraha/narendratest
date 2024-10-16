import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuOrPdfExpend } from '../../../store/EducationaChatBot/slice';
import { Spinner } from 'reactstrap'; // Use any spinner or loading component you prefer

export const AdminEducationalBotPdfViewer = React.memo(() => {
  const dispatch = useDispatch();
  const pdfReferenceLink = useSelector(
    (state) => state?.educationalChatBotSlice?.pdfReferenceLink
  );

  const [loading, setLoading] = useState(true); // Track loading state

  const menuExpandHandle = () => {
    dispatch(setMenuOrPdfExpend({ isPdfViewExpand: false }));
    dispatch(setMenuOrPdfExpend({ isMenuExpand: true }))
  };

  const handleIframeLoad = () => {
    setLoading(false); // Hide loading spinner once the iframe is fully loaded
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
            <p className='mb-0'>Loading PDF...</p>
          </div>
        )}

        {/* PDF Viewer using iframe */}
        {pdfReferenceLink ? (
          <iframe
            src={pdfReferenceLink}
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
