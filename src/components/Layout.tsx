import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex
      as='main'
      minHeight='100vh'
      width='100%'
      minWidth={'100vw'}
      flexDirection='column'
      backgroundColor={'brand.backgroundOrange.400'}
    >
      <Header />
      <Box as='main'>{children}</Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
