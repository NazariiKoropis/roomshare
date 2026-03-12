# React + Vite

Цей шаблон надає мінімальний стартовий набір для роботи React у Vite з HMR та базовими правилами ESLint.

Наразі доступні два офіційні плагіни:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

React Compiler у цьому шаблоні не увімкнений через вплив на продуктивність розробки та збірки. Щоб додати його, дивіться [цю документацію](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

Якщо ви розробляєте production-застосунок, рекомендується використовувати TypeScript із увімкненими type-aware правилами лінтингу. Перегляньте [TS-шаблон](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts), щоб дізнатися, як інтегрувати TypeScript і [`typescript-eslint`](https://typescript-eslint.io) у ваш проєкт.
