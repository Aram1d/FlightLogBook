import { useRoutes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { routes } from "@config";

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
