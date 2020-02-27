import React from "react";
import { renderRadioButton } from "../../../../common/componentUtils";
import SupplierType from "../../../common/types/SupplierType";
import renderTable from "../../overview/Table";
import "../../overview/Table.scss";

export function renderTitle(title: string) {
  return <div className="title-bar">▼ {title}</div>;
}

interface SupplierTableProps {
  data: SupplierType[];
  onClick: (supplier: SupplierType) => void
}

export default class SupplierTable extends React.Component<SupplierTableProps> {
  renderRow = (item: SupplierType) => {
    return (
      <tr key={item.id} className="body">
        <td>{renderRadioButton(item, "suppliers", this.props.onClick)}</td>
        <td>{item.name}</td>
        <td>{item.index}</td>
        <td>{item.city}</td>
      </tr>
    );
  }

  render() {
    return (
      <div className="supplier-table-container">
        {renderTable(
          this.props.data,
          ["", "Supplier name", "Supplier index", "City"],
          this.renderRow
        )}
      </div>
    );
  }
}

export function renderHeading(title: string) {
  return (
    <div className="heading-bar">
      Search for suppliers
      {/* {renderButton("🞬", "heading-button", () => {})} */}
    </div>
  );
}

interface SearchSectionProps {
  title: string;
}

export class SearchSection extends React.Component<SearchSectionProps> {
  render() {
    return (
      <div className="section">
        {renderTitle(this.props.title)}
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}
