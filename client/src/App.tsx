import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { MantineProvider } from "@mantine/core";

function App() {
  const routing = useRoutes(routes);

  return (
    <MantineProvider
      theme={{
        globalStyles: () => ({
          body: { margin: 0 },
        }),
        components: {
          InputWrapper: {
            styles: {
              error: {
                position: "absolute",
              },
            },
          },
        },
      }}
    >
      {routing}
    </MantineProvider>
  );
}

export default App;
