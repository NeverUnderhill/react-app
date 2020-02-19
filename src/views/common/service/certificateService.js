/**
 * Service class for interacting with certificate data REST API.
 */
class CertificateService {
  CERTIFICATE_SERVICE = "http://localhost:3001/certificates";
  SUPPLIER_SERVICE = "http://localhost:3001/supplier";
  CERTIFICATE_TYPE_SERVICE = "http://localhost:3001/certificateType";

  /**
   * Retrieves equipment item by it's identifier.
   * @param {String} id this is the identifier of a certificate item
   * @return {[Promise]} certificate item
   */
  fetchCertificateById(id) {
    return fetch(this.CERTIFICATE_SERVICE + "/" + id).then(data => data.json());
  }

  /**
   * Retrieves all equipment items.
   * @return {[Promise]} equipment items
   */
  fetchCertificates() {
    return Promise.all([
      fetch(this.CERTIFICATE_SERVICE).then(data => data.json()),
      fetch(this.SUPPLIER_SERVICE).then(data => data.json()),
      fetch(this.CERTIFICATE_TYPE_SERVICE).then(data => data.json()),
    ]).then(result => {
      let certificate = result[0];
      let suppliers = new Map(result[1].map(i => [i.id.toString(), i.value]));
      let certificateType = new Map(
        result[2].map(i => [i.id.toString(), i.value])
      );

      certificate.map(el => {
        el.supplier = suppliers.get(el["supplier"]);
        el.certificateType = certificateType.get(el["certificateType"]);
        return el;
      });
      return certificate;
    });
  }

  /**
   * Saves or updates certificate items.
   * @param {[certificate]} given certificate
   * @return {[Promise]}
   */
  saveCertificateItem(certificate) {
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
  deleteCertificateItem(certificate) {
    return fetch(this.CERTIFICATE_SERVICE + "/" + certificate.id, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(certificate)
    });
  }
}

/*
  FIXME: Should we transform it into following according to our discussion or? :
  class EquipmentServiceType {}
  const equipmentService = new EquipmentServiceType();
  export default equipmentService;
 */

export default new CertificateService();