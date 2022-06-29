import { Router } from "./Router";
import { client } from "./lib/apollo";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./contexts/SidebarContext";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <ApolloProvider client={client}>
      <SkeletonTheme baseColor="#121214" highlightColor="#323238">
        <SidebarProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </SidebarProvider>
      </SkeletonTheme>
    </ApolloProvider>
  );
}

export default App;
