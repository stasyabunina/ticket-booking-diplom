import Seat from './Seat';
import { getSeatColumns } from '../../helpers/getSeatColumns';

function SeatsThirdClassLayout(props) {
    const { route, isLinensIncluded, isWifiIncluded, service } = props;
    const { coach } = props.item;
    const { seats } = props.item;

    const availableSeats = seats;

    const unavailableSeatsTotal = 48 - seats.length;
    const unavailableSeats = [];
    for (let i = 0; i < unavailableSeatsTotal; i++) {
        unavailableSeats.push({ index: seats.length + i + 1, available: false });
    }

    const newSeats = [...availableSeats, ...unavailableSeats];
    const mainSeats = newSeats.slice(0, 32);
    const sideSeats = newSeats.slice(-16);

    const mainSeatsColumns = getSeatColumns(mainSeats);
    const sideSeatsColumns = getSeatColumns(sideSeats);

    const getPrice = (index) => {
        const isSideSeat = index > 32;
        const isTopSeat = index % 2 === 0;

        const wifiPrice = coach.have_wifi && isWifiIncluded ? coach.wifi_price : 0;
        const linensPrice = coach.is_linens_included ? 0 : isLinensIncluded ? coach.linens_price : 0;

        const price = coach.class_type === 'fourth' || coach.class_type === 'first' ? coach.price : coach.class_type === 'third' && isSideSeat ? coach.side_price : isTopSeat ? coach.top_price : coach.bottom_price;

        return price + wifiPrice + linensPrice;
    }

    return (
        <div className='seats__coach-seats-list seats__coach-seats-list_third'>
            <div className='seats__coach-seats-main'>
                {mainSeatsColumns.map((column, columnIndex) => (
                    <div key={columnIndex} className='seats__coach-seats-column seats__coach-seats-column_main'>
                        {column.map((item, index) => (
                            <Seat key={index} item={item} route={route} coachId={coach._id} price={getPrice(item.index)} service={service} />
                        ))}
                    </div>
                ))}
            </div>
            <div className='seats__coach-seats-side'>
                {sideSeatsColumns.map((column, columnIndex) => (
                    <div key={columnIndex} className='seats__coach-seats-column seats__coach-seats-column_side'>
                        {column.map((item, index) => (
                            <Seat key={index} item={item} route={route} coachId={coach._id} price={getPrice(item.index)} service={service} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SeatsThirdClassLayout;