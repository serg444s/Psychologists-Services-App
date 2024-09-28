import Modal from "react-modal";
import { useForm } from "react-hook-form";
import IconSvg from "../IconSvg/IconSvg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./LogInModal.module.css";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "40px",
    width: "565px",
    height: "509px",
    borderRadius: "30px",
    position: "relative",
  },
};

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

Modal.setAppElement("#root");

const LogInModal = ({ modalIsOpen, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log(data); // Дії при відправці форми
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        console.log(user);
        closeModal();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className={css.container}>
        <h2 className={css.name}>Log In</h2>
        <p className={css.text}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for a psychologist.
        </p>

        <button onClick={closeModal} className={css.btnclose}>
          <IconSvg iconName={"close"} width={26} height={26} />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div>
          <input {...register("email")} className={css.input} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input
            type="password"
            {...register("password")}
            className={css.input}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" className={css.btn}>
          Login
        </button>
      </form>
    </Modal>
  );
};

export default LogInModal;
