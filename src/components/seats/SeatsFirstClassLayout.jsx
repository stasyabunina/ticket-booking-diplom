import Seat from './Seat';
import { getSeatColumns } from '../../helpers/getSeatColumns';

function SeatsFirstClassLayout(props) {
    const { route, isLinensIncluded, isWifiIncluded, service } = props;
    const { coach } = props.item;
    const { seats } = props.item;

    const filteredSeats = seats.length < 18 ? seats.slice(2) : seats.slice(2, -2);
    const seatsColumns = getSeatColumns(filteredSeats);

    const unavailableSeatsTotal = 18 - seats.length;
    const unavailableSeats = [];

    for (let i = 0; i < unavailableSeatsTotal; i++) {
        unavailableSeats.push({index: seats.length + i + 1, available: false});
    }

    const unavailableSeatsColumns = getSeatColumns(unavailableSeats).slice(0, -1);

    const getPrice = (index) => {
        const isSideSeat = index > 32;
        const isTopSeat = index % 2 === 0;

        const wifiPrice = coach.have_wifi && isWifiIncluded ? coach.wifi_price : 0;
        const linensPrice = coach.is_linens_included ? 0 : isLinensIncluded ? coach.linens_price : 0;

        const price = coach.class_type === 'fourth' || coach.class_type === 'first' ? coach.price : coach.class_type === 'third' && isSideSeat ? coach.side_price : isTopSeat ? coach.top_price : coach.bottom_price;

        return price + wifiPrice + linensPrice;
    }

    return (
        <div className='seats__coach-seats-list seats__coach-seats-list_first'>
            <Seat key={seats[0].index} item={seats[0]} route={route} coachId={coach._id} price={getPrice(seats[0].index)} service={service} couchClass='first' />
            {seatsColumns.map((column, columnIndex) => (
                <div key={columnIndex} className='seats__coach-seats-column'>
                    {column.map((item, index) => (
                        item.index === 2 ? '' : <Seat key={index} item={item} route={route} coachId={coach._id} price={getPrice(item.index)} service={service} />
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
            {seats.length < 18 ? <Seat key={unavailableSeats[unavailableSeats.length - 1].index} item={unavailableSeats[unavailableSeats.length - 1]} route={route} coachId={coach._id} price={getPrice(unavailableSeats[unavailableSeats.length - 1].index)} service={service} /> : <Seat key={seats[seats.length - 1].index} item={seats[seats.length - 1]} route={route} coachId={coach._id} price={getPrice(seats[seats.length - 1].index)} service={service} />}
        </div>
    )
}

export default SeatsFirstClassLayout;