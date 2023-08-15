import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Link,
  Stack,
  Switch,
  Text,
  VStack,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
const Card = dynamic(() => import('@/components/Card'), { ssr: false });
import { Check } from '@/components/Check';
import { server } from '@/pages/api/claim';
import { GetServerSideProps } from 'next';
import Sound from 'react-sound';

export default function Demo(props: {
  leaderboard: {
    user_id: string;
    score: number | '????????';
  }[];
}) {
  const [badgerMode, setBadgerMode] = useState(false);

  return (
    <Container
      position={'relative'}
      backgroundImage={badgerMode ? `${server}/badgers.gif` : ''}
    >
      <Sound
        playFromPosition={3000}
        url='/badgers.mp3'
        playStatus={badgerMode ? 'PLAYING' : 'STOPPED'}
      />
      {/* <HStack p={4} justifyContent={'space-between'}>
          <Link href={'#leaderboard'}>Leaderboard</Link>
          <FormControl display='flex' alignItems='center' width={'initial'}>
            <FormLabel htmlFor='badger' mb='0'>
              🦡 Badger mode
            </FormLabel>
            <Switch
              isChecked={badgerMode}
              onChange={(e) => setBadgerMode(e.target.checked)}
              id='badger'
            />
          </FormControl>
        </HStack> */}
      <VStack
        alignItems={'center'}
        maxW={'7xl'}
        spacing={{ base: 10, lg: 16 }}
        py={{ base: 10, sm: 20, lg: 36 }}
        mt={16}
      >
        <Stack textAlign={'center'} spacing={{ base: 4 }}>
          <Heading
            mt={-20}
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
          >
            Welcome Regen 🌱.
          </Heading>
          <Text textAlign={'center'}>
            We are celebrating all regens who contribute to the greater good.
            Discover your score below.
          </Text>
        </Stack>
        <Card />
        {/* <Text fontSize={'20px'} px={16}>
            We are celebrating all the regens by rewarding them with an NFT to
            showcase their regen score. Set it as your PFP or use it to gain
            access to regen-only communities and events. Oh, and the NFTs are
            soul-bound.
          </Text>
          <Text fontSize={'20px'} px={16}>
            We calculate your regen score by looking at your contributions towards
            impact projects like Gitcoin, Giveth, World of Women and more. The
            more you donate and the more diverse your contributions, the better
            your regen score.
          </Text> */}
      </VStack>
      {/* <Heading
          textAlign={"center"}
          lineHeight={1.1}
          p={2}
          mb={2}
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
        >
          Leaderboard
        </Heading>
        <VStack id={"leaderboard"} w={"100%"}>
          {props.leaderboard.slice(0, 10).sort((a, b) => b.score - a.score).map((l, index) => {
            return (
              <HStack key={index} w={"100%"} justifyContent={"space-between"}>
                <Text>
                  {index + 1}. &nbsp;<b>{l.user_id}</b>
                </Text>
                <Text>{l.score}</Text>
              </HStack>
            );
          })}
        </VStack> */}
      <VStack></VStack>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const batch = await client.getBatch("score", {
  //   limit: 100,
  // });

  // const data = batch.users.map(d => {
  //   return { user_id: d.user_id, score: parseInt(d.data[0]?.text() ?? "0") };
  // }).filter(r => r.score > 0);

  return {
    props: {
      // leaderboard: data,
      leaderboard: [],
    },
  };
};
