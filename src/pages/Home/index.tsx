import { memo, useCallback, useEffect, useState } from 'react';

import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';

import { useVehicles } from 'context/VehiclesContext';

import Footer from 'components/Footer';
import Header from 'components/Header';
import VehicleCard from 'components/VehicleCard';

import useTitle from 'hooks/useTitle';

import { Wrapper } from 'styles/Globalstyles';

import rocket from '../../assets/r2d2-loading.gif';
import {
  ClearBtn,
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
    setTitle(t(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage]);

  const [search, setSearch] = useState('');
  const [hasSearch, setHasSearch] = useState(false);

  const handlePageChange = useCallback(
    (page: number) => fetchVehicles(page, search),
    [fetchVehicles, search],
  );

  const handleSearch = useCallback(() => {
    fetchVehicles(1, search);
    setHasSearch(true);
  }, [fetchVehicles, search, setHasSearch]);

  const handleClean = useCallback(() => {
    fetchVehicles(1);
    setSearch('');
    setHasSearch(false);
  }, [fetchVehicles, setHasSearch]);

  return (
    <Wrapper>
      <Header />
      <Container className="d-flex flex-column ">
        <SearchDiv className="d-flex justify-content-center mb-3 py-4">
          <SearchTxt
            type="text"
            placeholder="Digite o nome ou modelo do veículo"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="py-1 px-2 mx-3 border-0"
          />
          <SearchBtn
            type="button"
            onClick={handleSearch}
            className="me-3 border-0"
            disabled={!search?.length}
          >
            <FaSearch size={18} />
          </SearchBtn>
          {hasSearch === true && (
            <ClearBtn
              type="button"
              onClick={handleClean}
              className="me-3 border-0"
            >
              <AiOutlineCloseCircle size={18} />
            </ClearBtn>
          )}
        </SearchDiv>
        {isLoading && (
          <div className="d-flex flex-column my-5">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <img src={rocket} alt="logo" className="my-3 " />
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
    </Wrapper>
  );
};

export default memo(Home);
