import * as vscode from 'vscode';
import path = require('path');
import { MSANoseFrontendIFace, MSANoseFrontendWebview } from './webview/webview';
import { MSANoseController } from './webview/MSANoseController';
import { validateMicroservice } from './client/MSANoseAPIClient';

export async function activate(context: vscode.ExtensionContext) {

	let msaNoseFrontend : MSANoseFrontendIFace = new MSANoseFrontendWebview(context, new MSANoseController());	
	
	let disposable = vscode.commands.registerCommand('msa-nose-extension.validate-microservice', () => {
		vscode.window.showInformationMessage('Hello World from Microservice Smell Detector!');

		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: "Validating Microservices",
			cancellable: true,
		}, async (progress, token) => {
			let rootPath = await getRootFolder();
			if (!rootPath || token.isCancellationRequested) {
				return;
			}
            msaNoseFrontend.show('/');
            const result = await validateMicroservice(rootPath);
            msaNoseFrontend.setValidationResults(result);
		});
	});

	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1);
    statusBarItem.text = 'MSA-Nose Extension';
    statusBarItem.tooltip = 'Validate local Microservices';
    statusBarItem.color = '#00ff00';
    statusBarItem.command = {
        command: 'msa-nose-extension.validate-microservice',
        title: 'Validate local Microservices',
        tooltip: 'Validate local Microservices',
    };
    statusBarItem.show();

	context.subscriptions.push(disposable);
	context.subscriptions.push(statusBarItem);
}

// This method is called when your extension is deactivated
export function deactivate() {}

async function getRootFolder() {
	const files = await vscode.workspace.findFiles('**/metadata.yml');
    let root = null;
    if (files.length === 1) {
        root = path.dirname(files[0].fsPath);
    } else {
        const selectedFolder = await vscode.window.showOpenDialog({
            canSelectMany: false,
            canSelectFolders: true,
            canSelectFiles: false,
            openLabel: 'Select Root Folder',
        });
        if (!selectedFolder) {
            return;
        }
        root = selectedFolder[0].fsPath;
    }
    return root;
}

