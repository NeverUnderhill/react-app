import MasterDataElementType from "./MasterDataElementType";

export default interface CertificateType {
  id: string;
  supplierId: number;
  supplier?: MasterDataElementType;
  certificateTypeId: number;
  certificateType?: MasterDataElementType;
  validFrom: string;
  validTo: string;
}