import  { useEffect, useRef, useState } from 'react';
import { useCart, useDispatch } from './ContextUse';

export default function Card(props) {
  let dispatch = useDispatch();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options)
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const handleAdd = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    if (food !== ([])) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: TotalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: TotalPrice, qty: qty, size: size,img: props.ImgSrc })
        return
      }
      return
    }
    await dispatch({ type: 'ADD', id: props.foodItem._id, name: props.foodItem.name, price:TotalPrice, qty: qty, size: size })
    // console.log(data)
  }
  let TotalPrice = qty * parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  })
  return (
    <div>
      <div className="card mt-3" style={{ width: '17rem' }}>
        <img src={props.foodItem.img} className="card-img-top" alt="" style={{ height: "200px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className=' w-100 d-flex align-items-center justify-content-between'>
            <select className='m-2 h-100 bg-success' onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                )
              })}
            </select>
            <select className='m-2 h-100 bg-success'ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {
                priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })
              }
            </select>
            <div className='d-flex fs-6'>
            ₹{TotalPrice}/-
            </div>


          </div>
       
        <hr />
        <button className={'btn btn-success justify-center ms-2'} onClick={handleAdd}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}
