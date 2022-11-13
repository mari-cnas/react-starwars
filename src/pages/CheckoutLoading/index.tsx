import { memo, useCallback, useEffect, useState } from 'react';

// import { useNavigate } from '@reach/router';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ImArrowLeft } from 'react-icons/im';
import InputMask from 'react-input-mask';
import { Link, useParams } from 'react-router-dom';

import { useAddress } from 'context/AddressContext';
import { useVehicles } from 'context/VehiclesContext';

import Footer from 'components/Footer';
import Header from 'components/Header';

import { normalizeFormData, sanitizedCep } from 'helpers';

import useTitle from 'hooks/useTitle';

import { FormType } from 'types/FormType';

import rocket from '../../assets/r2d2-loading.gif';
import {
  Bg,
  BtnBg,
  ButtonCreditCard,
  ButtonTicket,
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
  const { isLoading, vehicle, fetchVehicle } = useVehicles();
  const { fetchAddress, isInvalidCep, isLoadingAddress, address } =
    useAddress();
  const [lastCep, setLastCep] = useState('');
  const [payment, setPayment] = useState('');
  //  const navigate = useNavigate();

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormType>();

  const handleFormSubmit = useCallback((data: FormType) => {
    normalizeFormData(data);
  }, []);

  const cepValue = watch('cep');

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
    <Bg>
      <Header />
      <Container className="my-3">
        <Link to="/">
          <ImArrowLeft className="mx-1" /> Checkout
        </Link>
      </Container>
      <Container className="d-flex justify-content-between">
        {isLoading && (
          <div className="d-flex flex-column my-5">
            <div className="d-flex flex-column align-self-center">
              <img src={rocket} alt="logo" className="my-3 align-self-center" />
              <Load>Carregando veículo...</Load>
            </div>
          </div>
        )}
        {!isLoading && (
          /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Row className="justify-content-between">
              <Col className="d-flex">
                <FormBox className="my-5 px-3 py-3 w-100">
                  <Name>Informações pessoais</Name>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="name" className="form-label">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    {...register('name', { required: 'Informe o seu nome' })}
                    placeholder=""
                  />
                  {errors.name && <p>{errors.name.message}</p>}
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    {...register('email', { required: 'Informe o seu e-mail' })}
                    placeholder=""
                  />
                  {errors.email && <p>{errors.email.message}</p>}
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
                  {errors.phone && <p>{errors.phone.message}</p>}
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
                  {errors.cpf && <p>{errors.cpf.message}</p>}
                </FormBox>
              </Col>
              <Col className="d-flex">
                <FormBox className="my-5 px-3 py-3 w-100">
                  <Name>Endereço</Name>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="cep" className="form-label">
                    CEP
                  </label>
                  <InputMask
                    id="cep"
                    mask="99999-999"
                    className="form-control"
                    {...register('cep', {
                      required: 'Informe o seu CPF',
                    })}
                    placeholder=""
                  />
                  {isLoadingAddress && <span>...</span>}
                  {!isLoadingAddress && isInvalidCep && (
                    <span>{errors.cep && <p>{errors.cep.message}</p>}</span>
                  )}
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
                  {errors.logradouro && <p>{errors.logradouro.message}</p>}
                  <div className="d-flex">
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
                      {errors.number && <p>{errors.number.message}</p>}
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
                  {errors.bairro && <p>{errors.bairro.message}</p>}
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
                  {errors.localidade && <p>{errors.localidade.message}</p>}
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
                  {errors.uf && <p>{errors.uf.message}</p>}
                </FormBox>
              </Col>
              <Col className="d-flex flex-column">
                <FormBox className=" my-5 px-3 py-3 ">
                  <Name>Forma de pagamento</Name>
                  <Row className="justify-content-between row-cols-1 row-cols-lg-2">
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
                      {errors.card_name && <p>{errors.card_name.message}</p>}
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="card_number" className="form-label">
                        Número do cartão
                      </label>
                      <input
                        id="card_number"
                        type="text"
                        className="form-control"
                        {...register('card_number', {
                          required: 'Informe o número do cartão',
                        })}
                        placeholder=""
                      />
                      {errors.card_number && (
                        <p>{errors.card_number.message}</p>
                      )}
                      <div className="d-flex">
                        <div className="me-2">
                          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                          <label htmlFor="card_validity" className="form-label">
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
                            <p>{errors.card_validity.message}</p>
                          )}
                        </div>
                        <div>
                          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                          <label htmlFor="card_password" className="form-label">
                            Código de Segurança
                          </label>
                          <InputMask
                            id="card_password"
                            mask="999"
                            className="form-control"
                            {...register('card_password', {
                              required: 'Informe o vódigo de segurança',
                            })}
                            placeholder=""
                          />
                          {errors.card_password && (
                            <p>{errors.card_password.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </FormBox>
                {vehicle && (
                  <FormBox className="my-5 px-3 py-3 ">
                    <Manufacturer>{vehicle.manufacturer}</Manufacturer>
                    <Name>{vehicle.model}</Name>
                    {vehicle.cost_in_credits === 'unknown' ? (
                      ''
                    ) : (
                      <Name>€ {vehicle.cost_in_credits}</Name>
                    )}
                    {payment === 'creditCard' && (
                      <BtnBg type="submit" className="my-2 w-100">
                        <Link to="/cardconfirmation">Finalizar compra</Link>
                      </BtnBg>
                    )}
                    {payment === 'ticket' && (
                      <BtnBg type="submit" className="my-2 w-100">
                        <Link to="/ticketconfirmation">Finalizar compra</Link>
                      </BtnBg>
                    )}
                  </FormBox>
                )}
              </Col>
            </Row>
          </Form>
        )}
      </Container>
      <Footer />
    </Bg>
  );
};

export default memo(CheckoutLoading);
