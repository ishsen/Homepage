import * as THREE from "three/src/Three";
import { useSpring, animated } from "react-spring/three";
export default function Octahedron({ active, hovered }) {
    /*   const [active, setActive] = useState(false);
    const [hovered, setHover] = useState(false); */
    const vertices = [
      [-1, 0, 0],
      [0, 1, 0],
      [1, 0, 0],
      [0, -1, 0],
      [-1, 0, 0],
    ];
    const { color, pos, ...props } = useSpring({
      color: active ? "hotpink" : "white",
      pos: active ? [0, 0, 2] : [0, 0, 0],
      "material-opacity": hovered ? 0.6 : 0.25,
      scale: active ? [2, 2, 2] : [1, 1, 1],
      rotation: active
        ? [THREE.Math.degToRad(180), 0, THREE.Math.degToRad(45)]
        : [0, 0, 0],
      config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
    });
    return (
      <group>
        <animated.line position={pos}>
          <geometry
            attach="geometry"
            vertices={vertices.map((v) => new THREE.Vector3(...v))}
          />
          <animated.lineBasicMaterial attach="material" color={color} />
        </animated.line>
        <animated.mesh {...props}>
          <octahedronGeometry attach="geometry" />
          <meshStandardMaterial attach="material" color="grey" transparent />
        </animated.mesh>
      </group>
    );
  }