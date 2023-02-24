import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { normalizeVehicleData } from 'helpers';

import Api from 'services/Api';

import { VehicleType } from 'types/VehicleType';

interface IContextProps {
  vehicles: VehicleType[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  fetchVehicles: (page: number, search?: string) => Promise<void>;
  fetchVehicle: (charId: number | string) => Promise<void>;
  vehicle: VehicleType | null;
}

interface IVehiclesProviderProps {
  children: React.ReactNode;
}

export const ReactContext = createContext<IContextProps>({} as IContextProps);

export const VehiclesProvider: React.FC<IVehiclesProviderProps> = ({
  children,
}) => {
  const [vehicles, setVehicles] = useState<VehicleType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = useCallback(async (page: number, search?: string) => {
    const limit = 10;

    setCurrentPage(page);
    setIsLoading(true);
    setError(null);

    try {
      const {
        data: { results, count },
      } = await Api.get(`/vehicles`, { params: { search, page } });
      setVehicles(normalizeVehicleData(results));
      setTotalPages(Math.ceil(count / limit));
    } catch {
      setError('Não foi possível carregar os veículos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles(1);
  }, [fetchVehicles]);

  const fetchVehicle = useCallback(async (charId: number | string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await Api.get(`/vehicles/${charId}`);

      setVehicle(data);
    } catch {
      setError('Não foi possível carregar o veículo');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          vehicles,
          isLoading,
          error,
          totalPages,
          currentPage,
          fetchVehicles,
          fetchVehicle,
          vehicle,
        }),
        [
          vehicles,
          isLoading,
          error,
          totalPages,
          currentPage,
          fetchVehicles,
          fetchVehicle,
          vehicle,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  );
};

export const useVehicles = (): IContextProps => {
  const context = useContext(ReactContext);

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useMyCustomHook must be within MyCustomProvider');
  }

  return context;
};
