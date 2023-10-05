import { MSANoseFrontendIFace, MSANoseFrontendControllerIface} from './webview';

export class MSANoseController implements MSANoseFrontendControllerIface {
     
    frontend?: MSANoseFrontendIFace; // back reference to webview

    setCertificationFrontend(frontend: MSANoseFrontendIFace): void {
        this.frontend = frontend;
    }
}