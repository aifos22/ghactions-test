# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



# Explicación del uso del DOM Virtual en ReactJS
El DOM Virtual es una representación en memoria del DOM real. React lo utiliza para minimizar las operaciones costosas de manipulación del DOM real. Aquí está cómo React optimiza el rendimiento:

# Comparación del estado anterior y actual:
Cuando cambian los datos, React crea una copia del DOM Virtual actualizado y lo compara con la versión anterior utilizando un algoritmo de reconciliación llamado Diffing Algorithm.

# Actualización selectiva:
React identifica las diferencias y actualiza únicamente las partes necesarias del DOM real. Por ejemplo, si un doctor nuevo es agregado, solo esa línea del listado se modifica en el DOM real.

# Mejora en el rendimiento:
Esto es especialmente útil en listas grandes como el "listado de doctores", ya que evita recargar toda la página o componentes no afectados.
