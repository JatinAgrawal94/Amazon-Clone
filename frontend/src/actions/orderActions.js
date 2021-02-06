import {ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS,ORDER_CREATE_FAILED,ORDER_DETAILS_REQUEST,ORDER_DETAILS_FAIL, ORDER_DETAILS_SUCCESS, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_MINE_LIST_FAIL} from '../constants/orderConstants';
import {ORDER_PAY_REQUEST ,ORDER_PAY_SUCCESS,ORDER_PAY_FAILED} from '../constants/orderConstants';
import {CART_EMPTY} from '../constants/cartConstants';
import Axios from 'axios';


export const createOrder=(order)=>async (dispatch,getState)=>{
    dispatch({type:ORDER_CREATE_REQUEST,payload:order});
    try{
        const {userSignin:{userInfo},}=getState();
        const {data}=await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/orders`,order,{
            headers:{
                Authorization:`Bearer ${userInfo.token}`,
            }
        });
        dispatch({type:ORDER_CREATE_SUCCESS,payload:data.order});
        dispatch({type:CART_EMPTY});
        localStorage.removeItem('cartItems');
    }catch(error){
            dispatch({type:ORDER_CREATE_FAILED,
            payload:error.response && error.response.data.message
                    ? error.response.data.message
                    :error.message,
                
            })
    }
}

export const detailsOrder=(orderId)=>async (dispatch,getState)=>{
    dispatch({type:ORDER_DETAILS_REQUEST,payload:orderId});
    const {userSignin:{userInfo}}=getState();
    try{
        const {data}=await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${orderId}`,{
            headers:{
                Authorization:`Bearer ${userInfo.token}`,
            }
        })
        dispatch({type:ORDER_DETAILS_SUCCESS,payload:data});
    }catch(error){
        const message=error.response && error.response.data.message
        ? error.response.data.message
        :error.message;
        dispatch({type:ORDER_DETAILS_FAIL,payload:message})
    }
}

export const payOrder=(order,paymentResult)=>async(dispatch,getState)=>{
    dispatch({type:ORDER_PAY_REQUEST,payload:{order,paymentResult}});
    const {userSignin:{userInfo}}=getState();
    try{
        const {data}= Axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${order._id}/pay`,paymentResult,{
            headers:{Authorization:`Bearer ${userInfo.token}`}
        });
        dispatch({type:ORDER_PAY_SUCCESS,payload:data});
        
    }catch(error){
        const message=error.response && error.response.data.message
        ? error.response.data.message
        :error.message;
        dispatch({type:ORDER_PAY_FAILED,payload:message});
    }
}


export const listOrderMine=()=> async (dispatch,getState)=>{
    dispatch({type:ORDER_MINE_LIST_REQUEST});
    const {userSignin:{userInfo}}=getState();
    
    try{
        const {data}= await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders/mine`,{
            headers:{
                Authorization:`Bearer ${userInfo.token}`,
            },
        });
        dispatch({type:ORDER_MINE_LIST_SUCCESS,payload:data});
    }catch(error){
        const message=error.response && error.response.data.message
        ?error.response.data.message
        :error.message;

        dispatch({type:ORDER_MINE_LIST_FAIL,payload:message});
    }
}