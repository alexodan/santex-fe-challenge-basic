import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_CURRENT_ORDER = gql`
  query GetCurrentOrder {
    activeOrder {
      total
    }
  }
`;

interface OrderContextProps {
  subtotal: number;
  setSubtotal: React.Dispatch<React.SetStateAction<number>>;
}

export const OrderContext = createContext<OrderContextProps>({
  subtotal: 0,
  setSubtotal: () => {},
});

// Create a provider component
export function OrderProvider({ children }: PropsWithChildren<{}>) {
  const [subtotal, setSubtotal] = useState(0);

  // The value that will be provided to consuming components
  const value = {
    subtotal,
    setSubtotal,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function Header() {
  const { subtotal, setSubtotal } = useContext(OrderContext);
  const { data } = useQuery(GET_CURRENT_ORDER);

  useEffect(() => {
    if (data && data.activeOrder) {
      setSubtotal(data.activeOrder.total);
    }
  }, [data, setSubtotal]);

  return (
    <header style={{ background: 'red' }}>
      <img
        src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
        alt="logo"
      />
      <div>${subtotal}</div>
    </header>
  );
}
