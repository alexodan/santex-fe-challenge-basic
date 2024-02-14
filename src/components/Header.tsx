import { useQuery, gql } from '@apollo/client';

export const GET_CURRENT_ORDER = gql`
  query GetCurrentOrder {
    activeOrder {
      total
    }
  }
`;

export function Header() {
  const { data, loading } = useQuery(GET_CURRENT_ORDER);

  return (
    <header
      style={{
        background: 'red',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        alignItems: 'center',
      }}
    >
      <img
        src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
        alt="logo"
      />
      {!loading && <h2>Total: ${data.activeOrder.total}</h2>}
    </header>
  );
}
