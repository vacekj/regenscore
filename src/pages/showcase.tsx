import { Check } from "@/components/Check";
import { Button, Container, Heading } from "@chakra-ui/react";
import { ChakraBox } from "@/components/Check";

export default function Showcase() {
  return (
    <Container>
      <Button variant="brand">connect wallet</Button>
      <Button variant="variant1">connect wallet</Button>
      <Button variant="variant2">connect wallet</Button>
      <Heading as="h1" variant="h1">Heading H1</Heading>
      <Heading as="h2" variant="h2">Heading H2</Heading>
      <Heading as="h3" variant="h3">Heading H3</Heading>
      <p>
        Here is our <a className="my-link" href="https://example.com">link!</a> 
      </p>
      <ChakraBox></ChakraBox>
    </Container>
  );
}
