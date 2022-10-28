import { memo } from 'react';

import { Container } from 'react-bootstrap';

import logo from '../../assets/space-motors-logo.png';
import { LogoDiv, MainBanner } from './styled';

interface IBaseComponentProps {
  children?: React.ReactNode;
}

const Header: React.FC<IBaseComponentProps> = ({ children }) => {
  return (
    <>
      <LogoDiv>
        <Container>
          <img src={logo} alt="logo" className="my-3" />
        </Container>
      </LogoDiv>
      <MainBanner />
    </>
  );
};

export default memo(Header);
