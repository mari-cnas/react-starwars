import { memo, useCallback, useEffect, useState } from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';

import { useVehicles } from 'context/VehiclesContext';

import Footer from 'components/Footer';
import Header from 'components/Header';
import VehicleCard from 'components/VehicleCard';

import useTitle from 'hooks/useTitle';

import rocket from '../../assets/r2d2-loading.gif';
import {
  Bg,
  Load,
  SearchBtn,
  SearchDiv,
  SearchTxt,
  StarWarsPaginate,
} from './styled';

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const setTitle = useTitle();
  const { vehicles, isLoading, totalPages, currentPage, fetchVehicles } =
    useVehicles();

  useEffect(() => {
    setTitle(t('home.head-title'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage]);

  const [search, setSearch] = useState('');

  const handlePageChange = useCallback(
    (page: number) => fetchVehicles(page, search),
    [fetchVehicles, search],
  );

  const handleSearch = useCallback(
    () => fetchVehicles(1, search),
    [fetchVehicles, search],
  );

  return (
    <Bg>
      <Header />
      <Container className="d-flex flex-column ">
        <SearchDiv className="d-flex justify-content-center mb-3 py-4">
          <Row className="w-100">
            <Col md={8}>
              <SearchTxt
                type="text"
                placeholder="Digite o nome ou modelo do veículo"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <SearchBtn type="button" onClick={handleSearch}>
                Buscar
              </SearchBtn>
            </Col>
          </Row>
        </SearchDiv>
        {isLoading && (
          <div className="d-flex flex-column my-5">
            <div className="d-flex flex-column align-self-center">
              <img src={rocket} alt="logo" className="my-3 align-self-center" />
              <Load>Carregando veículos...</Load>
            </div>
          </div>
        )}
        {!isLoading && (
          <div className="d-flex flex-column ">
            <Row className="row-cols-1 row-cols-md-3 row-cols-lg-4 g-3 justify-content-center">
              {vehicles.map((vehicle) => (
                <Col className="d-flex" key={vehicle.id}>
                  <VehicleCard vehicle={vehicle} />
                </Col>
              ))}
            </Row>
            {totalPages > 1 && (
              <StarWarsPaginate
                forcePage={currentPage - 1}
                onPageChange={(p) => handlePageChange(p.selected + 1)}
                pageCount={totalPages}
                previousLabel={<ImArrowLeft />}
                nextLabel={<ImArrowRight />}
                className="my-5 list-unstyled flex-wrap"
              />
            )}
          </div>
        )}
      </Container>
      <Footer />
    </Bg>
  );
};

export default memo(Home);
