# 🚀 Guia de Início Rápido - Finanças EDN

## 1️⃣ Instalação Rápida

```bash
cd /workspaces/financasEDN
npm install
npx prisma generate
npx prisma migrate dev --name init
```

## 2️⃣ Iniciar o Servidor

```bash
npm run dev
```

Acesse: **http://localhost:3000**

## 3️⃣ Testar o Sistema

### Criar uma Conta:
- Clique em "Criar Conta"
- Use: **seu@email.com** / **senha123**
- Clique em "Criar Conta"

### Entrar no Sistema:
- Use o email e senha que criou
- Você será redirecionado ao dashboard

## 4️⃣ Funcionalidades Principais

### 💰 Dashboard
- Visualize: Renda Total, Despesas, Saldo Bancário, Investimentos

### 🏦 Contas Bancárias
- Crie novas contas
- **Edite o nome** das contas (principal requisito!)
- Acompanhe saldos

### 📈 Investimentos
- Adicione ações, títulos, criptos
- Acompanhe ROI em tempo real
- Atualize valores

### 💳 Transações
- Registre salário
- Despesas da casa
- Despesas de cartão de crédito
- Categorize suas transações

## 🎨 Design Cyberpunk

- Cores neon: Cyan (#00f0ff), Magenta, Purple
- Glassmorphism (painéis com blur)
- Animações futurísticas
- Fonte Orbitron
- Tema escuro com gradientes

## 🗄️ Banco de Dados

O SQLite é criado automaticamente em `prisma/dev.db`

Dados são salvos localmente:
- ✅ Sem necessidade de servidor externo
- ✅ Privado e seguro
- ✅ Rápido e eficiente

## 📲 Multi-usuário

Crie múltiplas contas:
1. User 1: João Silva (joao@example.com)
2. User 2: Maria Santos (maria@example.com)

Cada usuário tem:
- Dados isolados
- Dashboard próprio
- Contas e investimentos privados

## 🔑 Credenciais de Teste (Seed)

Se executar o seed:
```bash
npx prisma db seed
```

Usuários disponíveis:
- **joao@example.com** / **senha123**
- **maria@example.com** / **senha123**

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Criar novo migration
npx prisma migrate dev --name nome_da_migracao

# Ver banco de dados
npx prisma studio

# Reset banco de dados
npx prisma migrate reset

# Build para produção
npm run build
npm run start
```

## ⚙️ Variáveis de Ambiente

`.env.local` já está configurado com:
- `DATABASE_URL` → SQLite local
- `JWT_SECRET` → Chave de autenticação

**⚠️ Para produção, altere o JWT_SECRET!**

## 🐛 Problemas Comuns

### Erro: "Prisma Client not found"
```bash
npx prisma generate
```

### Erro: "dev.db locked"
- Fecha o Prisma Studio
- Reinicia o servidor

### Erro: "Migration failed"
```bash
npx prisma migrate reset
npx prisma migrate dev --name init
```

## 📝 Estrutura de Pastas

```
src/
├── app/
│   ├── api/                 # API Routes
│   ├── dashboard/           # Páginas do dashboard
│   ├── login/              # Página de login
│   ├── register/           # Página de registro
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Home
├── lib/                     # Utilitários (auth, prisma, user)
└── store/                   # State management (Zustand)

prisma/
├── schema.prisma           # Definição do banco
└── dev.db                  # Banco SQLite
```

## 🎯 Próximos Passos

1. ✅ Criar conta
2. ✅ Explorar dashboard
3. ✅ Adicionar contas bancárias
4. ✅ Registrar transações
5. ✅ Adicionar investimentos
6. ✅ Editar nomes de contas

## 💡 Dicas

- Use nomes descritivos para contas (ex: "Conta Corrente Principal")
- Atualize investimentos regularmente
- Registre todas as despesas para melhor controle
- Categorize transações para relatórios

## 🆘 Precisa de Ajuda?

Verifique:
1. README.md (documentação completa)
2. Verificar logs do terminal
3. Verificar console do navegador (F12)

---

**Pronto para começar? Execute `npm run dev` e acesse http://localhost:3000!** 🚀
