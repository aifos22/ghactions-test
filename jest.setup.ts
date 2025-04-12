// Importa las extensiones de Jest para React Testing Library
import '@testing-library/jest-dom';

// Opcional: Configuraciones adicionales
import { configure } from '@testing-library/react';

// Configura el tiempo de espera para findBy* queries (opcional)
configure({ asyncUtilTimeout: 5000 });

// Mock de localStorage (opcional)
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;