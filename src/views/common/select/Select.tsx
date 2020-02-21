import React from "react";
import masterDataService from "../service/MasterDataService";
import MasterDataElementType from "../types/MasterDataElementType";

interface SelectProps {
  name: string;
  serviceName: string;
  placeholder?: string;
  value: number | string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default class Select extends React.Component<SelectProps> {
  state = {
    items: [],
    selectedItem: null
  };

  constructor(props: SelectProps) {
    super(props);
    masterDataService.fetchData(props.serviceName).then(data => this.updateStateAction(data));
  }

  updateStateAction = (data: MasterDataElementType) => this.setState({ items: data });

  render() {
    let options = this.state.items.map((data: MasterDataElementType) => (
      <option value={data.id} key={data.id}>
        {data.value}
      </option>
    ));

    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
        >
          <option value={"Select your option"}>{"Select your option"}</option>
          {options}
        </select>
      </div>
    );
  }
}