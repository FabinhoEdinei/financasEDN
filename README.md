# Finanças EDN - Sistema de Gestão de Finanças Pessoais 💰

Aplicação moderna e futurística com design **Cyberpunk** para gerenciar suas finanças pessoais. Suporta múltiplos usuários, salários, despesas, cartão de crédito, contas bancárias editáveis e investimentos.

## 🚀 Características Principais

- ✅ **Autenticação Multi-usuário** - Até 2 usuários podem usar a mesma instância
- 💰 **Gestão de Salários** - Registre rendas mensais
- 🏠 **Despesas da Casa** - Organize despesas domésticas
- 💳 **Cartão de Crédito** - Controle gastos com cartão
- 🏦 **Contas Bancárias Editáveis** - Crie e edite nomes de contas
- 📈 **Investimentos** - Rastreie ações, títulos, criptos e fundos
- 🎨 **Design Cyberpunk Futurístico** - Interface neon com animações
- 💾 **SQLite Local** - Dados persistentes no seu dispositivo

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Estilo**: Tailwind CSS com tema customizado Cyberpunk
- **Backend**: Next.js API Routes
- **Banco de Dados**: SQLite com Prisma ORM
- **Autenticação**: JWT + Bcrypt
- **Estado**: Zustand

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn

## 🚀 Instalação

1. **Clone o repositório:**
```bash
cd /workspaces/financasEDN
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure o banco de dados:**
```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

5. **Acesse a aplicação:**
```
http://localhost:3000
```

## 📱 Como Usar

### 1. Criar Conta
- Clique em "Criar Conta" na página inicial
- Preencha nome, email e senha
- Confirme a senha

### 2. Login
- Entre com email e senha
- Você será redirecionado ao dashboard

### 3. Dashboard
Veja um resumo com:
- Total de renda
- Total de despesas
- Saldo bancário total
- Total investido

### 4. Contas Bancárias
- Crie novas contas (Corrente, Poupança)
- Edite o nome das contas
- Acompanhe o saldo

### 5. Investimentos
- Adicione novos investimentos (Ações, Títulos, Criptos, Fundos)
- Acompanhe o valor atual e ROI
- Atualize valores em tempo real

### 6. Transações
- Registre salários
- Registre despesas (casa, cartão)
- Categorize suas transações

## 🎨 Design Cyberpunk

O design inclui:
- Cores neon (Cyan, Magenta, Purple)
- Glassmorphism panels
- Animações de glitch e glow
- Fonte Orbitron
- Gradientes futurísticos
- Efeitos de blur e sombra

## 📊 Estrutura do Banco de Dados

```
Users
├── id
├── name
├── email
├── password

Transactions
├── id
├── type (salary, house_expense, credit_card, investment)
├── category
├── amount
├── description
├── date
└── userId

BankAccounts
├── id
├── name (editável)
├── balance
├── type (checking, savings)
└── userId

Investments
├── id
├── name
├── type (stocks, bonds, crypto, funds)
├── amount
├── currentValue
├── roi
└── userId
```

## 🔐 Segurança

- Senhas são hash com Bcrypt
- Tokens JWT para autenticação
- Validação de entrada nos formulários
- Proteção de rotas API

## 📝 Variáveis de Ambiente

Crie um arquivo `.env.local`:

```
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="seu_jwt_secret_super_seguro_aqui_change_in_production"
```

## 🐛 Troubleshooting

### Erro ao conectar com banco de dados
```bash
npx prisma migrate dev --name init
```

### Limpar tudo e recomeçar
```bash
rm prisma/dev.db
npx prisma migrate dev --name init
```

## 📦 Build para Produção

```bash
npm run build
npm run start
```

## 👥 Multi-usuário

A aplicação suporta múltiplos usuários com:
- Autenticação independente
- Dados isolados por usuário
- Dashboard personalizado

## 🎯 Roadmap

- [ ] Relatórios avançados
- [ ] Gráficos de despesas
- [ ] Exportar dados (CSV, PDF)
- [ ] Temas escuro/claro personalizáveis
- [ ] Integração com APIs de bancos
- [ ] Notificações de limites
- [ ] Histórico de alterações

## 📄 Licença

MIT

## 💬 Suporte

Para reportar problemas ou sugestões, crie uma issue no GitHub.

---

Desenvolvido com ❤️ e muito Cyberpunk ✨
