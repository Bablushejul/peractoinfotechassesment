import { Card, Button } from "react-bootstrap";
import CartContext from "../Context/CartContext";
import { useContext } from "react";


function ProductCard(props) {

  const { id, title, price, thumbnail} = props.item;

  const ctx = useContext(CartContext);

  const orderList = [...ctx.orderList];

  const signIn = ctx.isLogedIn;
  
  const buttonClickHandler = () => {
    if (signIn) {

      const n = orderList.length;

      for (let i = 0; i <= n; i++) {

        if (i < n && orderList[i].id === id) {

          orderList[i].quantity += 1;

          break;

        } else if (i === n) {

          const obj = { ...props.item, quantity: 1 };

          orderList.push(obj);

        }
      }

      ctx.setOrderList(orderList);

    } else {

      ctx.setSignInModalVisibility(true);

    }
  };

  

  return (
    <>
      <Card style={{ width: "15rem", margin: "1rem" }}>

        <Card.Img
          variant="top"
          src={thumbnail}
          style={{ height: "12rem", objectFit: "cover" }}
          
        />

        <Card.Body style={{ padding: "1rem" }}>

          <Card.Title style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
            {title}
          </Card.Title>

          <Card.Text style={{ marginBottom: "1rem", fontSize: "1rem" }}>
            Price: ${price}
          </Card.Text>

          <div className="d-grid gap-2 mt-3">

            <Button
              variant="primary"
              style={{ fontSize: "1rem" }}
              onClick={buttonClickHandler}
            >
              Add to Cart
            </Button>

          </div>
          
        </Card.Body>
      </Card>
    </>
  );
}

export default ProductCard;