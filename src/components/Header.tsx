import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Web3Button, Web3NetworkSwitch, useWeb3Modal } from '@web3modal/react';
import { useAccount } from 'wagmi';
import { Box, Button, Flex, Text, Spacer, Image } from '@chakra-ui/react';
import Link from 'next/link';

const StyledWeb3NetworkSwitch = styled(Web3NetworkSwitch)`
  --w3m-accent-color: rgba(0, 0, 0, 0.5);
`;

const Header: React.FC = () => {
  const [currPos, setCurrPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();

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

        <Flex ml='4' gap={54}>
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
        <Spacer />
        <Flex gap='4'>
          {isConnected && <StyledWeb3NetworkSwitch />}
          {isConnected ? (
            <Web3Button />
          ) : (
            <Button onClick={() => open()} variant='variant1'>
              Connect Wallet
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
