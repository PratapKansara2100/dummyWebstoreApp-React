import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Dummy_data = [
  {
    id: "p1",
    price: 125,
    title: "keyboard",
    description: "logitech mx keys s; black",
  },
  {
    id: "p2",
    price: 95,
    title: "mouse",
    description: "logitech mx anywhere 2s; blue",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {Dummy_data.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
