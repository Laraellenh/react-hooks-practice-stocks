import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  // variable for stocks and setter
  const [stocks, setStocks] = useState("")
  // going to be an array of stocks
  const [portfolio, setPortfolio]=useState([])
  // to sort later by price and alphabetical
  const [sortBy, setSortBy] = useState("Alphabetically");
  // filter by type
  const [filterBy, setFilterBy] = useState("Tech");
  // fetch and data stocks variable will be taken care of by the setStocks setter
  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then(setStocks);
  }, []);
// find stock by id and add if not there, first copy the array of stocks then add the new one
  function handleAddStock(stockToAdd){
    const stockInPortfolio= portfolio.find(
      (stock)=> stock.id === stockToAdd.id
    );
    if(!stockInPortfolio){
      setPortfolio([...portfolio, stockToAdd])
    }
  }
  // sortedStocks alphabtizes the stocks by name
 
  const sortedStocks = [...stocks].sort((stock1, stock2) => {
    if (sortBy === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name);
    } else {
      return stock1.price - stock2.price;
    }
  });
  // remove handler works by using setPortfolio function and filter by id and removes if its already there
  function handleRemoveStock(stockToRemove) {
    setPortfolio((portfolio) =>
      portfolio.filter((stock) => stock.id !== stockToRemove.id)
    );
  }
  // filter by type
  const filteredStocks = sortedStocks.filter(
    (stock) => stock.type === filterBy
  ); 

  return (
    <div>
       <SearchBar
        sortBy={sortBy}
        onChangeSort={setSortBy}
        filterBy={filterBy}
        onChangeFilter={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer onAddStock={handleAddStock} stocks={filteredStocks} />
        </div>
        <div className="col-4">
          <PortfolioContainer onRemoveStock={handleRemoveStock} stocks={portfolio} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
