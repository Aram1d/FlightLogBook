import { useRoutes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.css";
import "mantine-datatable/styles.layer.css";
import { routes } from "@config";

function App() {
  const routing = useRoutes(routes);

  return (
    <MantineProvider
      theme={{
        components: {
          InputWrapper: {
            styles: {
              error: {
                position: "absolute"
              }
            }
          }
        }
      }}
    >
      <Notifications />
      {routing}
    </MantineProvider>
  );
}

export default App;
