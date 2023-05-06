import React, { Suspense, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Canvas, useThree } from "@react-three/fiber";
import {
  RootContainer,
  Text,
  SVG,
  Box,
  Image,
  Container,
  PlatformConstants
} from "@coconut-xr/koestlich";
import loadYogaSync from "yoga-wasm-web";
import { PerspectiveCamera } from "three";
//@ts-ignore
import image from "./assets/example.png";
//@ts-ignore
import svg from "./assets/example.svg";
import { Slider } from "@coconut-xr/kruemel";
import { TextureLoader } from "expo-three"

async function loadYoga() {
  return (loadYogaSync as any)();
}

PlatformConstants.TextureLoader = TextureLoader

export default function App() {
  return (
    <View style={styles.container}>
      <Canvas gl={{ localClippingEnabled: true }}>
        <pointLight intensity={0.5} position={[0, 0, -1]} />
        <ambientLight intensity={0.5} />
        <UI />
      </Canvas>
    </View>
  );
}

function UI() {
  const ratio = useThree((s) => s.size.width / s.size.height);
  const camera = useThree((s) => s.camera as PerspectiveCamera);
  camera.position.set(ratio / 2, -0.5, 0.5);
  camera.fov = 90;
  camera.updateProjectionMatrix();
  const [value, setValue] = useState(0.5);
  return (
    <Suspense>
      <RootContainer
        loadYoga={loadYoga}
        width={ratio}
        height={1}
        gapColumn={0.05}
        gapRow={0.05}
        padding={0.05}
        backgroundColor="black"
        overflow="scroll"
      >
        <Image width="100%" url={image} />
        <Container backgroundColor="#0f0" padding={0.05} flexDirection="column">
          <Text fontSize={0.065}>Koestlich</Text>
          <Text fontSize={0.04}>running on React Native using Expo.</Text>
        </Container>
        <Container
          backgroundColor="blue"
          gapColumn={0.05}
          padding={0.1 * value}
          flexDirection="column"
        >
          <Text fontSize={0.03}>Slider</Text>
          <Slider
            scaleX={0.7}
            scaleY={0.7}
            scaleZ={0.7}
            onChange={setValue}
            value={value}
            range={1}
          />
        </Container>
        <SVG color="white" url={svg} />
        <Text
          horizontalAlign="block"
          padding={0.05}
          fontSize={0.03}
          backgroundColor="green"
        >
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?
        </Text>
      </RootContainer>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
