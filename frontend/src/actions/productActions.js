import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";
import Axios from 'axios';
import { ORDER_PAY_REQUEST } from "../constants/orderConstants";
import dotenv from 'dotenv';
dotenv.config();

// PRODUCT_DETAILS_SUCCESS
export const listProducts=()=>async (dispatch)=>{
    dispatch({
        type:PRODUCT_LIST_REQUEST
    });
    
    try{
        const {data}=await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})
    }catch(error){
        dispatch({type:PRODUCT_LIST_FAIL,payload:error.messsage});

    }
}

export const detailsProduct=(productId)=> async(dispatch)=>{
    dispatch({type:PRODUCT_DETAILS_REQUEST,payload:productId});
    try{
        const {data}=await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}`)
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data});
    }catch(error){
        dispatch({type:PRODUCT_DETAILS_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const payOrder=(order,paymentResult)=>(dispatch,getState)=>{
    dispatch({type:ORDER_PAY_REQUEST,payload:{order,paymentResult}});
}

