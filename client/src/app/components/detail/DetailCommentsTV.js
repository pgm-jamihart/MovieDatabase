import React from 'react';
import { useAuth, useFirestore } from '../../contexts/firebase';
import styles from './DetailComments.module.scss';
import Button from '../Button/Button';
import Input from '../Input/Input';

const DetailCommentsTV = ({ comments, tvshowRef }) => {
  const { addCommentTvShow } = useFirestore(); 
  const {currentUser} = useAuth();
  
  const handleOnSubmit = (ev) => {
    ev.preventDefault();
    const form = document.getElementById('comment-form');
    const data = {
      title: form.titleComment.value,
      comment: form.comment.value,
      createdAt: Date.now(),
      user: currentUser.email
    }
    addCommentTvShow(tvshowRef, data);
    form.titleComment.value = '';
    form.comment.value = '';
  }

  return (
    <div className={styles.form_container_detail}>
      <h2>Comments</h2>

      <ul className={styles.comments_list}>
      {!!comments && comments.map(comment => {
        return (
          <li key={comment.uid}>
            <span className={styles.title}>{comment.title}</span>
            <p>{comment.comment}</p>
          </li>
        )
      })}
      </ul>

      {comments.length > 0 ?
        <form className={styles.form} id="comment-form" onSubmit={(ev) => handleOnSubmit(ev)}>
          <div>
            <label htmlFor="titleComment">Title</label>
            <Input componentType='secondary' type="text" name="titleComment" id="titleComment"/>
          </div>
          <div className={styles.textarea}>
            <label htmlFor="comment">Comment</label>
            <textarea id="comment" name="comment" rows="4" cols="50"></textarea>
          </div>
          <Button>Add Comment</Button>
        </form>
        :
        ''
      }

    </div>
  )
}

export default DetailCommentsTV
