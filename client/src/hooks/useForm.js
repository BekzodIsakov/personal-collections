import { useState } from "react";

export default function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  function handleChange(event) {
    const { name, value } = event.target;
    console.log({ name, value });
    setValues({ ...values, [name]: value });
  }

  function resetForm() {
    setValues(initialValues);
  }

  return [values, handleChange, resetForm];
}
