import axios from 'axios';
import config from '../../../app/config';
import { orderRequest, orderSuccess, orderFailure } from '../../actions/actionCreators';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const postOrder = (data) => {
    return dispatch => {
        dispatch(orderRequest());
        dispatch(showLoading());

        axios
            .post(`${config.baseUrl}${import.meta.env.VITE_ORDER_REQ}`, data)
            .then(() => {
                dispatch(orderSuccess());
                dispatch(hideLoading());
            })
            .catch(err => {
                dispatch(orderFailure(err.message));
                dispatch(hideLoading());
                console.log(err.message)
            });
    };
}