import React, { PropsWithChildren } from "react";
import Select from "../views/common/select/Select";
import DropdownButton from "../views/common/dropdown/DropdownMenu";
import SupplierType from '../views/common/types/SupplierType';

export function renderInput<T, U extends keyof T & string>(
  label: string,
  model: T,
  name: U,
  type: string,
  onchange: (name: U, value: string) => void
) {
  function handlechange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    onchange(name, event.target.value);
  }

  return (
    <div className="form-element">
      <div>{label}</div>
      <input
        className="intput"
        type={type}
        name={name}
        value={String(model[name] || "")}
        onChange={handlechange}
      />
    </div>
  );
}

export function renderSelect<T, U extends keyof T & string>(
  label: string,
  model: T,
  name: U,
  serviceName: string,
  onChange: (name: U, value: string) => void
) {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    onChange(name, event.target.value);
  }

  return (
    <div className="form-element">
      <span>{label}</span>
      <Select
        name={name}
        serviceName={serviceName}
        value={String(model[name] || "")}
        onChange={handleChange}
      />
    </div>
  );
}

export function renderButton(
  label: string,
  buttonClass: string,
  onClick: () => void
) {
  return (
    <input
      type="button"
      value={label}
      onClick={onClick}
      className={buttonClass}
    />
  );
}

export function renderRadioButton(
  supplier: SupplierType,
  name: string,
  onClick: (supplier: SupplierType) => void
) {
  return (
    <input
      type="radio"
      name={name}
      onClick={() => onClick(supplier)}
    />
  );
}

export function renderFilePicker() {
  return (
    <div>
      <input type="file" id="file" className="inputfile"></input>
      <label className="button upload-button">Upload</label>
      <div className="pdfframe"></div>
    </div>
  );
}

export function Row<P>(props: PropsWithChildren<{}>) {
  return <div className="row">{props.children}</div>;
}
export function Column(props: PropsWithChildren<{}>) {
  return <div className="column">{props.children}</div>;
}

export function renderDropdownButton(id: string) {
  return <DropdownButton id={id} />;
}
