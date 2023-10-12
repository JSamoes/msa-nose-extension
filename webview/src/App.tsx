import { messages } from "./modules.ts";
import { theme } from "./theme.ts";
import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Layout from "./layout.tsx";
import ValidationPage from "./validation-page.tsx";

function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <IntlProvider locale="en" messages={messages.en}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Layout>
            <Switch>
              <Route exact_path="/" component={ValidationPage}></Route>  
            </Switch>
          </Layout>
        </BrowserRouter>
      </IntlProvider>
    </MantineProvider>
  );
}

export default App;
