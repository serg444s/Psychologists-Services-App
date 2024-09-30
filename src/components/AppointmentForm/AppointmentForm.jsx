import Modal from 'react-modal';
import css from './AppointmentForm.module.css';
import IconSvg from '../IconSvg/IconSvg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

Modal.setAppElement('#root');

const appointmentFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^\+?[0-9\s-]*$/, 'Please enter correct number'),
  message: yup.string().optional(),
  time: yup.string().required('Time is required'),
});

const AppointmentForm = ({ name, photo, modalIsOpen, closeModal }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '40px',
      maxWidth: '505px',
      borderRadius: '30px',
      position: 'relative',
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(appointmentFormSchema),
  });

  const onSubmit = data => {
    console.log(data);
    window.location.reload();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className={css.container}>
        <h2 className={css.name}>Make an appointment with a psychologists</h2>
        <p className={css.text}>
          You are on the verge of changing your life for the better. Fill out
          the short form below to book your personal appointment with a
          professional psychologist. We guarantee confidentiality and respect
          for your privacy.
        </p>

        <button onClick={closeModal} className={css.btnclose}>
          <IconSvg iconName={'close'} width={26} height={26} />
        </button>
      </div>

      <div className={css.wrap}>
        <img src={photo} alt={name} className={css.img} />
        <div>
          <p className={css.psychologists}>Your psychologists</p>
          <p className={css.psychologists - name}>{name}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div>
          <input
            {...register('name')}
            placeholder="Name"
            className={css.input}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className={css.div}>
          <input
            {...register('phone')}
            placeholder="+380"
            className={css.input}
          />
          {errors.name && <p>{errors.phone.message}</p>}
          <input
            {...register('time')}
            placeholder="00:00"
            className={css.input}
            type="time"
          />
          {errors.name && <p>{errors.time.message}</p>}
        </div>
        <div>
          <input
            {...register('email')}
            className={css.input}
            placeholder="Email"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input
            {...register('message')}
            placeholder="Comment"
            className={css.input}
          />
          {errors.message && <p>{errors.message.message}</p>}
        </div>
        <button type="submit" className={css.btn}>
          Send
        </button>
      </form>
    </Modal>
  );
};

export default AppointmentForm;
