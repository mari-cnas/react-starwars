import { memo } from 'react';

import { Container } from 'react-bootstrap';

import logo from '../../assets/space-motors-logo.png';
import { LogoDiv, Name, Site } from './styled';

interface IBaseComponentProps {
  children?: React.ReactNode;
}

const Footer: React.FC<IBaseComponentProps> = () => {
  return (
    <LogoDiv>
      <Container className="d-flex flex-column ">
        <div className="d-flex align-self-center">
          {' '}
          <img src={logo} alt="logo" className="my-4 img-fluid" />
        </div>
        <div className="d-flex justify-content-center mb-2">
          <Site>site por </Site> <Name> Mariana CN</Name>
        </div>
      </Container>
    </LogoDiv>
  );
};

export default memo(Footer);
