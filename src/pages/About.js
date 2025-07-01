/* eslint-disable no-unused-vars */
import React from 'react';
import FluffyBorder from '../FluffyBorder';
import { useLocation } from 'react-router-dom';

export default function About() {
  const location = useLocation();
  return (
    <FluffyBorder>
      <header className="App-header">
        <h2>About Breezy</h2>
        <p>N/A ATM</p>
      </header>
    </FluffyBorder>
  );
}
