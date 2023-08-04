import { createSvg } from '@/createSvg';
import { useScore } from '@/hooks';
import {
  Box,
  Button,
  Center,
  Link,
  useColorModeValue,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function Card() {
  const toast = useToast();
  const [isDesktop] = useMediaQuery('(min-width: 960px)');
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(false);

  const { address, isConnected } = useAccount();

  const { score, debug } = useScore(address!);
  console.log({ score, debug });
  const [svg, setSvg] = useState<string>();
  useEffect(() => {
    createSvg(address ? score : '????????', address ?? '0x1234...abcd').then(
      (res) => setSvg(res)
    );
  }, [score, address!]);

  return (
    <Center py={12} flexDirection={'column'}>
      <Box
        as={motion.div}
        role={'group'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        mb={24}
        animate={{ scale: 1.2 }}
        whileHover={{
          scale: 1.3,
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 1.1, transition: { duration: 0.3 } }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: svg!,
          }}
        />
      </Box>
      {(!isConnected || claimed) && (
        <ConnectButton
          label={'Reveal your RegenScore'}
          accountStatus={'full'}
          chainStatus={'full'}
        />
      )}
      {!claimed && isConnected && (
        <Button
          type={'submit'}
          disabled={claimed}
          isLoading={loading}
          size={'lg'}
          px={8}
          mt={12}
          border={'solid 3px linear(to-r, red.400,pink.400)'}
          colorScheme={'pink'}
          bgGradient='linear(to-r, red.400,pink.400)'
          textColor={'white'}
          _hover={{
            bgGradient: 'linear(to-r, red.500,pink.500)',
          }}
          onClick={() => {
            if (!address) {
              return;
            }
            setLoading(true);
            fetch('/api/claim', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                address,
              }),
            }).then(async (r) => {
              const response = await r.json();
              setClaimed(true);
              toast({
                title: 'Claimed RegenScore Card',
                description: (
                  <Link
                    href={`https://mumbai.polygonscan.com/tx/${response.hash}`}
                  >
                    {response.hash}
                  </Link>
                ),
                status: 'success',
              });
              setLoading(false);
            });
          }}
        >
          Claim your RegenScore Card
        </Button>
      )}
      {claimed && isDesktop && isConnected && address && (
        <Button
          mt={12}
          colorScheme={'green'}
          variant={'link'}
          onClick={() => {
            fetch('/api/publish', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                address: address,
              }),
            })
              .then((r) => {
                toast({
                  title: 'Score posted',
                  status: 'success',
                });
                window.location.reload();
              })
              .catch((e) =>
                toast({
                  title: 'There was an error posting your score',
                  description: e,
                  status: 'error',
                })
              );
          }}
        >
          Publish your score on the leaderboard
        </Button>
      )}
    </Center>
  );
}
