import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Meta from 'components/Meta';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import { FaBed, FaBath } from 'react-icons/fa';
import { IoMdSquare } from 'react-icons/io';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FiShare } from 'react-icons/fi';
import { MdSupervisorAccount } from 'react-icons/md';
import useFavorite from 'hooks/useFavorite';
import { useToast } from 'contexts';
import { ContactListing } from 'types';
import { EMAIL_AGENT_LISTING } from 'graphql/mutations';
import { LISTING } from 'graphql/queries';
import ListingContact from './ListingContact';
import ListingShareModal from './ListingShareModal';
import ListingContactModal from './ListingContactModal';
import ListingSkeleton from './ListingSkeleton';
import {
  CoverImg,
  IconWrapper,
  Img,
  ActionWrapper,
  Title,
  Wrapper,
  Price,
  PriceWrapper,
  Heading,
  Description,
  Location,
  Details,
  Container,
  InfoContainer,
  BottomAction,
  ButtonWrapper,
} from './styled';
import ListingCountInfo from './ListingCountInfo';

interface Params {
  id: string;
}

const COLOR_RED = 'var(--color-red)';

const Listing = (): JSX.Element => {
  const { id } = useParams<Params>();
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const [isOpenContactModal, setIsOpenContactModal] = useState(false);
  const {
    loading: loadingListing,
    error: errorListing,
    data,
  } = useQuery(LISTING, { variables: { id } });
  const { setToast } = useToast();

  const listing = data ? data.listing : null;
  const { handleToggle, checkIsFavorite } = useFavorite(listing);

  const [emailAgentListing, { loading: submitting }] = useMutation(
    EMAIL_AGENT_LISTING,
    {
      onError() {
        setToast(
          'error',
          'No se pudo enviar su mensaje. Por favor, inténtelo de nuevo más tarde'
        );
      },
      onCompleted() {
        setToast('success', 'Correo electrónico enviado con éxito al agente');
      },
    }
  );

  const handleEmailAgent = (contactListing: ContactListing) => {
    emailAgentListing({ variables: { input: contactListing } });
  };

  const handleCallAgent = () => {
    const telNo = `tel:${listing.host.phone}`;
    window.open(telNo);
  };

  if (loadingListing)
    return (
      <Container>
        <ListingSkeleton />
      </Container>
    );

  if (errorListing)
    return <ErrorMessage message="Algo salió mal. Inténtalo de nuevo." />;

  return (
    <Container>
      <ListingShareModal
        isVisible={isOpenShareModal}
        closeModal={() => setIsOpenShareModal(false)}
      />
      <ListingContactModal
        id={listing.id}
        closeModal={() => setIsOpenContactModal(false)}
        isVisible={isOpenContactModal}
        emailAgent={handleEmailAgent}
        submitting={submitting}
      />
      <Meta
        title={listing.title}
        description={listing.description}
        image={listing.imageUrl}
      />
      <InfoContainer>
        <CoverImg>
          <Img src={listing.imageUrl} alt={listing.title} />
          <ActionWrapper>
            <IconWrapper onClick={handleToggle}>
              {checkIsFavorite() ? (
                <AiFillHeart fill={COLOR_RED} />
              ) : (
                <AiOutlineHeart />
              )}
            </IconWrapper>
            <IconWrapper onClick={() => setIsOpenShareModal(true)}>
              <FiShare />
            </IconWrapper>
          </ActionWrapper>
        </CoverImg>
        <Wrapper>
          <Title>{listing.title}</Title>
          <Location>{listing.address}</Location>
          <Details>
            <ListingCountInfo
              count={listing.numOfBedrooms}
              name="Habitaciones"
              icon={<FaBed />}
            />
            <ListingCountInfo
              count={listing.numOfBaths}
              name="Baños"
              icon={<FaBath />}
            />
            <ListingCountInfo
              count={listing.propertySize}
              name="Metros cuadrados"
              icon={<IoMdSquare />}
            />
            <ListingCountInfo
              count={listing.propertySize}
              name="personas"
              icon={<MdSupervisorAccount />}
            />
          </Details>
          <PriceWrapper>
            <Price>${listing.price}</Price>
          </PriceWrapper>
          <Heading> Descripción </Heading>
          <Description>{listing.description}</Description>
          <ListingContact host={listing.host} />
        </Wrapper>
      </InfoContainer>
      <BottomAction>
        <ButtonWrapper>
          <Button
            title="Llamar agente"
            type="button"
            variant="primary"
            onClick={handleCallAgent}
          />
          <Button
            title="Mensaje al agente"
            type="button"
            variant="outline"
            onClick={() => setIsOpenContactModal(true)}
          />
        </ButtonWrapper>
      </BottomAction>
    </Container>
  );
};

export default Listing;
