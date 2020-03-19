import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";

import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { Box, IconButton, Row, Text } from "@tlon/indigo-react";
import { light } from "@tlon/indigo-tokens";

export default class App extends React.Component {

  render() {
    return (
      <div>
        <ThemeProvider theme={light}>
          <Router>
            <div>
              <Route exact path="/" component={Home} />
            </div>
          </Router>
        </ThemeProvider>
      </div>
    );
  }
}
