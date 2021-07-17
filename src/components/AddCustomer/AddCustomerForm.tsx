import { Field, Formik, FormikHelpers } from "formik";
import * as React from "react";
import { ICustomer, Customer } from "../../types/types";
import {
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledAddButton,
  StyledAccordionContainer,
} from "./StyledAddCustomerForm";

type Props = {
  saveCustomer: (customer: ICustomer | any) => void;
};

export const AddCustomerForm: React.FC<Props> = ({ saveCustomer }) => {
  // Move the Add new customer, form it takes up a lot of space on mobile. It could move to another page or be hidden in an accordion.
  const [hidden, setHidden] = React.useState(true);

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dateOfBirth: ""
      }}
      onSubmit={(
        values: Customer,
        { setSubmitting }: FormikHelpers<Customer>
      ) => {
        saveCustomer(values);
        setSubmitting(false);
      }}
    >
      <>
        <StyledAccordionContainer>
          <h3>Show Add Customer Form</h3>
          <button onClick={() => setHidden(!hidden)}>
            {hidden ? "Show" : "Hide"}
          </button>
        </StyledAccordionContainer>
        <StyledForm hidden={hidden}>
          <StyledLabel aria-label="First Name" htmlFor="firstName">First Name</StyledLabel>
          <Field
            as={StyledInput}
            id="firstName"
            name="firstName"
            placeholder="John"
            aria-label="John"
          />

          <StyledLabel aria-label="Last Name" htmlFor="lastName">Last Name</StyledLabel>
          <Field
            as={StyledInput}
            id="lastName"
            name="lastName"
            placeholder="Doe"
            aria-label="Doe"
          />

          <StyledLabel aria-label="Phone Number" htmlFor="phoneNumber">Phone Number</StyledLabel>
          <Field
            as={StyledInput}
            id="phoneNumber"
            name="phoneNumber"
            placeholder="john@acme.com"
            aria-label="john@acme.com"
            type="tel"
          />

          <StyledLabel aria-label="Date of Birth" htmlFor="dateOfBirth">Date of Birth</StyledLabel>
          <Field
            as={StyledInput}
            id="dateOfBirth"
            name="dateOfBirth"
            aria-label="date of birth"
            type="date"
          />

          <StyledAddButton type="submit">Add Customer</StyledAddButton>
        </StyledForm>
      </>
    </Formik>
  );
};
