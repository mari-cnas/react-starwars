import { memo } from 'react';

import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from '../../assets/space-motors-logo.png';
import { LogoDiv, MainBanner } from './styled';

interface IBaseComponentProps {
  children?: React.ReactNode;
}

const Header: React.FC<IBaseComponentProps> = () => {
  return (
    <>
      <LogoDiv>
        <Container>
          <Link to="/">
            <img src={logo} alt="logo" className="my-3 img-fluid" />
          </Link>
        </Container>
      </LogoDiv>
      <MainBanner />
    </>
  );
};

export default memo(Header);
