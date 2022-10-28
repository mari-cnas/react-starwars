import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { useForm, UseFormSetValue } from 'react-hook-form';

import cepApi from 'services/cepApi';

import { AddressType } from 'types/AddressType';

interface IContextProps {
  fetchAddress: (cep: string) => Promise<void>;
  isInvalidCep: boolean;
  isLoadingAddress: boolean;
  address: AddressType | null;
}

interface IAddressProviderProps {
  children: React.ReactNode;
}

export const ReactContext = createContext<IContextProps>({} as IContextProps);

export const AddressProvider: React.FC<IAddressProviderProps> = ({
  children,
}) => {
  const [isInvalidCep, setIsInvalidCep] = useState(true);
  const [address, setAddress] = useState<AddressType | null>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const fetchAddress = useCallback(
    async (cep: string) => {
      setIsInvalidCep(false);
      setIsLoadingAddress(true);
      try {
        const { data } = await cepApi.get(`/${cep}/json/`);
        setAddress(data);
        console.log('data', data);
        if (data.erro) {
          setIsInvalidCep(true);
        }
        setIsLoadingAddress(false);
      } catch (e) {
        setIsInvalidCep(isInvalidCep);
      } finally {
        setIsLoadingAddress(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          fetchAddress,
          isInvalidCep,
          isLoadingAddress,
          address,
        }),
        [fetchAddress, isInvalidCep, isLoadingAddress, address],
      )}
    >
      {children}
    </ReactContext.Provider>
  );
};

export const useAddress = (): IContextProps => {
  const context = useContext(ReactContext);

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useMyCustomHook must be within MyCustomProvider');
  }

  return context;
};
