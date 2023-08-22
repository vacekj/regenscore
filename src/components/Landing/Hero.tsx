import { Flex } from "@chakra-ui/react";
import Slider from "./HeroSlider";

export default function Hero() {
  return (
    <Flex w={{ base: "100%", md: "95%" }} justifySelf="flex-end">
      <Slider />
    </Flex>
  );
}
