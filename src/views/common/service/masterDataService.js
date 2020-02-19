/**
 * Service class for interacting with master data REST API.
 */
class MasterDataService {
  SERVICE_BASE = "http://localhost:3001/";
  CERTIFICATE_SERVICE = "http://localhost:3001/certificates";
  SUPPLIER_SERVICE = "http://localhost:3001/supplier";
  CERTIFICATE_TYPE_SERVICE = "http://localhost:3001/certificateType";

  /**
   * Retrieves master data for given data type
   * @param {String} dataType this is the identifier of master data type
   * @return {[Promise]} result wrapped inside promise
   */
  fetchData(dataType) {
    return fetch(this.SERVICE_BASE + dataType).then(data => data.json());
  }
}

export default new MasterDataService();