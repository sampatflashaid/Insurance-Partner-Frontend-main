import logo from '../../assets/logo.png';
import axios from 'axios';
import {
  base_url,
  issueDate,
  expiryDate,
  rezor_pay_live,
  payment_route,
} from './Constants';
import toast from 'react-hot-toast';
import { send_docs } from '../Api-call';
import { trackInsurancePartnerWebEngageEvent } from './WebEngageUtils';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const handlePayment = async (
  data,
  _data,
  navigate,
  updateUserPut,
  setInProcess
) => {
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  setInProcess(false);
  if (!res) {
    toast.error('Razorpay SDK failed to load. Are you online?');
    return false;
  }
  const options = {
    key: import.meta.env.VITE_RZP || rezor_pay_live,
    currency: data.currency,
    amount: Number(data.amount) * 100,
    order_id: data.id,
    name: 'Flashaid',
    image: logo,
    id: data.id,
    handler: function (response) {
      if (
        typeof response.razorpay_payment_id === 'undefined' ||
        response.razorpay_payment_id < 1
      ) {
        toast.error('Something is wrong !!');
        setInProcess(false);
      } else {
        toast.success('Payment success !!', { duration: 3000 });
        // set payment status in db
        const { id, plan, products, Insurance, TPA, totalMembers, boughtPlan } =
          _data;

        const payment_details = {
          id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          amount_paid: data.amount / 100,
          payment_status: 'paid',
        };
        const newPlanData = {
          ...boughtPlan.data_to_save,
          payment_details,
        };
        const userPlan = {
          plan,
          issueDate,
          expiryDate,
        };
        const FA = {
          products,
          Insurance,
          TPA,
        };
        const status = 'approved';
        const key = newPlanData.plan.product;
        updateUserPut(
          { newPlanData, key, plan: userPlan, FA, status },
          {
            onSuccess: (data) => {
              if (totalMembers > 1) {
                navigate('/orthersform', {
                  state: { total: totalMembers, id, boughtPlan },
                });
              } else {
                send_docs({ boughtPlan });
                navigate('/confirm');
              }
            },
          }
        );
      }
    },
    prefill: {
      contact: _data.contact,
      email: _data.email,
    },
  };
  const _window = window;
  const paymentObject = new _window.Razorpay(options);
  paymentObject.open();
};

export const generateOrder = async (
  _data,
  navigate,
  updateUserPut,
  setInProcess
) => {
  const url = `${base_url}/payment/${payment_route}`;

  axios
    .post(url, _data, { withCredentials: true })
    .then(async (res) => {
      await handlePayment(
        res.data.data,
        _data,
        navigate,
        updateUserPut,
        setInProcess
      );
      trackInsurancePartnerWebEngageEvent("payment data",_data)
    })
    .catch((error) => {
      const err = error.response.data?.message || error.message || error;
      toast.error(err);
      console.log(error);
    });
};
