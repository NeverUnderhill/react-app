import { RouteComponentProps } from 'react-router';
import certificateService from '../../common/service/CertificateService';
import CertificateType from '../../common/types/CertificateType';
import CertificateFormComponent from './CertificateFormComponent';
import './certificateForm.css';

interface UrlParamsType {
  id: string;
}

export default class ManageCertificateComponent extends CertificateFormComponent<UrlParamsType> {
  constructor(props: RouteComponentProps<UrlParamsType>) {
    super(props);
    const {id} = props.match.params; 
    certificateService.fetchCertificateById(id).then((data: CertificateType) => {
      this.setState({certificate: data});
    });
  }
}