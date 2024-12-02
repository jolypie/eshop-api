import { Outlet } from "react-router-dom";
import NavbarPanel from "./NavbarPanel";
import { Provider } from "react-redux";
import store from "../store/store";

function RootLayout() {
  return (
    <div>
      <Provider store={store}>
        <NavbarPanel />
        <main className="d-flex justify-content-center">
          <Outlet />
        </main>
      </Provider>
    </div>
  );
}

export default RootLayout;
