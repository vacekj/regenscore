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
} from '@chakra-ui/react';
import Link from 'next/link';

import { useScore } from '@/hooks';

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
  const { score } = useScore(address);

  useEffect(() => {
    const handleScroll = () => {
      const newPos = window.pageYOffset;
      const isVisible = currPos > newPos;
      setCurrPos(newPos);
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
        {isConnected && (
          <StyledWeb3NetworkSwitch>
            <Web3NetworkSwitch />
          </StyledWeb3NetworkSwitch>
        )}
        {isConnected ? (
          <Web3Button />
        ) : (
          <Button onClick={() => open()} variant='variant1'>
            Connect Wallet
          </Button>
        )}
        {score && (
          <Text variant={'bold'} textTransform={'uppercase'}>
            Score: {score}
          </Text>
        )}
      </>
    );
  };

  return (
    <Box
      as='header'
      bg='brand.deepGreen.400'
      color='white'
      boxShadow='sm'
      position='fixed'
      top='0'
      left='0'
      right='0'
      zIndex='10'
      py='8'
      transition='all 0.3s ease-in-out'
      transform={visible ? 'translateY(0)' : 'translateY(-100%)'}
    >
      <Flex p='4' gap={54} alignItems='center'>
        <Link href='/'>
          <Image src={'/images/logo-h.svg'} alt='Logo' minW='223' />
        </Link>
        {!isDrawerMenu && (
          <Flex ml='4' gap={{ base: 4, md: 4, xl: 54 }}>
            <Link href='/'>
              <Text variant={'boldLink'} textTransform={'uppercase'}>
                Opportunities
              </Text>
            </Link>
            <Link href='/leaderboard'>
              <Text variant={'boldLink'} textTransform={'uppercase'}>
                Leaderboard
              </Text>
            </Link>
            <Link href='/docs'>
              <Text variant={'boldLink'} textTransform={'uppercase'}>
                Docs
              </Text>
            </Link>
          </Flex>
        )}

        <Spacer />
        <Flex gap={{ base: 4, xl: 4 }} alignItems='center'>
          <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>RegenScore</DrawerHeader>
                <DrawerBody>
                  <VStack align='start' spacing={4}>
                    <Web3Content />

                    <Link href='/'>
                      <Text variant={'boldLink'}>Opportunities</Text>
                    </Link>
                    <Link href='/leaderboard'>
                      <Text variant={'boldLink'}>Leaderboard</Text>
                    </Link>
                    <Link href='/docs'>
                      <Text variant={'boldLink'}>Docs</Text>
                    </Link>
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
          {!isMobile && <Web3Content />}
          {isDrawerMenu && (
            <a onClick={onOpen}>
              <Image src='/icons/drawer.svg' alt='Drawer' />
            </a>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
