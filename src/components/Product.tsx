import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { AppDispatch, RootState } from "../store/store";
import { getProducts } from "../store/productSlice";
import { Alert } from "react-bootstrap";
import StatusCode from "../utils/StatusCode";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

function Product() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: products, status } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (status === StatusCode.LOADING) {
    return <p>Loading...</p>;
  }

  if (status === StatusCode.ERROR) {
    return (
      <Alert variant="danger">Something went wrong! Try again later.</Alert>
    );
  }

  const addToCart = (product: Product) => {
    // dispatch an add-action
    dispatch(add(product));
  };

  //key={product.id} card
  const cards = products.map((product) => (
    <div key={product.id} className="col-md-3" style={{ marginBottom: "10px" }}>
      <Card className="h-100">
        <div className="text-center">
          <Card.Img
            variant="top"
            src={product.image}
            style={{ width: "150px", height: "195px", marginTop: "30px" }}
          />
        </div>

        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>Rating: {product.rating.rate}</Card.Text>
          <Card.Text>${product.price}</Card.Text>
        </Card.Body>

        <Card.Footer style={{ background: "white" }}>
          <Button variant="primary" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));

  return (
    <>
      <h1>Product Dashboard</h1>
      <div className="row">{cards}</div>
    </>
  );
}

export default Product;
