import React, { useState, useRef, useMemo } from "react";
import { Spring } from "react-spring/renderprops";
import VisibilitySensor from "./components/VisibilitySensor";
import "./styles.css";

import * as THREE from "three/src/Three";
import Octahedron from './components/Octahedron'
import { Canvas, useRender } from "react-three-fiber";
import Chain from './components/Experience'

import { useTrail, animated as a, useChain } from "react-spring";
import MeshDash from "./MeshDash";

const FormChain = ({ isVisible }) => {
  const trail1Ref = useRef();
  const trail2Ref = useRef();
  const trail3Ref = useRef();
  const trail4Ref = useRef();

  useChain(
    isVisible
      ? [trail1Ref, trail2Ref, trail3Ref, trail4Ref]
      : [trail4Ref, trail3Ref, trail2Ref, trail1Ref],

    isVisible ? [0.5, 1.0, 1.5, 2.0] : [0.5, 1.0, 1.5, 2.0]
  );

  return (
    <div class="container">

      <form class="form-minimal">

        <FormTrail open={isVisible} trailRef={trail1Ref}>

          <div class="minimal-input">
            <input
              class="minimal-textfield"
              id="first-name"
              type="text"
              autocomplete="off"
            />
            <div
              class="textfield-underline"
              style={{ width: isVisible ? "100%" : "0%" }}
            ></div>
            <label for="first-name">First name</label>
          </div>
        </FormTrail>

        <FormTrail open={isVisible} trailRef={trail2Ref}>
          <div class="minimal-input">
            <input
              class="minimal-textfield"
              id="last-name"
              type="text"
              autocomplete="off"
            />
            <div
              class="textfield-underline"
              style={{ width: isVisible ? "100%" : "0%" }}
            ></div>
            <label for="last-name">Last name</label>
          </div>
        </FormTrail>

        <FormTrail open={isVisible} trailRef={trail3Ref}>
          <div class="minimal-input">
            <input
              class="minimal-textfield"
              id="email"
              type="text"
              autocomplete="off"
            />
            <div
              class="textfield-underline"
              style={{ width: isVisible ? "100%" : "0%" }}
            ></div>
            <label for="email">Email</label>
          </div>
        </FormTrail>

        <FormTrail open={isVisible} trailRef={trail4Ref}>
          <button class="btn-minimal" type="submit">
            Send
          </button>
        </FormTrail>
      </form>
    </div>
  );
};



function Trail({ open, children, ...props }) {
  const items = React.Children.toArray(children);

  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div className="flex__page trails-main" {...props}>
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

const PAGE_INFO = {
  contact_info: {
    phone: "443-760-1159",
    emails: ["ishan6060@gmail.com", "ishsen6060@gmail.com"],
    github: "https://www.github.com/ishsen"
  },
  projects: [
    {
      number: '01', title: 'CLIP STUDIO Version Control CLI',
      languages: 'Node.js, Git',
      link: "https://github.com/ishsen/clip-git",

      points: ["A command line interface for quickly previewing png images and getting layer information for .clip files committed to an existing repository with GIT LFS enabled",
        "Allows retrieval of multiple version to view progression of image over time and get previous version quickly without opening CLIP STUDIO program"
      ]

    },
    {
      number: '02', title: 'Epidemic Particle Simulation',
      languages: 'WebGL, Javascript, CSS, HTML',
      link: "https://github.com/ishsen/webgl_particle_simulation",
      points: ["The progression of an infectious disease modeled by a particle simulation. Two particles colliding carries a chance of spread based on heuristics and chance of susceptibility and infectivity of colliding particles",
        "Utilized insights in epidemiology in order to accurately portray interactions between particles and gauge statistical chance of infection spread"
      ]

    },
    {
      number: '03', title: 'Web Novel Summarizer',
      languages: 'Python',
      link: "https://github.com/ishsen/light-novel-cli",
      points: ['A command line tool to read and navigate through web novel/light novel websites in the terminal. Uses machine learning and text summarization algorithms to get summaries for specified number of chapters for an inputted story.',

      ]

    },
    {
      number: '04', title: 'OpenGL IMGUI Editor',
      languages: 'C++, IMGUI, OpenGL',
      link: "https://github.com/ishsen/PictureOpenGL",
      points: ['A simple OpenGl object editor with a IMGUI menu system to manipulate object properties and save an image for export to Clip Studio or Photoshop'

      ]

    },
    {
      number: '05', title: 'Letterboxd Chrome Extension',
      languages: 'Javascript, Tensorflow',
      link: "https://github.com/ishsen/Letterboxd-Chrome",
      points: ['A set of tools for the Letterboxd web page including a tensorflow.js sentimentality model for reviews on movies'

      ]

    },


  ]
}


function FormTrail({ open, trailRef, children, ...props }) {
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
    <div className="flex__page forms-side" {...props}>
      {trail.map(({ x, height, ...rest }, index) => (
        <a.div
          key={items[index]}
          className="forms-text"
          style={{
            ...rest,
            transform: x.interpolate((x) => `translate3d(0,${x}px,0)`),
          }}
        >
          <a.div>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
}



function App() {
  const [active, setActive] = useState(false);
  const [hovered, setHover] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0)

  function changeFocus(n) {
    setActive(!active)
    setActiveIndex(n)

  }

  return (
    <main>
      <div className="frame">
        <div className="frame__title-wrap">
          <h1 className="frame__title">Ishan Sengupta</h1>
          <p className="frame__tagline">Front-end Experiment</p>
        </div>
        <div className="frame__links">
          <a href="https://www.dropbox.com/s/wchtpctilaxujfv/ISHAN_UPDATED_RESUME.pdf?dl=0">
            Resume
          </a>
        </div>
        <div className="frame__demos">
          <a
            href="https://isengupt.github.io/glass-blur/"
            activeClassName="frame__demo--current"
            className="frame__demo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="16"
            >
              <path
                fill-rule="evenodd"
                d="M7.78 12.53a.75.75 0 01-1.06 0L2.47 8.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L4.81 7h7.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z"
              ></path>
            </svg>
          </a>
          <a
            href="https://github.com/isengupt/fiber-website"
            activeClassName="frame__demo--current"
            className="frame__demo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="16"
            >
              <path
                fill-rule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
          </a>
          <a
            href='#'
            activeClassName="frame__demo--current"
            className="frame__demo"



          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="16"
            >
              <path
                fill-rule="evenodd"
                d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="content">
        <div style={{ width: "100%" }}>
          <div className="div">
            <div className="page__container">
              <MeshDash />
              <VisibilitySensor partialVisibility>
                {({ isVisible }) => (
                  <>
                    <Trail open={isVisible}>
                      <div className="page__name">EDUCATION</div>
                      <div className="page__line">
                        <div
                          className="line"
                          style={{ width: isVisible ? "50px" : "0px" }}
                        ></div>
                      </div>
                      <div className="page__title">
                        University of Maryland, College Park
                      </div>
                      <div className="page__description">
                        Bachelor of Science in Mathematics, Minor in Physics
                      </div>
                    </Trail>
                  </>
                )}
              </VisibilitySensor>
            </div>
          </div>
          <div className="div">
            <VisibilitySensor partialVisibility>
              {({ isVisible }) => <Chain isVisible={isVisible} />}
            </VisibilitySensor>
          </div>
          <div className="div"


          >
            <div className="page__container page__grid__alternate z_front"

            >
              <div className="grid__item">
                <VisibilitySensor partialVisibility>
                  {({ isVisible }) => (
                    <Trail open={isVisible}>
                      <div className="page__name"  >PROJECTS</div>
                      <div className="page__line">
                        <div className="line"></div>
                      </div>
                      <div className="page__title"
                        onClick={e => setActive(!active)} onPointerOver={e => setHover(true)} onPointerOut={e => setHover(false)}
                      >
                        Projects in programming
                      </div>

                      {PAGE_INFO.projects.map((item, i) =>
                <div
                className="page__description page__big page__flex"
                onClick={e => setActive(!active)} onPointerOver={e => setHover(true)} onPointerOut={e => setHover(false)}
              >
                <div className="page__number" style={{ opacity: activeIndex === 0 ? 1 : 0.5 }} >{item.number}</div>
                <div className="page__description page__white"

                  onClick={e => changeFocus(i)}
                  style={{ opacity: activeIndex === 0 ? 1 : 0.5 }}>{item.title}</div>
              </div> 

                          )}

           
                      
                     
                    </Trail>
                  )}
                </VisibilitySensor>
              </div>
              <div className="grid__item full_height"

              >
                <VisibilitySensor partialVisibility>
                  {({ isVisible }) => (
                    <>
                      <Spring
                        delay={300}
                        to={{
                          position: "absolute",
                          opacity: isVisible ? 1 : 0,
                        }}
                      >
                        {({ opacity }) => (
                          <Canvas
                            style={{ position: "absolute", opacity: opacity }}
                          >
                            <ambientLight color="lightblue" />
                            <pointLight
                              color="white"
                              intensity={1}
                              position={[10, 10, 10]}
                            />
                            <Octahedron active={active} hovered={hovered} />
                          </Canvas>
                        )}
                      </Spring>
                      <div className="altered__text">
                        <Trail open={isVisible}>


                          <div className="page__description page__big page__flex page__bold">
                            <div className="page__number">{PAGE_INFO.projects[activeIndex].number}</div>
                            <div>{PAGE_INFO.projects[activeIndex].title}</div>
                          </div>
                          <div className="page__subtitle page__small" style={{ fontWeight: 'bold', opacity: 0.5 }}>{PAGE_INFO.projects[activeIndex].languages}</div>
                         <a className="page__subtitle page__small">{PAGE_INFO.projects[activeIndex].link}</a>
                         
                          {PAGE_INFO.projects[activeIndex].points.map((item) =>
                            <div
                              className="page__description page__small"

                            >
                              {item}
                            </div>

                          )}


                        </Trail>
                      </div>
                    </>
                  )}
                </VisibilitySensor>
              </div>
            </div>
          </div>
          <div className="div">
            <div className="page__container page__grid__alternate">
              <div className="grid__item">
                <VisibilitySensor partialVisibility>
                  {({ isVisible }) => (
                    <Trail open={isVisible}>
                      <div className="page__name">Contact</div>
                      <div className="page__line">
                        <div className="line"></div>
                      </div>
                      <div className="page__title">
                        Get in contact or inquire about projects
                      </div>
                      <div className="page__description page__big page__flex">
                        <div className="page__number">Phone:</div>
                        <div>{PAGE_INFO.contact_info.phone}</div>
                      </div>
                      <div className="page__description page__big page__flex">
                        <div className="page__number">Email:</div>
                        <div>{PAGE_INFO.contact_info.emails[0]}</div>
                      </div>
                      <div className="page__description page__big page__flex">
                        <div className="page__number">Github:</div>
                        <a href= {PAGE_INFO.contact_info.github}>{PAGE_INFO.contact_info.github}</a>
                      </div>

                      <div className="page__description page__big page__flex">
                        <div className="page__number">Alternate:</div>
                        <div>{PAGE_INFO.contact_info.emails[1]}</div>
                      </div>

                    </Trail>
                  )}
                </VisibilitySensor>
              </div>

              <VisibilitySensor once>
                {({ isVisible }) => <FormChain isVisible={isVisible} />}
              </VisibilitySensor>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
