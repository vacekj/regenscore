import { FC, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Scrollbars from 'react-custom-scrollbars';
import { Flex, Box } from '@chakra-ui/react';

import { ModalHeader, ModalHeaderTitlePosition } from './ModalHeader';
import useDetectDevice from '@/hooks/useDetectDevice';

interface IModal {
  fullScreen?: boolean;
  closeModal: () => void;
  callback?: () => void;
  isAnimating: boolean;
  hiddenClose?: boolean;
  hiddenHeader?: boolean;
  headerTitlePosition?: ModalHeaderTitlePosition;
  headerTitle?: string;
  headerIcon?: ReactNode;
  backButtonCallback?: () => void;
  headerColor?: string;
  children: ReactNode;
  doNotCloseOnClickOutside?: boolean;
  className?: string;
}

export const Modal: FC<IModal> = ({
  hiddenClose = false,
  hiddenHeader = false,
  closeModal,
  isAnimating,
  children,
  headerTitlePosition,
  headerTitle,
  headerIcon,
  backButtonCallback,
  fullScreen = false,
  headerColor,
  doNotCloseOnClickOutside,
  className,
}) => {
  const el = useRef(document.createElement('div'));
  const { isMobile } = useDetectDevice();

  useEffect(() => {
    const current = el.current;
    const modalRoot = document.querySelector('body') as HTMLElement;
    modalRoot.style.overflowY = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (modalRoot) {
      modalRoot.addEventListener('keydown', handleKeyDown);
      modalRoot.appendChild(current);
    }
    return () => {
      modalRoot.removeEventListener('keydown', handleKeyDown);
      modalRoot.style.overflowY = 'auto';
      modalRoot.style.overflowY = 'overlay';
      modalRoot!.removeChild(current);
    };
  }, [closeModal]);

  const ScrollBarsNotFullScreenProps = {
    autoHeight: true,
    autoHeightMin: 'calc(20Vh - 60px)',
    autoHeightMax: 'calc(80Vh - 60px)',
  };

  return createPortal(
    <Flex
      bg="rgba(0, 0, 0, 0.1)"
      sx={{
        backdropFilter: 'blur(3px)',
      }}
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      justifyContent="center"
      alignItems="center"
      m="auto"
      zIndex="modal"
      opacity={isAnimating ? 0 : 1}
      transition="opacity 0.3s ease"
      onClick={(e) => e.stopPropagation()}
    >
      {!doNotCloseOnClickOutside && (
        <Box
          position="absolute"
          width="100%"
          height="100%"
          onClick={closeModal}
        />
      )}
      <Box
        bgColor="white"
        color="black"
        position="relative"
        zIndex={10}
        textAlign="center"
        overflow="hidden"
        height="100%"
        width="100%"
        borderRadius={{ base: 'none', md: fullScreen ? 'none' : '8px' }}
        boxShadow={{
          base: 'none',
          md: fullScreen ? 'none' : '0 3px 20px #21203c',
        }}
        maxH={{ base: 'none', md: fullScreen ? 'none' : '90vh' }}
        w={{ base: '100%', md: fullScreen ? '100%' : 'auto' }}
        h={{ base: '100%', md: fullScreen ? '100%' : 'auto' }}
      >
        <ModalHeader
          hiddenClose={hiddenClose}
          hiddenHeader={hiddenHeader}
          title={headerTitle}
          icon={headerIcon}
          backButtonCallback={backButtonCallback}
          closeModal={closeModal}
          position={headerTitlePosition}
          color={headerColor}
        />
        <Flex
          as={Scrollbars}
          direction="column"
          align="center"
          justify="center"
          renderTrackHorizontal={(props: any) => (
            <div {...props} style={{ display: 'none' }} />
          )}
          {...(fullScreen || isMobile ? {} : ScrollBarsNotFullScreenProps)}
        >
          {children}
        </Flex>
      </Box>
    </Flex>,
    el.current,
  );
};
