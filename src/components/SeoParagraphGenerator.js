// src/components/SeoParagraphGenerator.js
import React, { useEffect, useState } from 'react';

const SeoParagraphGenerator = () => {
  const [seoSummary, setSeoSummary] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/seo-paragraph-generator/api/seo-summary`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSeoSummary(data);
      } catch (error) {
        console.error('Error fetching SEO summary:', error);
      }
    };

    fetchData();
  }, [API_URL]);

  return (
    <div>
      {seoSummary ? (
        <pre>{JSON.stringify(seoSummary, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SeoParagraphGenerator;
