import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ activeModal, onRegister, onClose }) => {
  const defaultValues = { name: "", avatar: "", email: "", password: "" };
  const { values, handleChange, setValues } = useForm(defaultValues);

  const isFormValid =
    values.name.trim() !== "" &&
    values.avatar.trim() !== "" &&
    values.email.trim() !== "" &&
    values.password.trim() !== "";

  function handleSubmit(evt) {
    evt.preventDefault();

    onRegister(values)
      .then(() => setValues(defaultValues))
      .catch(console.error);
  }

  return (
    <ModalWithForm
      modalName="register"
      title="Sign up"
      buttonText="Sign up"
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          id="name"
          type="text"
          className="modal__input"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <input
          id="avatar"
          type="url"
          className="modal__input"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="email" className="modal__label">
        Email
        <input
          id="email"
          type="email"
          className="modal__input"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="password" className="modal__label">
        Password
        <input
          id="password"
          type="password"
          className="modal__input"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
