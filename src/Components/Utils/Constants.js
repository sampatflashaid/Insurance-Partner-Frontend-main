import moment from 'moment';
const currentDate = moment();

export const issueDate = currentDate.format('YYYY-MM-DD');

export const expiryDate = currentDate
  .clone()
  .add(1, 'years')
  .subtract(1, 'days')
  .format('YYYY-MM-DD');

export const current_date = currentDate.format('YYYY-MM-DD');

export function getCurrentISTime() {
  const now = new Date();
  const options = {
    timeZone: 'Asia/Kolkata',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  return now.toLocaleString('en-US', options);
}

export const PAGE_SIZE = 15;

export const secret_key =
  '38CC6D93641729F96946C9F1FC681DEB712870D2A62EE1BC7F3013B3BD07F48D';

export const skip = ['color', 'total', 'Price'];

// Live

export const base_url =
  import.meta.env.VITE_BASEURL ||
  'https://insurance-partner-backend-7k5qcren2q-uc.a.run.app';

export const rezor_pay_live = 'rzp_live_GCThHMhtxMVS93';

export const payment_route = 'paymentorderinsurance';

// Staging

// export const base_url =
//   import.meta.env.VITE_BASEURL ||
//   'https://insurance-partner-backend-staging-7k5qcren2q-uc.a.run.app';

// export const rezor_pay_live = 'rzp_test_FUbpg3jrLa7mQw';

// export const payment_route = 'testpaymentorderinsurance';
