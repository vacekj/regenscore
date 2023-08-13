import { Box, chakra } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import myIcon from "public/icons/done.svg";

export function Check(props: {}) {
  return (
    <ChakraBox as={motion.div} w="24px" h="24px">
      <img src={myIcon} alt="My Icon" className="custom-icon" /> {"public/icons/done.svg"}
    </ChakraBox>
  );
}

export const ChakraBox = chakra(motion.div, {
  shouldForwardProp: isValidMotionProp,
});