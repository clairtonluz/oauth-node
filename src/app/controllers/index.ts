import AuthorizationController from "./Authorization.controller";
import HomeController from "./Home.controller";

const controllers = [
  new HomeController(),
  new AuthorizationController(),
];

export default controllers;
