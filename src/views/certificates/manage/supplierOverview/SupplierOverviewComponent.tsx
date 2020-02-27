import React from "react";
import { renderInput, renderButton } from "../../../../common/componentUtils";
import SupplierTable, {
  SearchSection,
  renderHeading
} from "./SupplieOverviewHelperComponents";
import SupplierType from "../../../common/types/SupplierType";
import "./searchSupplier.scss";
import MasterDataService from "../../../common/service/MasterDataService";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface SupplierOverviewComponentProps extends RouteComponentProps {
  cancelAction: () => void;
  selectAction: (supplier: SupplierType) => void;
}

interface SupplierOverviewComponentState {
  suppliers: SupplierType[];
  tempFilterCriteria: SupplierType;
  filterCriteria: SupplierType;
  currentSupplier: SupplierType;
}

class SupplierOverviewComponent extends React.Component<
  SupplierOverviewComponentProps,
  SupplierOverviewComponentState
> {
  state = {
    suppliers: [],
    currentSupplier: Object.assign({}),
    tempFilterCriteria: Object.assign({}),
    filterCriteria: Object.assign({})
  };

  constructor(props: SupplierOverviewComponentProps) {
    super(props);
    MasterDataService.fetchData("suppliers").then(result =>
      this.updateStateAction(result)
    );
  }

  private updateStateAction(data: SupplierType[]) {
    this.setState({ suppliers: data });
  }

  handleChange = (
    name: keyof SupplierType,
    value: SupplierType[keyof SupplierType]
  ) => {
    const { tempFilterCriteria: oldModel } = this.state;
    this.setState({ tempFilterCriteria: { ...oldModel, [name]: value } });
  };

  private selectAction = () => {
    this.setState({ filterCriteria: this.state.tempFilterCriteria });
  };

  private resetAction = () => {
    this.setState({ filterCriteria: Object.assign({}) });
  };

  private setCurrentSupplier = (supplier: SupplierType) => {
    this.setState({currentSupplier: supplier});
  }

  private _applyFilterCriteria = (supplier: SupplierType): boolean => {
    const filterCriteria = this.state.filterCriteria;
    const { name, index, city } = supplier;

    let valid =
      this._equals(filterCriteria.name, name) &&
      this._equals(filterCriteria.index, index) &&
      this._equals(filterCriteria.city, city);
    return valid;
  };

  private _equals(val1?: string | number, val2?: string | number) {
    return !val1 ? true : String(val1) === String(val2);
  }

  render() {
    const { tempFilterCriteria: temp } = this.state;
    return (
      <div className="modal">
        <div className="modal-main">
          <div className="search-container">
            {renderHeading("Search for suppliers")}
            <SearchSection title="Search criteria">
              <div className="flexbox">
                {renderInput("Suppler name", temp, "name", "text", this.handleChange)}
                {renderInput("Suppler index", temp, "index", "text", this.handleChange)}
                {renderInput("City", temp, "city", "text", this.handleChange)}
              </div>
                {renderButton("Search", "search-button", this.selectAction)}
                {renderButton("Reset", "reset-button", this.resetAction)}
            </SearchSection>
            <SearchSection title="Supplier list">
              <SupplierTable
                data={this.state.suppliers.filter(this._applyFilterCriteria)}
                onClick={this.setCurrentSupplier}
              />
                {renderButton("Select", "select-button", () => this.props.selectAction(this.state.currentSupplier))}
                {renderButton("Cancel", "reset-button", this.props.cancelAction)}
            </SearchSection>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SupplierOverviewComponent);
