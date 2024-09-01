/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert'
const stripe = Stripe("")

export const bookTour = async  (tourId) => {
try{
 //get checkout session

 const session = await axios(
    `http://127.0.0.1:3000/app/v1/bookings/checkout-sesion/${tourId}`
 )

 //crate checkout form
 await stripe.redirectToCheckout({
    sessionId: session.data.session.id
 })
 } catch(err) {
    showAlert('error',err);
 }
}
