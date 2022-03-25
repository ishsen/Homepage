import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import * as meshline from "threejs-meshline";
import {
  extend,
  Canvas,
  useFrame,
  useThree,
 

} from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Curves } from "three/examples/jsm/curves/CurveExtras";


import "./styles.css";


extend(meshline);
extend({ OrbitControls });






function Fatline({ curve, width, color, speed }) {
  const material = useRef();

  useFrame(() => (material.current.uniforms.dashOffset.value -= speed));

  return (
    <mesh rotation={[0, Math.random() * Math.PI, 0]}>
      <meshLine attach="geometry" vertices={curve} />
      <meshLineMaterial
        attach="material"
        ref={material}
        transparent
        depthTest={false}
        lineWidth={width}
        color={color}
        dashArray={0.01}
        dashRatio={0.95}
      />
    </mesh>
  );
}

const lineWidth = 0.2;
const count = 200;

function Lines({ count, colors }) {
  const lines = useMemo(
    () =>
      new Array(count).fill().map(() => {
        const curve = new Curves.VivianiCurve(70).getPoints(30);

        return {
          color: colors[parseInt(colors.length * Math.random())],
          width: lineWidth,
          speed: Math.max(0.0001, 0.0005 * Math.random()),
          curve
        };
      }),
    [colors, count]
  );
  return lines.map((props, index) => <Fatline key={index} {...props} />);
}

export default function MeshDash() {
  return (
    <div style={{position: 'absolute', width: '100%', height: '100%'}}>
      <Canvas camera={{ position: [0, 300, 300], fov: 25 }}>
 
        <Lines count={count} colors={["#9e91bc", "#4a4e7c", "#6f7db7"]} />
      </Canvas>
    </div>
  );
}