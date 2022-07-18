import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {

  const DUMMY_PRODUCT =[
    {
      id:'p1',
      price: 6,
      title : 'First Book',
      description : 'This is a first product - amazing!'
    },
    {
      id:'p2',
      price:7,
      title : 'Flowers',
      description :'This is beautiful'
    },
    {
      id:'p3',
      price:16,
      title : 'Dress',
      description : 'This is looks stunning'
    },
  ]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCT.map(product => (
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
