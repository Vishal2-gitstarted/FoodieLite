import axios from "axios";
import { useCart, useDispatch } from "../component/ContextUse";

function Cart() {
    let data = useCart();
    let dispatch = useDispatch();

    if (data.length === 0) {
        return (
            <div className="m-5 w-100 text-center fs-3" style={{ color: 'white' }}>
                The Cart Is Empty...
            </div>

        );
    }

    const handleCheckOut = async () => {

        let user = localStorage.getItem("user");
        let res = await axios.post(`http://localhost:8000/vip/orderData`, {

            order_data: data,
            email: user,
            order_date: new Date().toDateString()
        });
        console.log("Order response:", res);
        if (res.status === 200) {
            dispatch({ type: "DROP" }); // Clear the cart

        }
    }


    let TotalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div className='container  mt-5 table-responsive table-responsive-sm table-responsive-md '>
            <table className='table table-hover'>
                <thead className='text-success fs-4'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Option</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((food, index) => (
                        <tr key={index}>
                            <th scope='row'>{index + 1}</th>
                            <td>{food.name}</td>
                            <td>{food.qty}</td>
                            <td>{food.size}</td>
                            <td>{food.price}</td>
                            <td>
                                <button type="button" className="btn btn-danger btn-sm"
                                    onClick={() => {

                                        dispatch({ type: "REMOVE", index })
                                    }} >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div><h1 className='fs-2 mt-4' style={{ color: "white" }}>Total Price: {TotalPrice}/-</h1></div>
            <div>
                <button className='btn bg-success mt-5 text-white' onClick={handleCheckOut}
                >Check Out</button>
            </div>
        </div>
    );
}

export default Cart;
