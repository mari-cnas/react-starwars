import { memo } from 'react';

import { Container } from 'react-bootstrap';

import logo from '../../assets/space-motors-logo.png';
import { FooterBg } from './styled';

interface IBaseComponentProps {
  children?: React.ReactNode;
}

const Footer: React.FC<IBaseComponentProps> = () => {
  return (
    <FooterBg>
      <Container className="d-flex flex-column ">
        <div className="d-flex align-self-center">
          {' '}
          <img src={logo} alt="logo" className="my-4 img-fluid" />
        </div>
        <div className="d-flex justify-content-center mb-2">
          <h6 style={{ color: 'grey' }}>site por &nbsp;</h6>
          <a
            href="https://www.linkedin.com/in/marianacnascimento/"
            target="_blank"
            rel="noreferrer"
          >
            <h6 style={{ color: 'white' }}>Mariana CN</h6>
          </a>
        </div>
      </Container>
    </FooterBg>
  );
};

export default memo(Footer);
