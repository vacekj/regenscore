import { Button, Flex, useToast, useMediaQuery, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

const isSSRMode = typeof window === 'undefined';

interface ICopyLink {
  url: string;
}

const CopyLink: FC<ICopyLink> = ({ url }) => {
  const [isCopied, setIsCopied] = useState(false);
  const toast = useToast();
  const [isTablet] = useMediaQuery('(min-width: 48em)');

  if (isSSRMode) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    toast({
      title: isCopied ? 'copied' : 'copy link',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setTimeout(() => setIsCopied(false), 5000);
  };

  return (
    <Flex
      border="1px dashed grey"
      borderRadius="8px"
      p="16px"
      w="100%"
      h="100%"
      flexDir={isTablet ? 'row' : 'column'}
      align="center"
      bg="white"
      textAlign={'left'}
    >
      <Text flex="1" color="grey" my={!isTablet ? '16px' : 0} maxW={'252px'}>
        {url}
      </Text>
      <Button
        variant="outline"
        size="sm"
        border="none"
        color={'brand.deepGreen.400'}
        ml={isTablet ? '16px' : 0}
        mt={!isTablet ? '16px' : 0}
        onClick={() => !isCopied && handleCopy()}
      >
        {isCopied ? 'copied' : 'copy link'}
      </Button>
    </Flex>
  );
};

export default CopyLink;
