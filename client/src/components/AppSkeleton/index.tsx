import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsSearch } from 'react-icons/bs';
import Spinner from 'components/Spinner';
import {
  StyledHeader,
  MobileIconWrapper,
  SiteTitleWrapper,
  SiteTitle,
  Main,
} from './styled';

const AppSkeleton = (): JSX.Element => {
  return (
    <>
      <StyledHeader>
        <MobileIconWrapper>
          <GiHamburgerMenu size={20} />
        </MobileIconWrapper>
        <SiteTitleWrapper>
          <SiteTitle> Your House </SiteTitle>
        </SiteTitleWrapper>
        <MobileIconWrapper>
          <BsSearch size={20} />
        </MobileIconWrapper>
      </StyledHeader>
      <Main>
        <Spinner color="var(--color-primary)" size={3} />
        <p>Iniciando Your House</p>
      </Main>
    </>
  );
};

export default AppSkeleton;
