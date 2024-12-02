import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Button, Card } from "react-bootstrap";
import { remove } from "../store/cartSlice";

function Cart() {
  const products = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch<AppDispatch>();
  const revomeToCart = (id: number) => {
    // dispatch a remove-action
    dispatch(remove(id));
  };

  const cards = products.map((product) => (
    <div className="col-md-12" style={{ marginBottom: "10px" }}>
      <Card key={product.id} className="h-100">
        <div className="text-center">
          <Card.Img
            variant="top"
            src={product.image}
            style={{ width: "200px", height: "260px", marginTop: "30px" }}
          />
        </div>

        <Card.Body className="d-flex flex-column align-items-center">
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>Rating: {product.rating.rate}</Card.Text>
          <Card.Text>${product.price}</Card.Text>
        </Card.Body>

        <Card.Footer
          style={{ background: "white" }}
          className="d-flex flex-column align-items-center"
        >
          <Button variant="danger" onClick={() => revomeToCart(product.id)}>
            Remove Item
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));

  return (
    <div>
      <div className="row">{cards}</div>
    </div>
  );
}

export default Cart;
