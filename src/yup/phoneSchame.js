
import * as yup from "yup";
import {
  parsePhoneNumberFromString,
  getCountryCallingCode,
} from "libphonenumber-js";

yup.addMethod(yup.string, "phone", function (countryCode, message) {
  return this.test("phone", message, function (value) {
    const { path, createError } = this;

    if (!value || value.trim() === "") {
      return true;
    }

    try {

      const phoneNumber = parsePhoneNumberFromString(value, countryCode);

      if (!phoneNumber) {
        return createError({
          path,
          message: message || "Invalid phone number format",
        });
      }

      const expectedCountryCode = `+${getCountryCallingCode(countryCode)}`;
      if (
        String(phoneNumber.number).startsWith(expectedCountryCode) &&
        phoneNumber.isValid()
      ) {
        return true;
      }
    } catch (e) {
      return createError({ path, message: message || "Invalid phone number" });
    }

    return createError({ path, message: message || "Invalid phone number" });
  });
});

export const validateNumber = (countryCode) => {
  return yup.object().shape({
    number: yup
      .string()
      .phone(countryCode, "Phone number must be valid") 
      .required("Phone number is required"), 
  });
};
