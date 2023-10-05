import * as vscode from 'vscode';

export interface MSANoseFrontendIFace {
    show(pathname: string): void;
    setValidationResults(payload: any): void;
    throwExtensionError(payload: Error): void;
}

export interface MSANoseFrontendControllerIface {
    setCertificationFrontend(frontend: MSANoseFrontendIFace): void;
    onProjectLoaded?(): void; // this is handled in html/iframe
    onFileLoaded?(): void; // this is handled in html/iframe
}

export class MSANoseFrontendWebview implements MSANoseFrontendIFace {
    panel?: vscode.WebviewPanel;

    constructor(private context: vscode.ExtensionContext, private presenter: MSANoseFrontendControllerIface) { }

    show(pathname: string) {
        if (this.panel) {
            if (!this.panel.visible) {
                this.panel.reveal(this.panel.viewColumn);
            }
            return;
        }

        this.panel = vscode.window.createWebviewPanel('msa-nose', 'MSA Nose Microservice', vscode.ViewColumn.Two, {
            enableScripts: true,
            retainContextWhenHidden: true,
        });
        // let url = vscode.workspace.getConfiguration('msa-nose-extension.frontend-url').get<string>('url');
        let url = "http://localhost:3000";
        if (url?.substring(url.length - 1) === "/") {
            url = url.substring(0, url.length - 1);
        }
        this.panel.webview.html = this.getHtml(url! + pathname);

        this.panel.webview.onDidReceiveMessage(
            message => {
                const callback = (this.presenter as any)[message.command];
                if (callback && typeof callback === 'function') {
                    callback(message.payload);
                } else {
                    console.error(`Unknown callback command: ${message.command}`);
                }
            },
            undefined,
            this.context.subscriptions
        );

        this.panel.onDidDispose(() => {
            this.panel = undefined;
        });
    }

    private postCommand(command: string, payload: any) {
        this.panel?.webview.postMessage({
            command,
            payload,
        });
    }

    setValidationResults(payload: any): void {
        this.postCommand('setValidationResults', payload);
    }

    throwExtensionError(payload: Error): void {
        this.postCommand('throwExtensionError', payload);
    }


    private getHtml(url: string) {
        return `
        <!DOCTYPE html>
        <html lang="en">
            <body style="margin: 0px; padding: 0px; overflow: hidden">
                    <div style="position: fixed; height: 100%; width: 100%">
                        <iframe
                        id="iframe"
                        src="${url}"
                        frameborder="0"
                        style="overflow: hidden; height: 100%; width: 100%"
                        height="100%"
                        width="100%"
                        ></iframe>
                    </div>
                    <script>
                        const vscode = acquireVsCodeApi();
                        const iframe = document.getElementById('iframe');
            
                        window.addEventListener('message', event => {
                            console.log('message on webview.html', event.source == iframe.contentWindow, event.data);
                            if(event.source == iframe.contentWindow) {
                                if(event.data.command === 'onProjectLoaded') {
                                    onProjectLoaded();
                                } else if(event.data.command === 'onFileLoaded') {
                                    onFileLoaded();
                                } else {
                                    vscode.postMessage(event.data);
                                }
                            } else {
                                sendMessageToIframe(event.data);
                            }
                        });
            
                        let iframeLoaded = false;
                        let iframeQueue = [];
                        function sendMessageToIframe(message) {
                            if(!iframeLoaded) {
                                console.log('iframe not ready yet, queueing message', message);
                                iframeQueue.push(message);
                            } else {
                                iframe.contentWindow.postMessage(message, '*');
                            }
                        }
                        const onProjectLoaded = () => {
                            console.log('onProjectLoaded: sending queued messages', iframeQueue);
                            iframeLoaded = true;
                            iframeQueue.forEach(message => sendMessageToIframe(message));
                            iframeQueue = [];
                        };
                        const onFileLoaded = () => {
                            console.log('onFileLoaded: sending queued messages', iframeQueue);
                            iframeLoaded = true;
                            iframeQueue.forEach(message => sendMessageToIframe(message));
                            iframeQueue = [];
                        };
                    </script>
            </body>
        </html>`;
    }
}