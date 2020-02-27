import MasterDataElementType from "./MasterDataElementType";
import SupplierType from "./SupplierType";

export default interface CertificateType {
  id: string;
  supplierId: number;
  supplier?: SupplierType;
  certificateTypeId: number;
  certificateType?: MasterDataElementType;
  validFrom: string;
  validTo: string;
}