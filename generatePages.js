const fs = require('fs');
const path = require('path');

const data = require('./data.json'); // Ensure correct path to data.json

data.forEach(page => {
  // Generate a safe file path by removing invalid characters
  const safeUrl = page.url.replace(/https?:\/\/[^/]+/, '').replace(/[^\w\-\/]/g, '_');
  const filePath = path.join(__dirname, '../my-next-app/pages', `${safeUrl || 'index'}.tsx`); // Update path to my-next-app/pages
  const dir = path.dirname(filePath);

  // Create directories recursively
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write the file content
  fs.writeFileSync(filePath, `
import React from 'react';
import Head from 'next/head';

const Page = () => (
  <div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(page.html)} }} />
);

export default Page;
  `);
});
