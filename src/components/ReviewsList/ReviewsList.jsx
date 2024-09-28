import { useState } from "react";
import ReviewItem from "../ReviewItem/ReviewItem";
import css from "./ReviewsList.module.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

const ReviewList = ({ reviews, name, photo }) => {
  const [showForm, setShowForm] = useState(false);

  function makeAppointment() {
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
  }

  return (
    <>
      <ul className={css.list}>
        {reviews.map((review, index) => {
          return (
            <li key={index} className={css.item}>
              <ReviewItem review={review} />
            </li>
          );
        })}
      </ul>
      <button type="button" onClick={makeAppointment} className={css.btn}>
        Make an appointment
      </button>
      <AppointmentForm
        modalIsOpen={showForm}
        closeModal={closeForm}
        name={name}
        photo={photo}
      />
    </>
  );
};

export default ReviewList;
