import React from 'react';

const EducationalBotHTMLcontent = ({ props }) => {
    console.log("propsprops", props);
    const htmlContent = `
<!DOCTYPE html>
<html>
    <div class="scoped-content">
      <style>
        .scoped-content body {
          font-family: Poppins;
          font-size: 13px;
          line-height: 1.8;
        }
        .scoped-content ol {
          margin-top: 5px;
        }
        .scoped-content ol li {
          margin-bottom: 6px;
        }
        .scoped-content ul {
          margin-top: 5px;
          padding-left: 20px;
          margin-bottom: 25px;
        }
        .scoped-content ul li {
          list-style-type: disc;
          margin-bottom: 6px;
        }
        .scoped-content h1, .scoped-content h2, .scoped-content h3, 
        .scoped-content h4, .scoped-content h5, .scoped-content h6 {
          font-size: 13.5px;
        }
      </style>
      <body>
      ${props}
      </body>
    </div>
    </html
  `;

    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

export default EducationalBotHTMLcontent;
