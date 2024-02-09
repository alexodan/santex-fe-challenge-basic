import { useQuery, gql, useMutation } from '@apollo/client';
import styled from 'styled-components';

const GET_PRODUCTS = gql`
  query GetProducts($options: ProductListOptions) {
    products(options: $options) {
      items {
        id
        name
        description
        variants {
          id
          price
          options {
            id
            name
            code
          }
        }
      }
    }
  }
`;

const ADD_ITEM_TO_ORDER = gql`
  mutation AddItemToOrder($productId: ID!, $variantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $variantId, quantity: $quantity) {
      id
      total
      lines {
        productVariant {
          id
          name
          price
        }
        quantity
      }
    }
  }
`;

const BuyButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const GridItem = styled.div`
  flex: 1 0 21%; /* Explanation below */
  margin: 1.5%;
  max-width: 300px;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
`;

const CardMedia = styled.img`
  width: 100%;
  height: auto;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const Title = styled.h5`
  margin-bottom: 0.5em;
`;

const Description = styled.p`
  color: #333;
`;

const Price = styled.p`
  color: #000;
  font-weight: bold;
`;

export function ProductList() {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      options: {
        skip: 0,
        take: 10,
      },
    },
  });
  const [addItemToOrder] = useMutation(ADD_ITEM_TO_ORDER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Grid>
      {data.products.map((product: any) => (
        <GridItem key={product.id}>
          <Card>
            <CardMedia alt={product.name} src={product.variants[0].image.url} />
            <CardContent>
              <Title>{product.name}</Title>
              <Description>{product.description}</Description>
              <Price>${product.variants[0].price}</Price>
              <BuyButton
                onClick={() =>
                  addItemToOrder({
                    variables: {
                      productId: product.id,
                      variantId: product.variants[0].id,
                      quantity: 1,
                    },
                  })
                }
              >
                Buy
              </BuyButton>
            </CardContent>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
}
