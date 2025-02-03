import React from "react";
import { Form, Link, useSubmit } from "react-router-dom";
import { Wrapper } from "../assets/wrappers/DashboardFormPage";
import FormRow from "./FormRow";
import { useAllJobsContext } from "../pages/AllJobs";

const SearchContainer = () => {
  const { searchValue } = useAllJobsContext();
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout = 2000;
    return (e) => {
      const form = e.target.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, timeout);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={searchValue || ""}
            required={false}
            onChange={debounce((form) => submit(form))}
          ></FormRow>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
