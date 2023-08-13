import { Box, chakra } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";

export function Check(props: {}) {
  return (
    <ChakraBox
      as={motion.div}
      bg="green"
      w="24px"
      h="24px"
      transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      }}
    >
    </ChakraBox>
  );
}

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: isValidMotionProp,
});
