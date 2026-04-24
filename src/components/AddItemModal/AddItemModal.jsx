import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ activeModal, onAddItem, onClose }) => {
  const defaultValues = { name: "", imageUrl: "", weatherType: "" };
  const { values, handleChange, setValues } = useForm(defaultValues);

  function resetForm() {
    setValues(defaultValues);
  }

  const isFormValid =
    values.name.trim() !== "" &&
    values.imageUrl.trim() !== "" &&
    values.weatherType !== "";

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddItem(values)
      .then(() => {
        resetForm();
      })
      .catch(console.error);
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            value="hot"
            checked={values.weatherType === "hot"}
            onChange={handleChange}
            required
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            value="warm"
            checked={values.weatherType === "warm"}
            onChange={handleChange}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            value="cold"
            checked={values.weatherType === "cold"}
            onChange={handleChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
