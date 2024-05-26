import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

const Routes: React.FC = () => {
  const auth = true;

  return auth ? <AppRoutes /> : <AuthRoutes />;
};

export { Routes };
