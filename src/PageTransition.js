// PageTransition.js
// Animated page transition wrapper for Breezy the Fox React site
import React, { useRef, forwardRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const PageTransitionWrapper = forwardRef(function PageTransitionWrapper(props, ref) {
  return (
    <div ref={ref} className="page-transition-wrapper">
      {props.children}
    </div>
  );
});

export default function PageTransition({ children, locationKey }) {
  const nodeRef = useRef(null);
  return (
    <SwitchTransition>
      <CSSTransition
        key={locationKey}
        timeout={400}
        classNames="page-fade"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <PageTransitionWrapper ref={nodeRef}>{children}</PageTransitionWrapper>
      </CSSTransition>
    </SwitchTransition>
  );
}
