import VSCodeDataProvider from "./vscode-data-provider.tsx";
import { Center, Loader } from "@mantine/core";
import type { DataProviderChildFn } from "types";
import Feedback from "./feedback.tsx";
import { FormattedMessage } from "react-intl";
import React from "react";
import ValidationTab from "./api-tabs.tsx";

export default function ValidationPage() {

  return (
      <DataProvider>
      {({
        validation,
        loading,
        error
      }) => {
        return (
          <>
            {validation && (
              <ValidationTab
                validation={validation}
              />
            )}

            {loading && (
              <Center w="100%">
                <Loader color="gray" size="lg" data-testid="CertificationPage-Loading" />
              </Center>
            )}

            {error && (
              <Feedback.Error
                fullHeight
                mainText={<FormattedMessage id="certification.network-error" />}
                data-testid="CertificationPage-NetworkError"
              />
            )}
          </>
        );
      }}
    </DataProvider>
  );
}

function DataProvider({ children }: { children: DataProviderChildFn }) {
    return <VSCodeDataProvider>{children}</VSCodeDataProvider>;
  }