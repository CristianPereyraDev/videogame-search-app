// eslint-disable-next-line
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexPass = new RegExp("[0-9]");

// userData es un objeto donde cada propiedad corresponde con un input del form.
export function validateLoginForm(userData) {
  const errors = {};
  if (!regexEmail.test(userData.username))
    errors.username = "El nombre debe ser un email válido";
  if (!userData.username) errors.username = "El nombre es obligatorio";
  if (userData.username > 35) errors.username = "Máximo 35 caracteres";
  if (!regexPass.test(userData.password))
    errors.password = "Al menos un número!";
  if (userData.password.length < 6 || userData.password.length > 10)
    errors.password = "Entre 6 y 10 caracteres!";

  return errors;
}
