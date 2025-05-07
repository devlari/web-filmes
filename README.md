# Web Filmes 🎬

Este projeto foi desenvolvido como parte de um desafio técnico para a empresa **cubos.io**.  
A proposta era criar uma aplicação web para gerenciamento de filmes, com autenticação, cadastro e listagem.

---

## ⚠️ Aviso

**O frontend ficou visualmente bagunçado.**  
Por falta de tempo, não consegui finalizar os estilos e o layout como eu gostaria.  
Apesar disso, o essencial está funcionando: é possível **autenticar, cadastrar, visualizar, editar e excluir filmes**.

---

## ✨ Funcionalidades implementadas

- Login com token JWT
- Cadastro de usuários
- Listagem de filmes
- Criação de novos filmes
- Edição e exclusão de filmes
- Validações de formulário com Formik + Yup/Zod
- Comunicação com backend via Axios

---

## 🧰 Tecnologias

- **Next.js 15 + Turbopack**
- **React 19**
- **Tailwind CSS + PrimeFlex + PrimeReact**
- **TypeScript**
- **Formik, Yup e Zod**
- **Axios**
- **SweetAlert2**
- **JWT (jsonwebtoken + nookies)**

---

## 📦 Instalações necessárias

- [Node.js](https://nodejs.org/) (recomendada versão 18 ou superior)
- Terminal de sua preferência (cmd, PowerShell, Terminal do VSCode, etc.)

---

## ▶️ Como rodar o projeto localmente

Siga os passos abaixo para clonar o repositório e iniciar o projeto em ambiente de desenvolvimento:

### 1. Clone o repositório

```bash
git clone https://github.com/devlari/web-filmes.git
```

### 2. Acesse a pasta do projeto
```bash
cd web-filmes
```

### 3. Instale as dependências
```bash
npm install
```
### 4. Configure as variáveis de ambiente
Crie um arquivo .env na raiz do projeto com as variáveis necessárias.

```ini
NEXT_PUBLIC_BASE_URL_API="http://localhost:3000/api"
NEXT_PUBLIC_IMAGE_HOSTNAME="pub-ba8385b85ead456fbb39dc54e4147006.r2.dev"
```

Certifique-se que a API (https://github.com/devlari/api-filmes) está rodando

### 5. Inicie o servidor de desenvolvimento
```
npm run dev
```

O projeto estará disponível em:
http://localhost:3001

### 🚧 O que faltou
- Melhorar o layout e responsividade
- Upload de imagens (no backend está funcionando)
- Filtros num geral
- Polimento visual com componentes customizados
- Algumas validações extras
- Polir o sistema de modo claro/escuro
