/*
  Home.js
  Home page content for Breezy the Fox React site
  - Uses FluffyBorder for pastel, soft-edged card effect
  - Features custom GIF, fursona name, and animated social links
  - Uses a React ref for orbiting paw particle effects (anchored to card)
  - Accessibility: all social links have aria-labels and open in new tabs
  - Mobile/responsive: layout and spacing are handled in App.css for a seamless user experience across various devices and screen sizes
*/
import React, { useEffect } from 'react';
import FluffyBorder from '../FluffyBorder';

// Ref used to anchor orbiting paw particles on Home card
// This ref is crucial for creating a parallax effect, where the paw particles appear to orbit around the card
export const homeCardRef = React.createRef();

export default function Home() {
  useEffect(() => {
    // Ensure the ref always points to the card div for parallax/orbiting anchoring
    // This is necessary to maintain the correct positioning of the paw particles
    if (homeCardRef.current) {
      homeCardRef.current.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }, []);

  return (
    // FluffyBorder component is used to create a pastel, soft-edged card effect
    // This component is a custom implementation that provides a unique visual style to the Home page
    <FluffyBorder color="#ffb6c1">
      {/*
        Main card container for Home page
        - Contains fursona image, name, and animated social links
        - Ref is used for orbiting paw effect
      */}
      <header className="App-header" ref={homeCardRef}>
        {/*
          Fursona image (custom GIF)
          - alt text for accessibility
          - spacing and size handled in App.css
        */}
        <img src="/breezy1.gif" alt="Breezy the Fox" className="fursona-img" />
        {/*
          Fursona name in cute font
          - Styled via .fursona-name in App.css
        */}
        <h1 className="fursona-name">Breezy</h1>
        {/*
          Social media links with animated SVG icons
          - Each link has aria-label for accessibility
          - Opens in a new tab with rel="noopener noreferrer"
          - This ensures that users with screen readers can navigate the links easily
        */}
        <div className="social-links">
          {/* Twitter */}
          <a href="https://x.com/BreezyFops" className="social-icon twitter" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#1da1f2" xmlns="http://www.w3.org/2000/svg"><path d="M22.46 5.924c-.793.352-1.646.59-2.542.698a4.48 4.48 0 0 0 1.963-2.475 8.98 8.98 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.481 0-4.495 2.013-4.495 4.495 0 .353.04.698.116 1.027C7.728 9.37 4.1 7.575 1.67 4.917a4.49 4.49 0 0 0-.608 2.262c0 1.56.795 2.936 2.003 3.746a4.48 4.48 0 0 1-2.037-.563v.057c0 2.18 1.551 4.002 3.612 4.418a4.493 4.493 0 0 1-2.03.077c.573 1.788 2.236 3.09 4.205 3.125A8.99 8.99 0 0 1 2 19.54a12.71 12.71 0 0 0 6.88 2.017c8.255 0 12.776-6.838 12.776-12.776 0-.195-.004-.39-.013-.583A9.14 9.14 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.698z"/></svg>
          </a>
          {/* SoundCloud */}
          <a href="https://soundcloud.com/brzyyy" className="social-icon soundcloud" target="_blank" rel="noopener noreferrer" aria-label="SoundCloud">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#ff5500" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 10.5a4.5 4.5 0 0 1 0 9h-11a2.5 2.5 0 0 1 0-5c.21 0 .41.02.61.06a.5.5 0 0 0 .59-.5V7.5A4.5 4.5 0 0 1 17.5 10.5z"/></svg>
          </a>
          {/* Telegram */}
          <a href="http://t.me/breezyfops" className="social-icon telegram" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#229ED9" xmlns="http://www.w3.org/2000/svg"><path d="M9.04 16.87l-.39 3.46c.56 0 .81-.24 1.1-.53l2.65-2.53 5.5 4.02c1.01.56 1.73.27 1.97-.94l3.57-16.7c.33-1.55-.56-2.16-1.53-1.8L1.41 9.53c-1.51.59-1.49 1.44-.26 1.83l4.56 1.43 10.6-6.67c.5-.32.96-.14.58.2l-8.58 7.71z"/></svg>
          </a>
        </div>
      </header>
    </FluffyBorder>
  );
}
