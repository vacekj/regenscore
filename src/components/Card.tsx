import { createSvg } from '@/createSvg';
import { useScore } from '@/hooks';
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Text,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Address, getAddress } from 'viem';

export default function Card() {
  const toast = useToast();
  const [isDesktop] = useMediaQuery('(min-width: 960px)');
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [inputAddress, setInputAddress] = useState('');

  const { address, isConnected } = useAccount();

  const effectiveAddress = inputAddress || address || '';

  const { score, debug } = useScore(effectiveAddress as Address);

  const [svg, setSvg] = useState<string>();
  useEffect(() => {
    createSvg(
      effectiveAddress ? score || 0 : '????????',
      effectiveAddress ?? '0x1234...abcd'
    ).then((res) => {
      try {
        return setSvg(res);
      } catch (error) {
        console.log({ error });
      }
    });
  }, [score, effectiveAddress]);

  return (
    <Center py={12} flexDirection={'column'}>
      <Heading mb={12}>{Number(score) > 0 && `${score} RS`}</Heading>
      <Box
        as={motion.div}
        role={'group'}
        bg={'gray.500'}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        mb={16}
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

      <Text my={2}>or</Text>
      <Input
        value={inputAddress}
        onChange={(e) => setInputAddress(getAddress(e.target.value))} // Update inputAddress state on change
        placeholder='Enter Ethereum Address'
        mt={0}
      />
      {/* {!claimed && isConnected && (
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
      )} */}
      {/* {claimed && isDesktop && isConnected && address && (
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
      )} */}
      <Button
        mt={6}
        onClick={() => setShowDebug(!showDebug)} // Toggle debug content
      >
        {showDebug ? 'Hide Debug Info' : 'Show Debug Info'}
      </Button>
      {showDebug && debug && (
        <Box
          mt={6}
          p={4}
          rounded={'lg'}
          bg={'gray.100'}
          boxShadow={'md'}
          bottom={0}
          right={0}
          height={'300px'}
          overflowY={'auto'}
        >
          <Heading size='md' mb={2}>
            Debug Information:
          </Heading>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            <code>
              {Object.keys(debug).map((key) => (
                <Box key={key} mb={2}>
                  <Text fontWeight='bold'>{key}:</Text>
                  <Text as='span' color={'gray.600'}>
                    {JSON.stringify(debug[key], null, 2)}
                  </Text>
                </Box>
              ))}
            </code>
          </pre>
        </Box>
      )}
    </Center>
  );
}
