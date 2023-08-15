import { Box, Container } from '@chakra-ui/react';
import Hero from './Hero';

export default function Landing() {
  return (
    <Box bg={'brand.deepGreen.400'} pt='200'>
      <Container>
        <Hero />
      </Container>
    </Box>
  );
}
