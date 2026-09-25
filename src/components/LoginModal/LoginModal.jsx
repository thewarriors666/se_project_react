import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ activeModal, onLogin, onClose }) => {
  const defaultValues = { email: "", password: "" };
  const { values, handleChange, setValues } = useForm(defaultValues);

  const isFormValid =
    values.email.trim() !== "" && values.password.trim() !== "";

  function handleSubmit(evt) {
    evt.preventDefault();

    onLogin(values)
      .then(() => setValues(defaultValues))
      .catch(console.error);
  }

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
