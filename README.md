# 🎬 Movie App

Angular project built with [Angular CLI](https://github.com/angular/angular-cli) **v19.2.15**.

## 🚀 Run the project

```bash
ng serve
```

Then open your browser at:  
👉 [http://localhost:4200/](http://localhost:4200/)

---

## 📂 Project structure

```
~/movie/src/app/
├── app.component.css
├── app.component.html
├── app.component.spec.ts
├── app.component.ts
├── app.config.ts
├── app.routes.ts
├── core/  ------>  # for core code like HttpClint Req and any services
│   ├── interfaces/
│   └── services/
└── shared/  ------>  # for the repeated components like navbar
    └── navbar/
        ├── navbar.component.css
        ├── navbar.component.html
        ├── navbar.component.spec.ts
        └── navbar.component.ts

```

---

## 🛠 Useful commands

- Generate new component:
  ```bash
  ng generate component component-name
  ```
- Build the project:
  ```bash
  ng build
  ```
- Run unit tests:
  ```bash
  ng test
  ```
