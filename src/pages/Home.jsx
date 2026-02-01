import { useEffect, useState } from 'react';
import Card from '../component/Card';
import Carousel from '../component/Carousel';
import Footer from '../component/Footer';

function Home() {
  const [category, setCategory] = useState([]);
  const [item, setItem] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    let res = await fetch('http://localhost:8000/vip/foodData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res = await res.json();
    setItem(res[0]);
    setCategory(res[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Carousel setSearch={setSearch} />
      </div>
      <div className='container'>
        {category.length > 0 ? category.map((data) => {
          return (
            <div className='row mb-3' key={data._id}>
              <div className='fs-3 m-3'> {data.CategoryName} </div>
              <hr />
              {item.length > 0
                ? item.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                
                  .map(filterItems => {
                    return (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                        <Card
                          foodItem={filterItems}
                          options={filterItems.options[0]}
                        />
                      </div>
                    );
                  })
                : <div> Data Not Found </div>}
            </div>
          );
        }) : ""}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
