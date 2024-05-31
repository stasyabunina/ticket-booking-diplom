import { Link, useNavigate } from 'react-router-dom';
import config from '../../app/config';
import { totalArrivalPrice, totalDeparturePrice } from '../../redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import OrderPassenger from './OrderPassenger';
import Ticket from '../Ticket';
import { useEffect } from 'react';
import { postOrder } from '../../redux/reducers/orderReducer/postOrder';

function Order({ item, paymentMethod, departurePassengers, arrivalPassengers }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.order.user);
    const departure = useSelector((state) => state.order.departure);
    const arrival = useSelector((state) => state.order.arrival);
    const { success, isLoading, error } = useSelector((state) => state.order);
    
    const departurePrice = useSelector(totalDeparturePrice);
    const arrivalPrice = useSelector(totalArrivalPrice);

    useEffect(() => {
        success === true && navigate(config.orderSuccessUrl);
    }, [success]);
    
    const onOrderConfirm = () => {
        const orderData = {user, departure, arrival}
        dispatch(postOrder(orderData));
    }

    return (
        <div className='order__details'>
            <div className='order__block'>
                <h2 className='order__block-title'>Поезд</h2>
                <Ticket item={item}>
                    <Link className='secondary-btn order__item-btn' to={config.ticketsUrl}>Изменить</Link>
                </Ticket>
            </div>
            <div className='order__block'>
                <h2 className='order__block-title'>Пассажиры</h2>
                <div className='order__block-wrapper'>
                    <ul className='order__passengers'>
                        {departurePassengers.map((passenger, index) => (
                            <OrderPassenger key={index} item={passenger} />
                        ))}
                        {arrivalPassengers.map((passenger, index) => (
                            <OrderPassenger key={index} item={passenger} />
                        ))}
                    </ul>
                    <div className='order__block-btn-wrapper'>
                        <p className='order__total'>
                            Всего <span className='order__total-price'>{departurePrice + arrivalPrice}</span><span className='order__total-price-symbol'> ₽</span>
                        </p>
                        <Link className='secondary-btn order__item-btn' to={config.passengersUrl}>Изменить</Link>
                    </div>
                </div>
            </div>
            <div className='order__block'>
                <h2 className='order__block-title'>Способ оплаты</h2>
                <div className='order__block-wrapper'>
                    <div className='order__block-content'>
                        {paymentMethod === 'online' ? 'Онлайн' : 'Наличными'}
                    </div>
                    <div className='order__block-btn-wrapper'>
                        <Link className='secondary-btn order__item-btn' to={config.paymentUrl}>Изменить</Link>
                    </div>
                </div>
            </div>
            <button className='btn order__confirm-btn' type='button' onClick={onOrderConfirm} disabled={isLoading ? true : false}>подтвердить</button>
            {error ? <div className='order__error-wrapper'>
                {error}
            </div> : ''}
        </div>
    )
}

export default Order;