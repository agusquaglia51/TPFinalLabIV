import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AddResourceComponent } from "./components/add-service/add-service.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { appRoutes } from "./app.routes";

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    CommonModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export { appRoutes };
