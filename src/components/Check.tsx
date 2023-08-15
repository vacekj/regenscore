import { Box, chakra } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import React from "react";

const CheckedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="1.5" width="21" height="21" rx="10.5" fill="#01966B" />
    <path d="M15.3333 9.5L10.75 14.0833L8.66663 12" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="1.5" y="1.5" width="21" height="21" rx="10.5" stroke="#C2ECBF" strokeWidth="3" />
  </svg>
);

const InProgressIcon = (props: React.HTMLProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="11" stroke="#C2ECBF" strokeWidth="2" />
    <circle cx="12" cy="12" r="6" fill="#01966B" stroke="#01966B" strokeWidth="2" />
  </svg>
);

const NotStarted = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" fill="white" />
    <circle cx="12" cy="12" r="11" stroke="#B4B4B4" strokeWidth="2" />
  </svg>
);

type Status = "NOT_STARTED" | "IN_PROGRESS" | "SUCCESS";

type CheckProps = {
  status: Status;
};

export function Check(props: CheckProps) {
  if (props.status === "SUCCESS") {
    return <CheckedIcon />;
  } else if (props.status === "IN_PROGRESS") {
    return <InProgressIcon />;
  } else if (props.status === "NOT_STARTED") {
    return <NotStarted />;
  }
}

export const ChakraBox = chakra(motion.div, {
  shouldForwardProp: isValidMotionProp,
});
