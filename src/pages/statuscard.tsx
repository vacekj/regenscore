import { Check } from '@/components/Check';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const MyCard = () => {
  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      <Card
        width={['90%', '476px']}
        minWidth="240px"
        height="677px"
        borderRadius="12px"
        paddingLeft="4px"
        paddingRight="4px"
        boxShadow="0px 0px 24px rgba(255, 255, 255, 1)"
        margin="0 auto"
      >
        <CardHeader padding="0px" marginLeft="24px" marginRight="24px">
          <Box>
            <Heading
              as="h3"
              variant="h3"
              fontWeight="bold"
              fontSize="24px"
              marginTop="56px"
            >
              Searching for Stamps
            </Heading>
          </Box>
          <Divider
            marginTop="24px"
            width="auto"
            color="EBECF2"
            borderWidth="0.5px"
            borderRadius="100px"
            marginBottom="24px"
          />
        </CardHeader>
        <CardBody padding="0px" marginLeft="24px" marginRight="24px">
          <Text marginBottom="24px" fontFamily="Remixa-Regular" fontSize="16">
            Give us a moment while we check your account for existing stamps
          </Text>
          <Divider
            width="auto"
            color="EBECF2"
            borderWidth="0.5px"
            borderRadius="100px"
          />

          <Flex flexDirection="column" marginTop="30px">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '30px',
              }}
            >
              <Check status={'SUCCESS'} />
              <Text marginLeft="16px" fontFamily="Remixa-Regular">
                Scanning...
              </Text>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '30px',
              }}
            >
              <Check status={'SUCCESS'} />
              <Text marginLeft="16px" fontFamily="Remixa-Regular">
                Double checking
              </Text>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '30px',
              }}
            >
              <Check status={'SUCCESS'} />
              <Text marginLeft="16px" fontFamily="Remixa-Regular">
                Validation
              </Text>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '30px',
              }}
            >
              <Check status={'SUCCESS'} />
              <Text marginLeft="16px" fontFamily="Remixa-Regular">
                Brewing coffee
              </Text>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '30px',
              }}
            >
              <Check status={'IN_PROGRESS'} />
              <Text marginLeft="16px" fontFamily="Remixa-Regular">
                Almost there
              </Text>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '30px',
              }}
            >
              <Check status={'NOT_STARTED'} />
              <Text marginLeft="16px" fontFamily="Remixa-Regular">
                Ready for review
              </Text>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '30px',
              }}
            >
              <Check status={'WARNING'} />
              <Text
                marginLeft="16px"
                fontFamily="Remixa-Regular"
                color="#354728"
              >
                Please do not close the window
              </Text>
            </div>
          </Flex>
        </CardBody>
      </Card>
    </div>
  );
};

export default MyCard;
