import { useEffect } from "react";
import About from "../components/about/About";
import Process from "../components/process/Process";
import Reviews from "../components/reviews/Reviews";
import { useDispatch } from "react-redux";
import {
	resetFilterTickets,
	resetOrder,
	resetPassengers,
	resetSearchTickets,
	resetSeats,
} from "../redux/actions/actionCreators";

function HomePage() {
	const dispatch = useDispatch();

	const resetStates = () => {
		dispatch(resetFilterTickets());
		dispatch(resetSeats());
		dispatch(resetSearchTickets());
		dispatch(resetPassengers());
		dispatch(resetOrder());
	};

	useEffect(() => {
		resetStates();
	}, []);

	return (
		<>
			<About />
			<Process />
			<Reviews />
		</>
	);
}

export default HomePage;
