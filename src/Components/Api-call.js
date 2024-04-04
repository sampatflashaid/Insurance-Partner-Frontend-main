import axios from 'axios';
import { base_url } from '../Components/Utils/Constants';
import toast from 'react-hot-toast';
import { encryptData } from './Utils/Encrypt';

export async function UserLogin({ contact, setMsg }) {
  try {
    const URL = base_url + '/user/login';
    const response = await axios.post(
      URL,
      { contact },
      { withCredentials: true }
    );
    const user = response.data.user;
    return user || false;
  } catch (error) {
    const err = error.response?.data?.message || error.message || error;

    toast(err, {
      style: { color: 'green', fontFamily: 'Poppins', textAlign: 'center' },
    });
    throw err;
  }
}

export async function UserSignUp(inputData) {
  try {
    const URL = base_url + '/user/signup';
    const response = await axios.post(
      URL,
      { ...inputData },
      { withCredentials: true }
    );
    const user = response.data.user;
    return user || false;
  } catch (error) {
    const err = error.response?.data?.message || error.message || error;
    console.error(err);
    throw err; // Re-throw the error to be caught by the calling function or react-query
  }
}

export async function logout() {
  try {
    const URL = base_url + '/user/logout';
    await axios.get(URL, { withCredentials: true });
    sessionStorage.clear();
    return true;
  } catch (error) {
    const err = error.response?.data?.message || error.message || error;
    console.error(err);
    throw err; // Re-throw the error to be caught by the calling function or react-query
  }
}

export async function getPlans(id) {
  try {
    const URL = base_url + '/plan/get_plans';
    const { data } = await axios.get(URL, {
      params: { id },
      withCredentials: true,
    });
    const { flash_aid_plans } = data;
    return flash_aid_plans || false;
  } catch (error) {
    const err = error.response.data?.message || error.message || error;
    toast.error(err);
    console.log(error);
    setTimeout(() => {
      sessionStorage.clear();
    }, 5000);
    return false;
  }
}

export async function updateUserPatch(obj) {
  try {
    const URL = base_url + '/user';
    const { data } = await axios.patch(URL, obj, { withCredentials: true });
    const { user } = data;

    // SET IN LOCAL STORAGE AFTER ENCRYPTION
    encryptData('user', user);

    return user || false;
  } catch (error) {
    const err = error.response.data?.message || error.message || error;
    toast.error(err);
    console.log(error);
    return false;
  }
}

export async function updateUserPut(userObj) {
  try {
    const URL = base_url + '/user';
    const { data } = await axios.put(URL, userObj, { withCredentials: true });
    const { user } = data;

    // SET IN LOCAL STORAGE AFTER ENCRYPTION
    encryptData('user', user);

    return user || false;
  } catch (error) {
    const err = error.response.data?.message || error.message || error;
    toast.error(err);
    console.log(error);
    return false;
  }
}

export async function send_docs(boughtPlan) {
  try {
    const URL = base_url + '/plan/send_docs';
    const { data } = await axios.post(
      URL,
      { ...boughtPlan },
      { withCredentials: true }
    );
    console.log(data);
  } catch (error) {
    const err = error.response.data?.message || error.message || error;
    toast.error(err);
    console.log(error);
    return false;
  }
}

export async function getPlanDetails() {
  try {
    const URL = base_url + '/plan/getplandetails';
    const { data } = await axios.get(URL, { withCredentials: true });

    return data.plans || [];
  } catch (error) {
    const err = error.response.data?.message || error.message || error;
    toast.error(err);
    console.log(error);
    return false;
  }
}
