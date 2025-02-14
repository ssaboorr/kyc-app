import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Grid,
  Flex,
  Image,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function ImageModal({ image }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button bgColor="gray.800" colorScheme="teal" onClick={() => onOpen()}>
        View Image
      </Button>
      <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Image src={image} alt={image} minH="250px" objcetFit="cover" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImageModal;
