import Header from './Components/Header/Header';
import { Routes, Route, useSearchParams, Navigate } from 'react-router-dom';
import HomePage from './Components/Home/HomePage';
import Login from './Components/Pages/Login';
import SignUp from './Components/Pages/SignUp';
import { GlobalStyle } from './UI/StyledTags';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import HealthConsent from './Components/Pages/HealthConsent';
import Rejection from './Components/Pages/Rejection';
import Concern from './Components/Pages/Concern';
import CheckOut from './Components/Pages/CheckOut';
import FormOthers from './UI/FormOthers';
import Confirmation from './Components/Pages/Confirmation';
import { decryptData } from './Components/Utils/Decrypt';
import NoDataFound from './Components/Pages/NoDataFound';
import BoughtPlanDetails from './Components/Pages/BoughtPlanDetails';

function App() {
  const [user, setUser] = useState(decryptData('user'));
  const [searchParams] = useSearchParams();

  const companyName = searchParams.get('utm_source')
    ? `retail_${searchParams.get('utm_source')}`
    : 'Retail - Family';

  const comp_id =
    searchParams.get('utm_content')?.split('_')[2] || '1705134739179';

  if (!sessionStorage.getItem('id')) {
    sessionStorage.setItem('companyName', companyName);
    sessionStorage.setItem('id', comp_id);
  }

  return (
    <>
      <GlobalStyle />
      {user ? (
        <Header user={user.primary_details} setUser={setUser} />
      ) : (
        <Header />
      )}
      <Routes>
        {user ? (
          <>
            <Route path='/plans' element={<HomePage user={user} />} />
            <Route path='/healthconsent' element={<HealthConsent />} />
            <Route path='/rejection' element={<Rejection />} />
            <Route path='/concern' element={<Concern />} />
            <Route path='/checkout' element={<CheckOut />} />
            <Route path='/confirm' element={<Confirmation />} />
            <Route path='/orthersform' element={<FormOthers />} />
            <Route path='/plandetails' element={<BoughtPlanDetails />} />
            <Route path='*' element={<Navigate to='/plans' />} />
          </>
        ) : (
          <>
            <Route path='/' element={<Login setUser={setUser} />} />
            <Route path='/signUp' element={<SignUp setUser={setUser} />} />
            <Route path='*' element={<Navigate to='/' />} />
          </>
        )}
        <Route path='/nodata' element={<NoDataFound />} />
      </Routes>

      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: { duration: 2000 },
          error: { duration: 2000 },
          style: {
            fontSize: '24px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'white',
            color: 'black',
          },
        }}
      />
    </>
  );
}

export default App;
