import { memo, useMemo, useCallback, useEffect, useState } from 'react';

// import { useNavigate } from '@reach/router';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ImArrowLeft } from 'react-icons/im';
import InputMask from 'react-input-mask';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAddress } from 'context/AddressContext';
import { useVehicles } from 'context/VehiclesContext';

import Footer from 'components/Footer';
import Header from 'components/Header';

import { normalizeFormData, sanitizedCep } from 'helpers';

import useTitle from 'hooks/useTitle';

import { Wrapper } from 'styles/Globalstyles';

import { FormType } from 'types/FormType';

import rocket from '../../assets/r2d2-loading.gif';
import {
  BtnBg,
  ButtonCreditCard,
  ButtonTicket,
  ErrorMsg,
  Form,
  FormBox,
  Load,
  Manufacturer,
  Name,
} from './styled';

// const onSubmit: SubmitHandler<FormType> = (data) => console.log(data);
const CheckoutLoading: React.FC = () => {
  const setTitle = useTitle();
  const { t, i18n } = useTranslation();
  const { isLoading, vehicle, error, fetchVehicle } = useVehicles();
  const { fetchAddress, isInvalidCep, isLoadingAddress, address } =
    useAddress();
  const [lastCep, setLastCep] = useState('');
  const [payment, setPayment] = useState('');
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormType>();

  const handleFormSubmit = useCallback(
    (data: FormType) => {
      normalizeFormData(data);
      navigate(
        payment === 'creditCard'
          ? `/creditcardpayment/${id}`
          : `/ticketpayment/${id}`,
      );
    },
    [id, navigate, payment],
  );

  const cepValue = watch('cep');

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  useEffect(() => {
    setTitle(t('Checkout'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    const sanitizeCep = sanitizedCep(cepValue);

    if (sanitizeCep?.length === 8 && sanitizeCep !== lastCep) {
      setLastCep(sanitizeCep);
      fetchAddress(sanitizeCep);
    }
  }, [cepValue, fetchAddress, lastCep]);

  useEffect(() => {
    setTitle(`Checkout`); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchVehicle(Number(id)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setValue('logradouro', String(address?.logradouro ?? ''));
    setValue('bairro', String(address?.bairro ?? ''));
    setValue('localidade', String(address?.localidade ?? ''));
    setValue('uf', String(address?.uf ?? ''));
  }, [address, setValue]);

  return (
    <Wrapper>
      <Header />
      <Container className="my-3">
        <Link to="/">
          <ImArrowLeft className="mx-1" /> Checkout
        </Link>
      </Container>
      <Container className="d-flex justify-content-center flex-grow-1">
        {isLoading && (
          <div className="d-flex flex-column align-items-center justify-content-center  my-5">
            <img src={rocket} alt="logo" className="my-3  " />
            <Load>Carregando veículo...</Load>
          </div>
        )}
        {error && <h2 className="text-center">{error}</h2>}
        {!isLoading && !error && vehicle && (
          /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
          <div className="d-flex flex-column align-items-center justify-content-center  my-2 w-100">
            <Form onSubmit={handleSubmit(handleFormSubmit)} className="w-100">
              <Row className="justify-content-between flex-column flex-lg-row">
                <Col className="d-flex">
                  <FormBox className="my-3 my-lg-5 px-3 py-3 ">
                    <Name>Informações pessoais</Name>
                    <div className="my-3">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="name" className="form-label">
                        Nome
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        {...register('name', {
                          required: 'Informe o seu nome',
                        })}
                        placeholder=""
                      />
                      {errors.name && (
                        <ErrorMsg>{errors.name.message}</ErrorMsg>
                      )}
                    </div>
                    <div className="my-3">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        {...register('email', {
                          required: 'Informe o seu e-mail',
                        })}
                        placeholder=""
                      />
                      {errors.email && (
                        <ErrorMsg>{errors.email.message}</ErrorMsg>
                      )}
                    </div>
                    <div className="my-3">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="phone" className="form-label">
                        Telefone
                      </label>
                      <InputMask
                        id="phone"
                        mask="(99) 99999-9999"
                        className="form-control"
                        {...register('phone', {
                          required: 'Informe o seu telefone',
                        })}
                        placeholder=""
                      />
                      {errors.phone && (
                        <ErrorMsg>{errors.phone.message}</ErrorMsg>
                      )}
                    </div>
                    <div className="my-3">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="cpf" className="form-label">
                        CPF
                      </label>
                      <InputMask
                        id="cpf"
                        mask="999.999.999-99"
                        className="form-control"
                        {...register('cpf', {
                          required: 'Informe o seu CPF',
                        })}
                        placeholder=""
                      />
                      {errors.cpf && <ErrorMsg>{errors.cpf.message}</ErrorMsg>}
                    </div>
                  </FormBox>
                </Col>
                <Col className="d-flex">
                  <FormBox className="my-3 my-lg-5 px-3 py-3 ">
                    <Name>Endereço</Name>
                    <div className="my-3">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="cep" className="form-label">
                        CEP
                      </label>
                      <InputMask
                        id="cep"
                        mask="99999-999"
                        className="form-control"
                        {...register('cep', {
                          required: 'Informe o seu CEP',
                        })}
                        placeholder=""
                      />
                      {isLoadingAddress && (
                        <span className="my-2">Carregando...</span>
                      )}
                      {!isLoadingAddress && isInvalidCep && (
                        <span>
                          {errors.cep && (
                            <ErrorMsg>{errors.cep.message}</ErrorMsg>
                          )}
                        </span>
                      )}
                    </div>
                    <div className="my-3">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="address" className="form-label">
                        Logradouro
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        {...register('logradouro', {
                          required: 'Informe o seu logradouro',
                        })}
                        placeholder=""
                      />
                      {errors.logradouro && (
                        <ErrorMsg>{errors.logradouro.message}</ErrorMsg>
                      )}
                    </div>
                    <div className="d-flex my-3">
                      <div className="me-2">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="number" className="form-label">
                          Número
                        </label>
                        <input
                          id="number"
                          type="text"
                          className="form-control"
                          {...register('number', {
                            required: 'Informe o seu número',
                          })}
                          placeholder=""
                        />
                        {errors.number && (
                          <ErrorMsg>{errors.number.message}</ErrorMsg>
                        )}
                      </div>
                      <div>
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="complement" className="form-label">
                          Complemento
                        </label>
                        <input
                          id="complement"
                          type="text"
                          className="form-control"
                          {...register('complement')}
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="my-3">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="neighborhood" className="form-label">
                        Bairro
                      </label>
                      <input
                        id="neighborhood"
                        type="text"
                        className="form-control"
                        {...register('bairro', {
                          required: 'Informe o seu bairro',
                        })}
                        placeholder=""
                      />
                      {errors.bairro && (
                        <ErrorMsg>{errors.bairro.message}</ErrorMsg>
                      )}
                    </div>
                    <div className="my-3">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="city" className="form-label">
                        Cidade
                      </label>
                      <input
                        id="city"
                        type="text"
                        className="form-control"
                        {...register('localidade', {
                          required: 'Informe a sua cidade',
                        })}
                        placeholder=""
                      />
                      {errors.localidade && (
                        <ErrorMsg>{errors.localidade.message}</ErrorMsg>
                      )}
                    </div>
                    <div className="my-3">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="state" className="form-label">
                        Estado
                      </label>
                      <input
                        id="state"
                        type="text"
                        className="form-control"
                        {...register('uf', {
                          required: 'Informe o seu estado',
                        })}
                        placeholder=""
                      />
                      {errors.uf && <ErrorMsg>{errors.uf.message}</ErrorMsg>}
                    </div>
                  </FormBox>
                </Col>
                <Col className="d-flex flex-column">
                  <FormBox className=" my-3 my-lg-5 px-3 py-3 ">
                    <Name>Forma de pagamento</Name>
                    <Row className="justify-content-between flex-column flex-xl-row row-cols-1 row-cols-xl-2">
                      <Col>
                        <ButtonCreditCard
                          type="button"
                          onClick={() => setPayment('creditCard')}
                          active={payment}
                        >
                          Cartão de crédito
                        </ButtonCreditCard>
                      </Col>
                      <Col>
                        <ButtonTicket
                          type="button"
                          onClick={() => setPayment('ticket')}
                          active={payment}
                        >
                          Boleto Bancário
                        </ButtonTicket>
                      </Col>
                    </Row>
                    {payment === 'creditCard' && (
                      <div>
                        <div className="my-3">
                          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                          <label htmlFor="card_name" className="form-label">
                            Nome do titular do cartão
                          </label>
                          <input
                            id="card_name"
                            type="text"
                            className="form-control"
                            {...register('card_name', {
                              required: 'Informe o nome do titular',
                            })}
                            placeholder=""
                          />
                          {errors.card_name && (
                            <ErrorMsg>{errors.card_name.message}</ErrorMsg>
                          )}
                        </div>
                        <div className="my-3">
                          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                          <label htmlFor="card_number" className="form-label">
                            Número do cartão
                          </label>
                          <InputMask
                            id="card_number"
                            mask="9999 9999 9999 9999"
                            className="form-control"
                            {...register('card_number', {
                              required: 'Informe o número do cartão',
                            })}
                            placeholder=""
                          />
                          {errors.card_number && (
                            <ErrorMsg>{errors.card_number.message}</ErrorMsg>
                          )}
                        </div>
                        <div className="d-flex my-3">
                          <div className="me-2">
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <label
                              htmlFor="card_validity"
                              className="form-label"
                            >
                              Validade
                            </label>
                            <InputMask
                              id="card_validity"
                              className="form-control"
                              mask="99/99"
                              {...register('card_validity', {
                                required: 'Informe a validade do seu cartão',
                              })}
                              placeholder=""
                            />
                            {errors.card_validity && (
                              <ErrorMsg>
                                {errors.card_validity.message}
                              </ErrorMsg>
                            )}
                          </div>
                          <div>
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <label
                              htmlFor="card_password"
                              className="form-label"
                            >
                              CVC
                            </label>
                            <InputMask
                              id="card_password"
                              mask="999"
                              className="form-control"
                              {...register('card_password', {
                                required: 'Informe o código de segurança',
                              })}
                              placeholder=""
                            />
                            {errors.card_password && (
                              <ErrorMsg>
                                {errors.card_password.message}
                              </ErrorMsg>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </FormBox>
                  {vehicle && (
                    <FormBox className="my-3 my-lg-5 px-3 py-3 ">
                      <Manufacturer>{vehicle.manufacturer}</Manufacturer>
                      <Name>{vehicle.model}</Name>
                      {vehicle.cost_in_credits === 'unknown' ? (
                        ''
                      ) : (
                        <Name>€ {vehicle.cost_in_credits}</Name>
                      )}
                      {payment === 'creditCard' && (
                        <BtnBg
                          type="submit"
                          className="my-2 "
                          disabled={hasErrors}
                        >
                          Finalizar compra
                        </BtnBg>
                      )}
                      {payment === 'ticket' && (
                        <BtnBg
                          type="submit"
                          className="my-2 "
                          disabled={hasErrors}
                        >
                          Finalizar compra
                        </BtnBg>
                      )}
                    </FormBox>
                  )}
                </Col>
              </Row>
            </Form>
          </div>
        )}
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default memo(CheckoutLoading);
