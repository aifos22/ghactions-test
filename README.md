# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



# Usuario de pruebas

### Puedfes utilizar el siguiente usuario para poder llevar a cabo pruebas dentro de la web

```
Correo: user@email.com
Contraseña: user123
```

# Contenerización de la aplicación

```
Construir la imagen en base al *Dockerfile* que se encuentra en la raíz del proyecto. Ejecutar en puerto 5173.
```

# Prueba unitaria de componente

```
Se crea el componente Button.tsx y el modulo Button.test.tsx para ejemplificar un test unitario por medio de la librería *Jest*
```

Resultado de ```npm test --coverage```

>  clinica-react-web@0.0.0 test
>  jest
>  
> PASS src/components/Button/Button.test.tsx
> 
> Button component
> √ renders the label correctly (27 ms)
> √ triggers onClick when clicked (8 ms)
> 
> Test Suites: 1 passed, 1 total
> Tests: 2 passed, 2 total
> Snapshots: 0 total
> Time: 1.978 s
> Ran all test suites.

# Automatización de CI/CD con Github Actions

```
Se añade configuración de GH Actions # /.github/workflows/ci.yml para generar la imagen de Docker posterior a la validación de los test unitarios respectivos
```

#### Puede chequear el historial de ramas en la pestaña [Activity](https://github.com/aifos22/ghactions-test/activity)


#### Sofia Pimentel - Desarrollo Frontend 2025