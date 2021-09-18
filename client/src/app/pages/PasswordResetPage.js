import styles from './AuthForms.module.scss';
import React, { useState } from "react";
import * as Routes from '../routes';
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/firebase/auth.context';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';

const PasswordReset = () => {
  const [passwordResetForm, setpasswordResetForm] = useState({ txtEmail: '' });
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);

  const { sendPasswordResetEmail } = useAuth();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    await sendPasswordResetEmail(passwordResetForm.txtEmail);
    setEmailHasBeenSent(true);
  }

  const handleInputChange = async (ev) => {
    setpasswordResetForm({
      ...passwordResetForm,
      [ev.target.name]: ev.target.value
    })
  };

  return (
    <div className={styles.container}>
      <div className={styles.authForm}>
        <div>

          <form onSubmit={(ev) => handleSubmit(ev)}>
            <h1 className={styles.authForm__title}>Change password</h1>

            {emailHasBeenSent && (
            <div className={styles.authForm__info}>An email has been sent to you!</div>
            )}

            <label htmlFor="userEmail">Email</label>
            <Input type="email" componentType='primary' id="txtEmail" name="txtEmail"  aria-describedby="emailHelp" onChange={handleInputChange} value={passwordResetForm.txtEmail} />

            <Button>Send me a reset link</Button>
          </form>

          <div className={styles.authForm__routeLink}>
            <Link to={Routes.AUTH_SIGN_IN}>back to sign in page</Link>
          </div>

        </div>
      </div>
    </div> 
  );
};
export default PasswordReset;