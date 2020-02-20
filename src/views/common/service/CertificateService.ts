import CertificateType from "../types/CertificateType";
// import MasterDataElementType from "../types/MasterDataElementType";

/**
 * Service class for interacting with certificate data REST API.
 */
class CertificateService {
  CERTIFICATE_SERVICE = "http://localhost:3001/certificates/";
  CERTIFICATE_QUERY =  "?_expand=supplier&_expand=certificateType";

  /**
   * Retrieves equipment item by it's identifier.
   * @param {String} id this is the identifier of a certificate item
   * @return {[Promise]} certificate item
   */
  fetchCertificateById(id: string) {
    return fetch(this.CERTIFICATE_SERVICE + id + this.CERTIFICATE_QUERY).then(data => data.json());
  }

  /**
   * Retrieves all equipment items.
   * @return {[Promise]} equipment items
   */
  fetchCertificates() {
    return fetch(this.CERTIFICATE_SERVICE + this.CERTIFICATE_QUERY).then(data => data.json());
  }

  /**
   * Saves or updates certificate items.
   * @param {[certificate]} given certificate
   * @return {[Promise]}
   */
  saveCertificateItem(certificate: CertificateType) {
    return fetch(this.CERTIFICATE_SERVICE + "/" + (certificate.id || ""), {
      method: certificate.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
      headers: { "content-type": "application/json" },
      body: JSON.stringify(certificate)
    });
  }

  /**
   * Deletes certificate items.
   * @param {[certificate]} given certificate
   * @return {[Promise]}
   */
  deleteCertificateItem(certId: string) {
    return fetch(this.CERTIFICATE_SERVICE + "/" + certId, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    });
  }
}

/*
  FIXME: Should we transform it into following according to our discussion or? :
  class EquipmentServiceType {}
  const equipmentService = new EquipmentServiceType();
  export default equipmentService;
 */

const certificateService = new CertificateService();
export default certificateService;