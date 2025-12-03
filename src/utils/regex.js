const persianNameRegex = /^[آئءأإؤابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی\u200C\s]+$/;

const personnelCodeRegex = /^\d{7}$/;

const insuranceCodeRegex = /^\d{10}$/;

const passwordCodeRegex =
  /^(?=[^A-Z]*[A-Z][^A-Z]*$)(?=[^a-z]*[a-z][^a-z]*$).{8}$/;

const phoneNumberRegex =
  /^(?:09(?:1[0-9]|2[0-9]|3[0-9]|9[0-9])\d{7}|\+989(?:1[0-9]|2[0-9]|3[0-9]|9[0-9])\d{7}|00989(?:1[0-9]|2[0-9]|3[0-9]|9[0-9])\d{7})$/;
export {
  persianNameRegex,
  personnelCodeRegex,
  passwordCodeRegex,
  insuranceCodeRegex,
  phoneNumberRegex,
};
