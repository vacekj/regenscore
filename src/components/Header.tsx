import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Spacer, Button, Image } from '@chakra-ui/react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [currPos, setCurrPos] = useState(0);
  const [visible, setVisible] = useState(true);

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
        <Button variant='variant1'>Connect Wallet</Button>
      </Flex>
    </Box>
  );
};

export default Header;
