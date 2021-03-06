import React from 'react';
import { MdContentCopy } from 'react-icons/md';
import styled from 'styled-components';
import Modal from 'components/Modal';
import { FacebookIcon, TwitterIcon } from 'components/Icons';
import share from 'utils/socialShare';
import copyToClipBoard from 'utils/copyToClipboard';
import { useToast } from 'contexts';

const SocialButton = styled.button`
  background-color: #fff;
  border: 1px solid var(--color-dark-gray);
  border-radius: 6px;
  width: 6rem;
  height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

interface Props {
  closeModal(): void;
  isVisible: boolean;
}

const ListingShareModal: React.FC<Props> = ({
  closeModal,
  isVisible,
}): JSX.Element => {
  const { setToast } = useToast();

  const handleCopyClipBoard = () => {
    copyToClipBoard();
    setToast('success', 'Copiado');
  };

  return (
    <Modal
      title="Comparte esta propiedad"
      closeModal={closeModal}
      isVisible={isVisible}
    >
      <Container>
        <SocialButton type="button" onClick={() => share('fb')}>
          <FacebookIcon />
        </SocialButton>
        <SocialButton type="button" onClick={() => share('twitter')}>
          <TwitterIcon />
        </SocialButton>
        <SocialButton onClick={handleCopyClipBoard}>
          <MdContentCopy />
        </SocialButton>
      </Container>
    </Modal>
  );
};

export default ListingShareModal;
