import React from 'react';
import { useAuth, useFirestore } from '../../contexts/firebase';
import styles from './DetailReviews.module.scss';
import Button from '../Button/Button';
import Input from '../Input/Input';

const DetailReviews = ({ reviews, movieRef }) => {
  const { addReview } = useFirestore(); 
  const {currentUser} = useAuth();
  
  const handleOnSubmit = (ev) => {
    ev.preventDefault();
    const form = document.getElementById('review-form');
    const data = {
      title: form.title.value,
      review: form.review.value,
      rating: form.rating.value, 
      createdAt: Date.now(),
      user: currentUser.email
    }
    addReview(movieRef, data);
    form.title.value = '';
    form.review.value = '';
    form.rating.value = ''; 
  }

  return (
    <div className={styles.form_container_detail}>
      <h2>Reviews</h2>
      <ul className={styles.reviews_list}>
          {!!reviews && reviews.map(review => {
            return (
              <li key={review.uid}>
                <div className={styles.reviews_list_flex}>
                  <span className={styles.title}>{review.title}</span>
                  <div className={styles.rating__flex}>
                    <span className={styles.rating}>{review.rating * 2}</span>
                    <span>Score</span>
                  </div>
                </div>
                <p>{review.review}</p>
                <span className={styles.user}>{review.user}</span>
              </li>
            )
          })}
      </ul>

      {reviews.length > 0 ?
        <form className={styles.form} id="review-form" onSubmit={(ev) => handleOnSubmit(ev)}>
          <div className={styles.title_flex}>
            <div>
              <label htmlFor="title">Title: </label>
              <Input componentType='secondary' type="text" name="title" id="title"/>
            </div>
            <div>
              <label htmlFor="rating" >Rating </label>
              <select name="rating" id="rating">

                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className={styles.textarea}>
            <label htmlFor="review">Review</label>
            <textarea id="review" name="review" rows="4"></textarea>
          </div>
          <Button>Add Review</Button>
        </form>
        :
        ''
      }
    </div>
  )
}

export default DetailReviews
