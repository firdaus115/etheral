import { Route, Routes } from "react-router";
import { allRoutes } from "../routes/route";

const LandingPage = () => {
  return (
    <div>
      <Routes>
        {allRoutes.map(({ path, element: Element, children }) => (
          <Route key={path} path={path} element={<Element />}>
            {children &&
              children.map(({ path: childPath, element: ChildElement }) => (
                <Route
                  key={childPath}
                  path={childPath}
                  element={<ChildElement />}
                />
              ))}
          </Route>
        ))}
      </Routes>
    </div>
  );
};
export default LandingPage;
