import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Footer from "./Footer";
import Header from "./Header";
import PageTransition from "./PageTransition";
import TrackedActivity from "@/pages/TrackedActivity";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <PageTransition>
      <Flex
        as="main"
        width="100%"
        minWidth={"100vw"}
        flexDirection="column"
        backgroundColor={"brand.backgroundOrange.400"}
      >
        <Header />
        <Box as="main" minHeight="100vh" flexGrow={1}>
          {children}
        </Box>
        <Footer />
      </Flex>
    </PageTransition>
  );
};

export default Layout;
