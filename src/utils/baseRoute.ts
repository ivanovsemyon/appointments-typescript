const baseRoute = (route: string) =>
  `${process.env.REACT_APP_BASE_URL}${route}`;

export default baseRoute;
