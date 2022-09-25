import React from "react";
import { AppBar } from "../../components/AppBar";
import { PageHeader } from "../../components/PageHeader";
import { Form } from "./form/Form";

export const Search = () => {
  return (
    <div>
      <AppBar>
        <PageHeader>Search</PageHeader>
      </AppBar>
      <Form />
    </div>
  );
};
