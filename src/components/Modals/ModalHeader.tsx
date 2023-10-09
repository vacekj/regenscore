import React, { ReactNode } from 'react';
import { Flex, Box, IconButton, CloseButton } from '@chakra-ui/react';

export type ModalHeaderTitlePosition = 'center' | 'left';

export interface IModalHeader {
  hiddenClose?: boolean;
  hiddenHeader?: boolean;
  title?: string;
  icon?: ReactNode | JSX.Element;
  iconClick?: () => void;
  closeModal: () => void;
  position?: ModalHeaderTitlePosition;
  color?: string;
  backButtonCallback?: () => void;
}

export const ModalHeader: React.FC<IModalHeader> = ({
  hiddenClose = false,
  hiddenHeader = false,
  title = '',
  icon,
  backButtonCallback,
  closeModal,
  position = 'center',
  color,
}) => {
  return !hiddenHeader ? (
    <Flex
      justifyContent={position === 'center' ? 'center' : 'flex-start'}
      gap="14px"
      minH={icon || title ? '48px' : '36px'}
      p="24px 24px 8px"
      position="relative"
      alignItems="center"
      color={color || 'inherit'}
    >
      {!!backButtonCallback ? (
        <IconButton
          aria-label="Back"
          icon={<p>back</p>}
          onClick={backButtonCallback}
          height="32px"
          cursor="pointer"
        />
      ) : (
        icon && <Box height="32px">{icon}</Box>
      )}
      <Box as="h6" mb={2}>
        {title}
      </Box>
      {!hiddenClose && (
        <CloseButton position="absolute" right="24px" onClick={closeModal} />
      )}
      {!hiddenClose && <Box width="24px" height="24px" />}
    </Flex>
  ) : !hiddenClose ? (
    <CloseButton onClick={closeModal} />
  ) : null;
};
