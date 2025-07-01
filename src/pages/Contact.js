/* eslint-disable no-unused-vars */
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
        <p>Telegram is the best way!</p>
      </header>
    </FluffyBorder>
  );
}
