import {
  DataProviderChildFn,
  SetCertificationResults,
} from "types";
import { useCallback, useEffect, useState } from "react";
import useVSCodeCertification from "./vscode-utils/use-vscode-certification.ts";
import { sendMessageVscode } from "./vscode-utils/send-message-vscode.ts";

export default function VSCodeDataProvider({ children }: { children: DataProviderChildFn }) {
  return children(useVSCodeDataProvider());
}

function useVSCodeDataProvider() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [validation, dispatch] = useVSCodeCertification();

  const onMessageReceived = useCallback(
    ({ origin, data }: MessageEvent<SetCertificationResults>) => {
      console.log("data")
      console.log(origin)
      //origin is vsCode or intelliiJ
      if (origin.startsWith("vscode-webview://")) {
        const { command, payload } = data;
        if (command === "setValidationResults") {
          dispatch({ type: "replace", payload });
          setLoading(false);
        } else if (command === "throwExtensionError") {
          const extensionError = new Error();
          setError(extensionError);
          setLoading(false);
        }
      }
    },
    [dispatch],
  );

  useEffect(() => {
    window.addEventListener("message", onMessageReceived);

    return () => {
      window.removeEventListener("message", onMessageReceived);
    };
  }, [onMessageReceived]);

  useEffect(() => {
    sendMessageVscode("onProjectLoaded", {});
  }, []);

  return {
    validation,
    loading,
    error
  };
}

