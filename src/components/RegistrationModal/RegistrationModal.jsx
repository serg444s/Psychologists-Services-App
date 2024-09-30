import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import IconSvg from '../IconSvg/IconSvg';
import css from './RegistrationModal.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth } from 'components/Authentication/firebase-db';

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

const registrationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

Modal.setAppElement('#root');

const RegistrationModal = ({ modalIsOpen, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = data => {
    createUserWithEmailAndPassword(auth, data.email, data.password, data.name)
      .then(user => {
        closeModal();
      })
      .catch(e => {
        toast.error('Some went wrong');
      });
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className={css.container}>
        <h2 className={css.name}>Registration</h2>
        <p className={css.text}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>

        <button onClick={closeModal} className={css.btnclose}>
          <IconSvg iconName={'close'} width={26} height={26} />
        </button>
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
        <div>
          <input
            {...register('email')}
            placeholder="Email"
            className={css.input}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input
            type="password"
            {...register('password')}
            placeholder="Password"
            className={css.input}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" className={css.btn}>
          Register
        </button>
      </form>
    </Modal>
  );
};

export default RegistrationModal;
