import { Routes } from "@angular/router";
import { HomePageComponent } from "./home/home-page/home-page.component";
import { FormComponent } from "./login/form/form.component";
import { InfoComponent } from "./complet_user/info.component";
import { AddServiceComponent } from "./components/add-service/add-service.component";

const routes: Routes = [
  { path: "login", component: FormComponent },
  { path: "complete_user/:id", component: InfoComponent },
  { path: "", component: HomePageComponent },
];

export const appRoutes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "login", component: FormComponent },
];
