import styled from 'styled-components';

import coverLg from '../../assets/space-motors-picture-lg.png';
import coverSm from '../../assets/space-motors-picture-sm.png';

export const MainBanner = styled.div`
  @media (max-width: 576px) {
    background-image: url(${coverSm});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 150px;
    color: black;
  }
  @media (min-width: 577px) {
    background-image: url(${coverLg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 300px;
    color: black;
  }
`;

export const LogoDiv = styled.div`
  background-color: black;
`;
