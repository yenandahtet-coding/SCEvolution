# React + Vite

## Automated tests / ဆရာရှေ့မှာ စမ်းသပ်ပြရန်

Install dependencies with `npm ci` after cloning this project.

- `npm test` — test အားလုံးကို တစ်ကြိမ် run ပြီး pass/fail ပြမယ်။
- `npm run test:counter` — counter တစ်ကြိမ်နှိပ်လျှင် တစ်တိုးသလား စစ်တဲ့ test တစ်ခုတည်း run မယ်။
- `npm run test:watch` — code ပြင်ပြီး save လုပ်တိုင်း tests ပြန် run မယ်။ ရပ်ရန် Ctrl+C နှိပ်ပါ။
- `npm run check` — lint → tests → production build အစဉ်လိုက်စစ်မယ်။ အဆင့်တစ်ခု fail ဖြစ်ရင် နောက်အဆင့်ကို ဆက်မလုပ်ပါ။

Tests are in `src/App.test.jsx`. Vitest runs React Testing Library interactions in
jsdom: default Overview, Documentation/Community navigation, counter increments,
returning home with preserved count, and keyboard navigation/focus.
These tests check component behavior, not real-browser layout or live deployment.

### Pass → Fail → Fix → Pass

1. `npm test` run ပြီး tests pass ဖြစ်တာ ပြပါ။
2. Demo branch မှာ `src/App.jsx` counter ရဲ့ `count + 1` ကို ခဏ `count + 2` ပြောင်းပါ။
3. `npm run test:counter` run ပါ။ Test က `Count is 1` ကို မတွေ့လို့ fail ဖြစ်ရပါမယ်။
4. `count + 1` ပြန်ထားပြီး `npm run check` run ပါ။ အားလုံး pass ပြန်ဖြစ်ရပါမယ်။
5. Demo bug ကို commit/push မလုပ်မီ ပြန်ပြင်ထားပါ။

`npm run check` can also be used as a CI/build command after dependencies are
installed. Remote CI/Netlify settings are not configured by this local test setup.

Setup references: [Vitest setup files](https://main.vitest.dev/config/setupfiles)
and [React Testing Library setup](https://testing-library.com/docs/react-testing-library/setup/).

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
