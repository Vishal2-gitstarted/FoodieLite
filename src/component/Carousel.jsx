import { useState } from "react";

export default function Carousel({setSearch}) {
    const [searchInput, setSearchInput] = useState('');
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
      };
    
      const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearch(searchInput); // Update search term in Home component
      };
    return (
        <div >
            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{objectFit:'cover'}}>
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{ zIndex: "9" }}>
                        <form className="d-flex justify-content-center" onSubmit={handleSearchSubmit}>
                            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search" 
                            value={searchInput}
                            onChange={handleSearchChange}
                            aria-label="Search" />
                            <button className="btn text-white bg-success" 
                          
                            type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src="/chad-montano-MqT0asuoIcU-unsplash.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Burger" />
                    </div>
                    <div className="carousel-item">
                        <img src="/davide-cantelli-jpkfc5_d-DI-unsplash.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Pastry" />
                    </div>
                    <div className="carousel-item">
                        <img src="/foodiesfeed.com_homemade-pizza-with-a-lot-of-cheese.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Barbeque" />
                    </div>
                    <div className="carousel-item">
                        <img src="/pexels-ella-olsson-572949-1640772.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Barbeque" />
                    </div>
                    
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}
