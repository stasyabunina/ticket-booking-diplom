import { useEffect, useState } from 'react';
import { customAlphabet } from 'nanoid'
import { useDispatch, useSelector } from 'react-redux';
import './OrderSuccess.css';
import { useNavigate } from 'react-router-dom';
import OrderSuccessDetails from '../../components/orderSuccess/OrderSuccessDetails';
import { resetFilterTickets, resetOrder, resetPassengers, resetSearchTickets, resetSeats } from '../../redux/actions/actionCreators';

function OrderSuccessPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { success } = useSelector((state) => state.order);
    const [orderId, setOrderId] = useState('');

    const nanoid = customAlphabet('1234567890ABCDEF', 5);

    useEffect(() => {
        !success && navigate('/');
        setOrderId(nanoid());
    }, []);

    const resetStates = () => {
        dispatch(resetFilterTickets());
        dispatch(resetSeats());
        dispatch(resetSearchTickets());
        dispatch(resetPassengers());
        dispatch(resetOrder());
    }

    useEffect(() => {
        const onUnload = (e) => {
            e.preventDefault();
            resetStates();
        }

        success && window.addEventListener('unload', onUnload);

        return () => {
            window.removeEventListener('unload', onUnload);
        }
    }, []);


    return (
        <section className='dashboard order-success'>
            <div className='container'>
                {!success ? '' : <OrderSuccessDetails orderId={orderId} resetStates={resetStates} />}
            </div>
        </section>
    )
}

export default OrderSuccessPage;