import React from 'react';
import FluffyBorder from '../FluffyBorder';
import { useLocation } from 'react-router-dom';

export default function Contact() {
  const location = useLocation();
  return (
    <FluffyBorder>
      <header className="App-header">
        <h2>Contact Breezy</h2>
        <br />
        <p>You can reach Breezy via Twitter, SoundCloud, or Telegram using the links above!</p>
        <p>Telegram is the best way!</p>
      </header>
    </FluffyBorder>
  );
}
