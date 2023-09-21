import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Web3Button, Web3NetworkSwitch, useWeb3Modal } from '@web3modal/react';
import { useAccount } from 'wagmi';
import {
  Box,
  Button,
  Flex,
  Text,
  Spacer,
  Image,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  useDisclosure,
  useBreakpointValue,
  HStack,
} from '@chakra-ui/react';
import Link from 'next/link';

import { useScore } from '@/hooks';
import { formatNumber } from '@/utils/strings';
import { useScoreContext } from '@/contexts/scoreContext';

const StyledWeb3NetworkSwitch = styled.div`
  --w3m-accent-color: rgba(0, 0, 0, 0.5); !important;
`;

const Header: React.FC = () => {
  const [currPos, setCurrPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDrawerMenu = useBreakpointValue({
    base: true,
    lg: false,
  });
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { score } = useScoreContext(address);
  console.log('score', score);
  useEffect(() => {
    const handleScroll = () => {
      const newPos = window.pageYOffset;
      const isVisible = currPos > newPos;
      setCurrPos(newPos);
      if (newPos < 30) {
        setVisible(true);
        return;
      }
      setVisible(isVisible);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currPos]);

  const Web3Content = () => {
    return (
      <>
        {isConnected && !isMobile && (
          <StyledWeb3NetworkSwitch>
            <Web3NetworkSwitch />
          </StyledWeb3NetworkSwitch>
        )}
        {isConnected ? (
          <Web3Button />
        ) : (
          <Button size={['md', 'lg']} onClick={() => open()} variant="variant1">
            Connect Wallet
          </Button>
        )}
        {score && !isMobile && (
          <Text variant={'bold'} textTransform={'uppercase'}>
            Score: {formatNumber(score)}
          </Text>
        )}
      </>
    );
  };

  return (
    <Box
      as="header"
      color="white"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="10"
      paddingLeft={{
        base: '0px',
        sm: '24px',
        md: '24px',
        lg: '38px',
        xl: '38px',
      }}
      paddingRight={{
        base: '0px',
        sm: '20px',
        md: '24px',
        lg: '38px',
        xl: '0',
      }}
      marginX={['auto']}
      maxWidth={{ base: '100%', xl: '1386px' }}
      width="100%"
      transition="all 0.3s ease-in-out"
      transform={visible ? 'translateY(0)' : 'translateY(-100%)'}
    >
      <Flex p="4" gap={5} alignItems="center" height="100px">
        <Link href="/">
          <Image src={'/icons/leaf.svg'} alt="Logo" />
        </Link>
        <Link href="/">
          <Image
            src={'/icons/logo-header.svg'}
            alt="Logo"
            display={{ base: 'none', sm: 'block' }}
          />
        </Link>
        {!isDrawerMenu && (
          <Flex ml="70px" gap={{ base: 4, sm: '56px', md: '56px', xl: '56px' }}>
            <Link href="/profile">
              <Text variant={'boldLink'} textTransform={'uppercase'}>
                My Profile
              </Text>
            </Link>
            <Link href="https://docs.regenscore.io/" target="_blank">
              <Text variant={'boldLink'} textTransform={'uppercase'}>
                Docs
              </Text>
            </Link>
          </Flex>
        )}

        <Spacer />
        <Flex gap={{ base: 4, xl: 4 }} alignItems="center">
          <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>
                <DrawerBody>
                  <VStack align="start" spacing={4}>
                    <Link href="/profile">
                      <Text variant={'boldLink'}>My Profile</Text>
                    </Link>
                    <Link href="https://docs.regenscore.io/">
                      <Text variant={'boldLink'}>Docs</Text>
                    </Link>
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
          <Web3Content />
          {isDrawerMenu && (
            <a onClick={onOpen}>
              <Image src="/icons/drawer.svg" alt="Drawer" />
            </a>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
