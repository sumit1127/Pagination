import React, { useEffect, useState } from "react";
import styles from "./styles.css";

const App = () => {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();
    console.log(data);
    setProduct(data.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const mapData = product.slice(page * 10 - 10, page * 10).map((x, i) => (
    <div key={i} className="col">
      <img src={x.thumbnail} alt={x.title} />
      <h4>{x.title}</h4>
    </div>
  ));

  const pagination = [...Array(product.length / 10)];

  const selectPage = (pg) => {
    if (pg >= 1 && pg <= product.length / 10) setPage(pg);
    console.log(pg);
  };

  const ans = pagination.map((_, i) => {
    return (
      <span key={i} onClick={() => selectPage(i + 1)}>
        {i + 1}
      </span>
    );
  });

  return (
    <div>
      {/* <button onClick={(e) => nextPage(e)}>next</button> */}
      {/* <button onClick={(e) => prevPage(e)}>previous</button> */}

      {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
      {product.length > 0 && <div className="products">{mapData}</div>}
      <div className="pagination">
        <span onClick={() => selectPage(page - 1)}>back</span>
        {ans}
        <span onClick={() => selectPage(page + 1)}>next</span>
      </div>
    </div>
  );
};

export default App;
