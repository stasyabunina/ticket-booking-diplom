import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Payment.css';
import PaymentForm from '../../components/payment/PaymentForm';
import Aside from '../../components/Aside';

function PaymentPage() {
    const navigate = useNavigate();
    const section = useRef(null);
    const departureSeats = useSelector((state) => state.order.departure.seats);
    const arrivalSeats = useSelector((state) => state.order.arrival.seats);

    useEffect(() => {
        if (departureSeats.length === 0 && arrivalSeats.length === 0) {
            navigate('/');
        }

        (departureSeats.length !== 0 || arrivalSeats.length !== 0) && window.scrollTo({
            top: section.current?.offsetTop,
            behavior: 'smooth',
        })
    }, []);

    return (
        <section ref={section} className='dashboard payment'>
            <div className='container'>
                <div className='dashboard__wrapper payment__wrapper'>
                    {departureSeats.length === 0 ? '' : <Aside />}
                    <PaymentForm />
                </div>
            </div>
        </section>
    )
}

export default PaymentPage;