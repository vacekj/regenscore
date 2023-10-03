import { Button, Flex, useToast, useMediaQuery, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

const isSSRMode = typeof window === 'undefined';

interface ICopyLink {
  url: string;
}

const CopyLink: FC<ICopyLink> = () => {
  const [url, setUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const toast = useToast();
  const [isTablet] = useMediaQuery('(min-width: 48em)'); // Assuming 48em as a breakpoint for tablet
  const router = useRouter();

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

  useEffect(() => {
    const newUrl = `${window.location.origin}${router.pathname}`;
    setUrl(newUrl);
  }, [router.pathname]);

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
    >
      <Text flex="1" color="grey" my={!isTablet ? '16px' : 0}>
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
