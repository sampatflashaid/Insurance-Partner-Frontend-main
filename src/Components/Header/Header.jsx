import classes from './Header.module.css';
import womenImg from '../../assets/women.jpg';
import logo from '../../assets/flashAid_logo.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useLogOut from '../ReactQuery/useLogOut';
import Spinner from '../../UI/Spinner';
import { insurancePartnerLogout } from '../Utils/WebEngageUtils';

function Header({ user, setUser }) {
  const { isLoading, logout } = useLogOut();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogOut(e) {
    e.preventDefault();
    setUser(false);
    logout();
    insurancePartnerLogout();
  }

  if (isLoading) return <Spinner msg='Login out!! Please wait...' />;
  return (
    <div className={classes.topView}>
      <div className={classes.logoHeading}>
        <img
          className={classes.flashAidLogo}
          onClick={() => (window.location.href = 'https://flashaid.in/')}
          src={logo}
          alt='flashAid logo'
        />
      </div>

      <div className={classes.callCont}>
        {user ? (
          <div className={classes.navItems}>
            <b
              className={location.pathname === '/plans' ? classes.active : ''}
              onClick={() => navigate('/plans')}
            >
              View Plans
            </b>
            <b
              className={
                location.pathname === '/plandetails' ? classes.active : ''
              }
              onClick={() => navigate('/plandetails')}
            >
              My Plans
            </b>
            <b style={{ color: 'black' }}>
              Hi! {user.firstname || user.fullname} &nbsp;
            </b>
            <b
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={handleLogOut}
            >
              Logout
            </b>
          </div>
        ) : (
          <div>
            <Link className={classes.login} to='/'>
              Login
            </Link>
          </div>
        )}
      </div>

      <hr className={classes.line} />

      <div>
        <img src={womenImg} className={classes.image} alt='women' />
      </div>
    </div>
  );
}

export default Header;
