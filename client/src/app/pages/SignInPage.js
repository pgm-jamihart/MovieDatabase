import styles from './AuthForms.module.scss';
import { useState } from 'react';
import * as Routes from '../routes';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useAuth } from '../contexts/firebase/auth.context';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';

const SignInPage = ({children}) => {
  const [signInForm, setSignInForm] = useState({ txtEmail: '', txtPassword: '' });
  const {currentUser,signInWithEmailAndPassword,signOut} = useAuth();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    await signInWithEmailAndPassword(signInForm.txtEmail, signInForm.txtPassword); 
  }

  if (currentUser) {
    return <Redirect to={Routes.LANDING} />;
  }  

  const handleInputChange = async (ev) => {
    setSignInForm({
      ...signInForm,
      [ev.target.name]: ev.target.value
    })
  };

  return (
    <div className={styles.container}>
      <div className={styles.authForm}>

        {!!currentUser === false &&
        <form onSubmit={(ev) => handleSubmit(ev)}>
          <h1 className={styles.authForm__title}>Sign in</h1>

          <div className="form-group">
            <label className="form-group-signIn-email" htmlFor="txtEmail">Email</label>
            <Input componentType='primary' type="email" id="txtEmail" name="txtEmail"  aria-describedby="emailHelp" onChange={handleInputChange} value={signInForm.txtEmail} />
          </div>

          <div className="form-group">
            <div className={styles.flexContainer__password}>
              <label htmlFor="txtPassword">Password</label>
              <Link to={Routes.AUTH_PASSWORDRESET}>Forgot password</Link>
            </div>
            <Input componentType='primary' type="password" id="txtPassword" name="txtPassword" onChange={handleInputChange} value={signInForm.txtPassword} />
          </div>
          <Button>Sign in</Button>
        </form>
        }

        {!!currentUser === true && 
        <div>
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
        }

        <div className={styles.authForm__routeLink}>
          <Link to={Routes.AUTH_REGISTER}>Register</Link>
        </div>
      </div> 
    </div>
  );
};

export default SignInPage;