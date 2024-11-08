import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Service } from "../../models/service";
import { LocationAsyncService } from "../../services/location-async.service";
import { CommonModule } from "@angular/common";
import { IDepartment } from "../../interfaces/department";
import { ILocality } from "../../interfaces/locality";
import { IProvince } from "../../interfaces/province";
import { CategoriesService } from "../../services/categorie-async.service";
import { ServicesService } from "../../services/service-async.service";
import { AuthService } from "../../services/auth.services";

@Component({
  selector: "app-add-service",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./add-service.component.html",
  styleUrl: "./add-service.component.css",
})
export class AddServiceComponent implements OnInit {
  provinceList: Array<IProvince> = [];
  departmentList: Array<IDepartment> = [];
  localityList: Array<ILocality> = [];
  mainCategoryList: string[] = [
    "Reparación y mantenimiento",
    "Servicios de limpieza",
    "Servicios de jardinería y paisajismo",
  ];
  subCategoryList: string[] = [
    "Limpieza de hogares",
    "Limpieza de oficinas",
    "Limpieza de ventanas",
    "Limpieza de alfombras",
    "Servicios de desinfección",
  ];

  resourceForm = new FormGroup({
    description: new FormControl("", [
      Validators.required,
      Validators.maxLength(500),
    ]),
    selectedCategory: new FormControl(""),
    selectedSubCategory: new FormControl(""),
    selectedProvince: new FormControl(this.provinceList, [Validators.required]),
    selectedDepartment: new FormControl(this.departmentList, [
      Validators.required,
    ]),
    selectedLocality: new FormControl(this.localityList, [Validators.required]),
  });

  constructor(
    private locationService: LocationAsyncService,
    private categoriesService: CategoriesService,
    private servicesService: ServicesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log(
      "🚀 ~ AddServiceComponent ~ ngOnInit ~ this.authService.isAuthenticated():",
      this.authService.isAuthenticated()
    );
    if (this.authService.isAuthenticated()) {
      this.locationService
        .getAllProvinces()
        .then((response) => {
          this.provinceList = response.provincias;
          // console.log("response.provincias", response.provincias);
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
      this.categoriesService
        .getCategories()
        .then((response) => {
          this.mainCategoryList = response;
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    } else {
      window.location.href = "/login";
    }
  }

  // Cuando cambia la provincia seleccionada, cargar departamentos
  loadDepartments(provinceName: string) {
    this.locationService
      .getAllDepartmentsByProvince(provinceName)
      .then((response) => {
        // console.log("response.departamentos", response.departamentos);
        this.departmentList = [];
        this.departmentList = response.departamentos;
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  }

  loadLocalities(departmentName: string) {
    this.locationService
      .getAllLocalitiesByDepartments(departmentName)
      .then((response) => {
        // console.log("response.localidades", response.localidades);
        this.localityList = response.localidades;
      })
      .catch((error) => {
        console.log("Ocurrio un error:", JSON.stringify(error));
      });
  }

  onSelectedProvince() {
    this.departmentList = []; // Limpia los departamentos al cambiar la provincia
    this.localityList = []; // Limpia las localidades al cambiar la provincia
    const province = new Object(
      this.resourceForm.getRawValue().selectedProvince
    ) as IProvince;
    this.loadDepartments(province.nombre);
  }

  onSelectedDepartment() {
    this.localityList = []; // Limpia las localidades al cambiar el departamento
    const department = new Object(
      this.resourceForm.getRawValue().selectedDepartment
    ) as IDepartment;
    this.loadLocalities(department.nombre);
  }

  onSubmit() {
    let service = new Service();
    const description = this.resourceForm.getRawValue().description as string;
    const mainCategory = this.resourceForm.getRawValue()
      .selectedCategory as string;
    const secondaryCategory = this.resourceForm.getRawValue()
      .selectedSubCategory as string;
    const province = new Object(
      this.resourceForm.getRawValue().selectedProvince
    ) as IProvince;
    const department = new Object(
      this.resourceForm.getRawValue().selectedDepartment
    ) as IDepartment;
    const locality = new Object(
      this.resourceForm.getRawValue().selectedLocality
    ) as ILocality;
    const profesionalId = this.authService.getUserId();

    service.id = "1";
    service.description = description;
    service.mainCategory = mainCategory;
    service.secondaryCategory = secondaryCategory;
    service.state = province.nombre;
    service.department = department.nombre;
    service.locality = locality.nombre;
    service.profesionalId = profesionalId || ""; //aca necesito traerme el id del usuario actual

    this.servicesService
      .addService(service)
      .then()
      .catch((error) => {
        console.log(error);
      });
  }
}
