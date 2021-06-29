import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'contexts';
import Button from 'components/Button';
import { Avatar, Nav, NavList, UserInfo } from './styled';

const DesktopMenu = (): JSX.Element => {
  const { user, isLoading } = useAuth();

  const userAvatar = user?.photoUrl ? (
    <img src={user.photoUrl} alt={user.name} />
  ) : (
    <Avatar>{user?.name.charAt(0)}</Avatar>
  );

  const guestRoutes = () => (
    <Nav>
      <NavList>
        <Link to="/login" className="link">
          Iniciar Sesión
        </Link>
      </NavList>
      <NavList>
        <Link to="/sign-up" className="link">
          Registrarse
        </Link>
      </NavList>
      <NavList>
        <Button
          to="/listing/create"
          variant="outline"
          type="button"
          title="Añadir tu propiedad"
          style={{ width: '100%' }}
        />
      </NavList>
    </Nav>
  );

  const authRoutes = () => (
    <Nav>
      <NavList>
        <Link to="/my-properties" className="link">
          Mis Propiedades
        </Link>
      </NavList>
      <NavList>
        <Link to="/my-favorites" className="link">
          Mis Favoritas
        </Link>
      </NavList>
      <NavList>
        <Button
          variant="outline"
          type="button"
          title="Añadir Propiedad"
          style={{ width: '100%' }}
          to="/listing/create"
        />
      </NavList>
      <NavList>
        <Link to="/profile">
          <UserInfo>{userAvatar}</UserInfo>
        </Link>
      </NavList>
    </Nav>
  );

  if (isLoading) {
    return <div />;
  }

  return <>{user ? authRoutes() : guestRoutes()}</>;
};

export default DesktopMenu;
