import { Check } from "@/components/Check";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";

import React from "react";

const TrackedActivity = () => {
  return (
    <Flex flexDir="column" align="flex-center" justify="center" margin="0 54px">
      <Heading
        as="h1"
        variant="h2"
        mb={6}
        textAlign="left"
        color="brand.primaryOrange.200"
      >
        Tracked Activity
      </Heading>
      <Text mb={6} fontSize="20" fontFamily="Inter-Regular">
        Check out the details of your activities
      </Text>

      <TableContainer
        borderRadius="8"
        bg="brand.beige.400"
        shadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      >
        <Table size="sm">
          <Thead>
            <Tr>
              <Th
                fontFamily="Inter-Bold"
                fontWeight="bold"
                fontSize="24px"
                color="brand.deepGreen.400"
              >
                Taxanomy
              </Th>
              <Th
                fontFamily="Inter-Bold"
                fontWeight="bold"
                fontSize="24px"
                color="brand.deepGreen.400"
              >
                Network
              </Th>
              <Th
                fontFamily="Inter-Bold"
                fontWeight="bold"
                fontSize="24px"
                color="brand.deepGreen.400"
              >
                Behavior
              </Th>
              <Th
                fontFamily="Inter-Bold"
                fontWeight="bold"
                fontSize="24px"
                color="brand.deepGreen.400"
              >
                Value
              </Th>
              <Th
                fontFamily="Inter-Bold"
                fontWeight="bold"
                fontSize="24px"
                color="brand.deepGreen.400"
                display="flex"
                alignItems="center"
              >
                Points Earned
                <Check status={"WARNING2"} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td>inches</Td>
              <Td isNumeric>25.4</Td>
              <Td>millimetres (mm)</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td>inches</Td>
              <Td isNumeric>25.4</Td>
              <Td>millimetres (mm)</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td>inches</Td>
              <Td isNumeric>25.4</Td>
              <Td>millimetres (mm)</Td>
            </Tr>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td>inches</Td>
              <Td isNumeric>25.4</Td>
              <Td>millimetres (mm)</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td>inches</Td>
              <Td isNumeric>25.4</Td>
              <Td>millimetres (mm)</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td>inches</Td>
              <Td isNumeric>25.4</Td>
              <Td>millimetres (mm)</Td>
            </Tr>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td>inches</Td>
              <Td isNumeric>25.4</Td>
              <Td>millimetres (mm)</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td>inches</Td>
              <Td isNumeric>25.4</Td>
              <Td>millimetres (mm)</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td>inches</Td>
              <Td isNumeric>25.4</Td>
              <Td>millimetres (mm)</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default TrackedActivity;
