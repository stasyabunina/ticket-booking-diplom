import Seat from './Seat';
import { getSeatColumns } from '../../helpers/getSeatColumns';

function SeatsSecondClassLayout(props) {
    const { route, isLinensIncluded, isWifiIncluded, service } = props;
    const { coach } = props.item;
    const { seats } = props.item;

    const seatsColumns = getSeatColumns(seats);

    const unavailableSeatsTotal = 32 - seats.length;
    const unavailableSeats = [];

    for (let i = 0; i < unavailableSeatsTotal; i++) {
        unavailableSeats.push({index: seats.length + i + 1, available: false});
    }

    const unavailableSeatsColumns = getSeatColumns(unavailableSeats);

    const getPrice = (index) => {
        const isSideSeat = index > 32;
        const isTopSeat = index % 2 === 0;

        const wifiPrice = coach.have_wifi && isWifiIncluded ? coach.wifi_price : 0;
        const linensPrice = coach.is_linens_included ? 0 : isLinensIncluded ? coach.linens_price : 0;

        const price = coach.class_type === 'fourth' || coach.class_type === 'first' ? coach.price : coach.class_type === 'third' && isSideSeat ? coach.side_price : isTopSeat ? coach.top_price : coach.bottom_price;

        return price + wifiPrice + linensPrice;
    }

    return (
        <div className='seats__coach-seats-list seats__coach-seats-list_second'>
            {seatsColumns.map((column, columnIndex) => (
                <div key={columnIndex} className='seats__coach-seats-column'>
                    {column.map((item, index) => (
                        <Seat key={index} item={item} route={route} coachId={coach._id} price={getPrice(item.index)} service={service} />
                    ))}
                </div>
            ))}
            {unavailableSeatsColumns.map((column, columnIndex) => (
                <div key={columnIndex} className='seats__coach-seats-column'>
                    {column.map((item, index) => (
                        <Seat key={index} item={item} route={route} coachId={coach._id} price={getPrice(item.index)} service={service} />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default SeatsSecondClassLayout;