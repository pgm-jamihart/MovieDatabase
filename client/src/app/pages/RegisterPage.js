import styles from './AuthForms.module.scss';
import { useState } from 'react';
import * as Routes from '../routes';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useAuth } from '../contexts/firebase/auth.context';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';

const RegisterPage = ({children}) => {
  const {currentUser,createUserWithEmailAndPassword,signOut} = useAuth();
  const [registerForm, setRegisterForm] = useState({ txtEmail: '', txtPassword: '' });

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    await createUserWithEmailAndPassword(registerForm.txtEmail, registerForm.txtPassword);
  }

  if (currentUser) {
    return <Redirect to={Routes.LANDING} />;
  } 

  const handleInputChange = async (ev) => {
    setRegisterForm({
      ...registerForm,
      [ev.target.name]: ev.target.value
    })
  };

  return (
    <div className={styles.container}>
      <div className={styles.authForm}>

        {!!currentUser === false &&
        <form onSubmit={(ev) => handleSubmit(ev)}>
          <h1 className={styles.authForm__title}>Register</h1>

          <div className="form-group">
            <label htmlFor="txtEmail">Email</label>
            <Input type="email" componentType='primary' id="txtEmail" name="txtEmail"  aria-describedby="emailHelp" onChange={handleInputChange} value={registerForm.txtEmail} />
          </div>

          <div className="form-group">
            <label htmlFor="txtPassword">Password</label>
            <Input type="password" componentType='primary' id="txtPassword" name="txtPassword" onChange={handleInputChange} value={registerForm.txtPassword} />
          </div>

          <Button>Register</Button>
        </form>
        }

        {!!currentUser === true && 
        <div>
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
        }

        <div className={styles.authForm__routeLink}>
          <Link to={Routes.AUTH_SIGN_IN}>Sign in</Link>
        </div>
      </div>
    </div> 
  );
};

export default RegisterPage;