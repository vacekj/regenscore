import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex
      minHeight='200vh'
      width='100%'
      minWidth={'100vw'}
      flexDirection='column'
      backgroundColor={'brand.backgroundOrange.400'}
    >
      <Header />
      <Box as='main'>{children}</Box>
    </Flex>
  );
};

export default Layout;
