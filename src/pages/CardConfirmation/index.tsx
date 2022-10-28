import { memo, useEffect } from 'react';

import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';

import { useVehicles } from 'context/VehiclesContext';

import Footer from 'components/Footer';
import Header from 'components/Header';

import useTitle from 'hooks/useTitle';

import rocket from '../../assets/r2d2-loading.gif';
import { Bg, FormBox, Load, Manufacturer, Name } from './styled';

// const onSubmit: SubmitHandler<FormType> = (data) => console.log(data);
const CardConfirmation: React.FC = () => {
  const setTitle = useTitle();
  const { t, i18n } = useTranslation();
  const { isLoading, vehicle, fetchVehicle } = useVehicles();

  const { id } = useParams();

  useEffect(() => {
    setTitle(t(`Checkout `)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchVehicle(Number(id)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Bg>
      <Header />
      <Container className="mt-3">
        <Link to="/">
          <AiOutlineArrowLeft /> Confirmação
        </Link>
      </Container>
      <Container className="d-flex justify-content-center">
        {isLoading && (
          <div className="d-flex flex-column my-5">
            <div className="d-flex flex-column align-self-center">
              <img src={rocket} alt="logo" className="my-3 align-self-center" />
              <Load>Carregando veículo...</Load>
            </div>
          </div>
        )}
        {!isLoading && vehicle && (
          <FormBox className="d-flex flex-column mx-2 my-5 px-3 py-3">
            <Manufacturer>{vehicle.manufacturer}</Manufacturer>
            <Name>{vehicle.model}</Name>
            <div className="d-flex flex-column align-items-center my-3 px-5">
              <Name className="my-3">Compra realizada com sucesso!</Name>
              <p className="my-0">
                Confirmamos o seu pedido. Em breve você receberá um
              </p>
              <p>e-mail com o status do processo de entrega</p>
            </div>
          </FormBox>
        )}
      </Container>
      <Footer />
    </Bg>
  );
};

// console.log('testedepois', vehicle);
export default memo(CardConfirmation);
// "row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
