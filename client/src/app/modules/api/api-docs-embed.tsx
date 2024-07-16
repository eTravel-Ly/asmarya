import React from 'react';

const ApiDocsEmbed = () => {
  return (
    <div className="api-docs">
      <iframe src="/api/v2/api-docs/" title="API Documentation" style={{ width: '100%', height: '800px', border: 'none' }} />
    </div>
  );
};

export default ApiDocsEmbed;
