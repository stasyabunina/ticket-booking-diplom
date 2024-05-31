import axios from 'axios';
import { getTicketsRequest, getTicketsSuccess, getTicketsFailure } from '../../actions/actionCreators';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import config from '../../../app/config';

export const getTickets = (params = {}) => {
    return dispatch => {
        dispatch(getTicketsRequest());
        dispatch(showLoading());

        axios
            .get(`${config.baseUrl}${import.meta.env.VITE_GET_TICKETS_REQ}${params}`)
            .then(res => {
                if (res.data.error) {
                    dispatch(getTicketsFailure(res.data.error));
                } else {
                    dispatch(getTicketsSuccess({totalCount: res.data.total_count, items: res.data.items}));
                }
                dispatch(hideLoading());
            })
            .catch(err => {
                dispatch(getTicketsFailure(err.message));
                dispatch(hideLoading());
            });
    };
}