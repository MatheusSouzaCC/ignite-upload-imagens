import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="900px" maxHeight="600px">
            <Image src={imgUrl} maxWidth="900px" maxHeight="600px" />
 
          <ModalFooter bgColor="pGray.800" display="flex" justifyContent="flex-start" >
            <Link href={imgUrl} target="_blank">Abrir original</Link>
          </ModalFooter>
        </ModalContent>
    </Modal>
  );
}
