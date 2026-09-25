import { useContext, useEffect } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ activeModal, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (activeModal === "edit-profile") {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [activeModal, currentUser, setValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser(values);
  };

  return (
    <ModalWithForm
      modalName="edit-profile"
      title="Change profile data"
      buttonText="Save changes"
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={values.name.trim() !== ""}
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
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
