import {
  CUSTOMER_CREATE_FAIL,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_DETAILS_FAIL,
  CUSTOMER_DETAILS_REQUEST,
  CUSTOMER_DETAILS_SUCCESS,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_RESET,
  CUSTOMER_LIST_SUCCESS,
} from "../constants/customerConstants";
import axios from "axios";

export const listCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_LIST_REQUEST });

    const { data } = await axios.get("/api/customers");

    dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: CUSTOMER_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const addCustomers = (customer) => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/customers`, customer, config);
    dispatch({ type: CUSTOMER_CREATE_SUCCESS, payload: data });
    dispatch({ type: CUSTOMER_LIST_RESET });
  } catch (err) {
    dispatch({
      type: CUSTOMER_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getCustomerDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log("get customer details called ==>", id);

    const { data } = await axios.get(`/api/customers/${id}`, config);
    dispatch({ type: CUSTOMER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: CUSTOMER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
