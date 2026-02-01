import { useState } from 'react';
import { Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cart from '../pages/Cart';
import Modal from '../Modal';
import { useCart } from './ContextUse';

export default function Navbar() {
    const [cartView, setCartView] = useState(false)
    let data = useCart();
    const navigate = useNavigate();
    const handlelogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/" style={{ fontFamily: "'Sofia', sans-serif" }}>
                        <span className="font-effect-fire">FoodieLite</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link fs-4 mx-3 active" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem('token')) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-4 mx-3 active" aria-current="page" to="/myorder">My Orders</Link>
                                </li>
                                : ""}
                        </ul>
                        {(!localStorage.getItem('token')) ?
                            <div className='d-flex'>

                                <Link className="btn bg-white text-success fs-5 mx-2 active" to="/login">Login</Link>

                                <Link className="btn bg-white text-success fs-5 mx-2 active" to="/register">Register</Link>

                            </div>
                            : <div>
                                <div className='btn bg-white mx-3 position-relative' onClick={()=>{setCartView(true)}}><i className="fa fa-cart-shopping"></i>
                                    <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle" style={{ marginLeft: '4px' }}>
                                       {data.length}
                                    </Badge>
                                </div>
                                {cartView?( <Modal onClose = {()=>setCartView(false)}> <Cart/> </Modal>) : null}

                                <div className='btn bg-white text-danger mx-2' onClick={handlelogout}>Logout</div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
}
