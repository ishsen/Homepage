
import React, { useState, useRef, useMemo } from "react";
import { useTrail, animated as a, useChain } from "react-spring";


function ChainTrail({ open, trailRef, children, ...props }) {
    const items = React.Children.toArray(children);
  
    const trail = useTrail(items.length, {
      config: { mass: 5, tension: 2000, friction: 200 },
      opacity: open ? 1 : 0,
      x: open ? 0 : 20,
      ref: trailRef,
      height: open ? 110 : 0,
      from: { opacity: 0, x: 20, height: 0 },
      reverse: !open,
    });
    return (
      <div className="flex__page trails-side" {...props}>
        <div>
          {trail.map(({ x, height, ...rest }, index) => (
            <a.div
              key={items[index]}
              className="trails-text"
              style={{
                ...rest,
                transform: x.interpolate((x) => `translate3d(0,${x}px,0)`),
              }}
            >
              <a.div>{items[index]}</a.div>
            </a.div>
          ))}
        </div>
      </div>
    );
  }

export default function Chain ({ isVisible })  {
    const trail1Ref = useRef();
  
    const trail2Ref = useRef();
  
    const trail3Ref = useRef();
  
    useChain(
      isVisible
        ? [trail1Ref, trail2Ref, trail3Ref]
        : [trail3Ref, trail2Ref, trail1Ref],
  
      isVisible ? [0.4, 0.8, 1.2] : [0.4, 0.8, 1.2]
    );
  
    return (
      <div className="page__container page__grid">
        <div className="grid__item">
          <ChainTrail open={isVisible} trailRef={trail1Ref}>
            <div className="page__name">INTERN</div>
            <div className="page__line">
              <div className="line"></div>
            </div>
            <div className="page__title">
            Future Doctors Organization
            </div>
            <div className="page__subtitle">
            Remote
            </div>
            <div className="page__description page__small">
            Built a React, Meteor.js full stack web application that uses the publication and subscription pattern 
            </div>
            <div className="page__description page__small">
            Created multiple schemas for the events, announcements, and auxiliary data 
            </div>
          
          </ChainTrail>
        </div>
        <div className="grid__item">
          <ChainTrail open={isVisible} trailRef={trail2Ref}>
            <div className="page__name">01</div>
            <div className="page__line">
              <div className="line"></div>
            </div>
            <div className="page__title title__small">
            Contain Covid
            </div>
            <div className="page__subtitle page__small">
            Remote
            </div>
            <div className="page__description page__small">
            Aided in implementing a web application that takes user’s Google takeout data to tag locations for manual contact tracing
            </div>
          </ChainTrail>
        </div>
  
        <div className="grid__item">
          <ChainTrail open={isVisible} trailRef={trail3Ref}>
            <div className="page__name">02</div>
            <div className="page__line">
              <div className="line"></div>
            </div>
            <div className="page__title title__small">
            Neuroscience Research Assistant
            </div>
            <div className="page__subtitle page__small">
            Remote
            </div>
            <div className="page__description page__small">
            Created an OpenCV optical-flow program in Python that uses the Lucas-Kanade method to track motion of objects

            </div>
          </ChainTrail>
        </div>
      </div>
    );
  };