import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";
import Axios from 'axios';
// PRODUCT_DETAILS_SUCCESS
export const listProducts=()=>async (dispatch)=>{
    dispatch({
        type:PRODUCT_LIST_REQUEST
    });
    
    try{
        const {data}=await Axios.get('https://amazon-cloone.herokuapp.com/api/products');
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})
    }catch(error){
        dispatch({type:PRODUCT_LIST_FAIL,payload:error.messsage});

    }
}

export const detailsProduct=(productId)=> async(dispatch)=>{
    dispatch({type:PRODUCT_DETAILS_REQUEST,payload:productId});
    try{
        const {data}=await Axios.get(`https://amazon-cloone.herokuapp.com/api/products/${productId}`)
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data});
        // console.log(data);
    }catch(error){
        dispatch({type:PRODUCT_DETAILS_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}