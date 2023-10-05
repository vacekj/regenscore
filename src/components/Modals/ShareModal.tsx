import { Box, Flex, Button, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { TwitterShareButton } from 'react-share';
import Image from 'next/image';
import { Modal } from './Modal';
import CopyLink from '@/components/CopyLink';
import { useModalAnimation } from '@/hooks/useModalAnimation';
import { useAccount } from 'wagmi';

interface IShareModal {
  setShowModal: (value: boolean) => void;
}

const ShareModal: FC<IShareModal> = (props) => {
  const { setShowModal } = props;
  const [url, setUrl] = useState('');
  const { address } = useAccount();
  const { isAnimating, closeModal } = useModalAnimation(setShowModal);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newUrl = `${window.location.origin}/share/${address}`;
      setUrl(newUrl);
    }
  }, [address]);

  return (
    <Modal
      closeModal={closeModal}
      isAnimating={isAnimating}
      headerIcon={
        <Image src="/icons/share.svg" width={24} height={24} alt="share icon" />
      }
      headerTitle="Share"
      headerTitlePosition="left"
    >
      <Box p="24px" minW={'476px'}>
        <Text fontWeight="700" mb="24px" color="brand.deepGreen.400">
          Share this on twitter
        </Text>
        <Flex gap="16px" justifyContent="center">
          <Box
            h="45px"
            w="45px"
            border="1px solid #ccc"
            borderRadius="8px"
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <TwitterShareButton
              hashtags={['giveth']}
              title={'Check out my Giveth Score!'}
              url={url}
            >
              <Image
                src="/icons/twitter.svg"
                width={24}
                height={24}
                alt="twitter icon"
              />
            </TwitterShareButton>
          </Box>
        </Flex>
        <Text my="24px" color="black">
          Or copy the link
        </Text>
        <CopyLink url={url} />
        <Button
          variant="outline"
          size="sm"
          textTransform="uppercase"
          fontWeight="700"
          border="none"
          color={'brand.deepGreen.400'}
          mt="24px"
          mx="auto"
          onClick={closeModal}
        >
          Dismiss
        </Button>
      </Box>
    </Modal>
  );
};

export default ShareModal;
