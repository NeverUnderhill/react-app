import React from "react";
import masterDataService from "../service/masterDataService";

export default class Select extends React.Component {
  state = {
    items: [],
    selectedItem: null
  };

  constructor(params) {
    super(params);
    masterDataService.fetchData(this.props.name).then(data => this.updateStateAction(data));
  }

  updateStateAction = (data) => this.setState({ items: data });

  render() {
    let options = this.state.items.map(data => (
      <option value={data.id} key={data.id}>
        {data.value}
      </option>
    ));

    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.handleChange}
        >
          <option value={this.props.placeholder}>{this.props.placeholder}</option>
          {options}
        </select>
      </div>
    );
  }
}