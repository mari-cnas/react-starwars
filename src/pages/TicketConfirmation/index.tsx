import { memo, useEffect } from 'react';

import { Container } from 'react-bootstrap';
import { ImArrowLeft } from 'react-icons/im';
import { Link, useParams } from 'react-router-dom';

import { useVehicles } from 'context/VehiclesContext';

import Footer from 'components/Footer';
import Header from 'components/Header';

import useTitle from 'hooks/useTitle';

import { Wrapper } from 'styles/Globalstyles';

import rocket from '../../assets/r2d2-loading.gif';
import { BtnBg, FormBox, Load, Manufacturer, Name } from './styled';

// const onSubmit: SubmitHandler<FormType> = (data) => console.log(data);
const TicketConfirmation: React.FC = () => {
  const setTitle = useTitle();
  const { isLoading, vehicle, fetchVehicle } = useVehicles();

  const { id } = useParams();

  useEffect(() => {
    setTitle(`Confirmação `); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchVehicle(Number(id)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Wrapper>
      <Header />
      <Container className="mt-3">
        <Link to="/">
          <ImArrowLeft className="mx-1" /> Confirmação
        </Link>
      </Container>
      <Container className="d-flex justify-content-center flex-grow-1">
        {isLoading && (
          <div className="d-flex flex-column align-items-center justify-content-center  my-5">
            <img src={rocket} alt="logo" className="my-3 align-self-center" />
            <Load>Carregando veículo...</Load>
          </div>
        )}
        {!isLoading && vehicle && (
          <div className="d-flex flex-column align-items-center justify-content-center  my-2">
            <FormBox className="d-flex flex-column mx-2 my-5 px-3 py-3">
              <Manufacturer>{vehicle.manufacturer}</Manufacturer>
              <Name>{vehicle.model}</Name>
              <div className="d-flex flex-column align-items-center my-3 px-5">
                <Name className="my-3 text-center">
                  Compra realizada com sucesso!
                </Name>
                <BtnBg type="submit" className="my-2 ">
                  Imprimir boleto
                </BtnBg>
              </div>
            </FormBox>
          </div>
        )}
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default memo(TicketConfirmation);
