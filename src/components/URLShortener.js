import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './URLShortener.css';

const shortenURL = (longUrl, validity, shortcode) => {
  const short = shortcode || uuidv4().slice(0, 6);
  const now = new Date();
  const expiry = new Date(now.getTime() + (validity || 30) * 60000);
  return {
    original: longUrl,
    short,
    createdAt: now.toISOString(),
    expiresAt: expiry.toISOString(),
    clicks: [],
  };
};

const URLShortener = ({ urls, setUrls }) => {
  const [inputs, setInputs] = useState([{ url: '', validity: '', shortcode: '' }]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const validateURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleShorten = () => {
    const newUrls = [];
    for (const input of inputs) {
      if (!input.url || !validateURL(input.url)) {
        setMessage('Invalid URL!');
        setError(true);
        return;
      }
      if (input.shortcode && urls.find(u => u.short === input.shortcode)) {
        setMessage('Shortcode already used!');
        setError(true);
        return;
      }
      const data = shortenURL(input.url, parseInt(input.validity), input.shortcode);
      newUrls.push(data);
    }
    setUrls([...urls, ...newUrls]);
    setMessage('URLs shortened!');
    setError(false);
  };

  const addInput = () => {
    if (inputs.length < 5) setInputs([...inputs, { url: '', validity: '', shortcode: '' }]);
  };

  return (
    <div className="form-container">
      <h2>Shorten URLs</h2>
      {inputs.map((input, i) => (
        <div className="input-group" key={i}>
          <input
            type="text"
            placeholder="Original URL"
            value={input.url}
            onChange={(e) => handleChange(i, 'url', e.target.value)}
          />
          <input
            type="number"
            placeholder="Validity (minutes)"
            value={input.validity}
            onChange={(e) => handleChange(i, 'validity', e.target.value)}
          />
          <input
            type="text"
            placeholder="Shortcode (optional)"
            value={input.shortcode}
            onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
          />
        </div>
      ))}
      <button onClick={addInput}>+ Add URL</button>
      <button onClick={handleShorten}>Shorten URLs</button>
      {message && (
        <div className={error ? 'error' : 'success'}>
          {message}
        </div>
      )}
    </div>
  );
};

export default URLShortener;
