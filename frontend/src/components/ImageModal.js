import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Image,
} from "@chakra-ui/react";

function ImageModal({ image }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("Image path ==> , ", image);
  return (
    <>
      <Button bgColor="gray.800" colorScheme="teal" onClick={() => onOpen()}>
        View Image
      </Button>
      <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image src={image} alt={image} minH="250px" objcetFit="cover" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImageModal;
