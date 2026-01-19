# 🎬 COMO INICIAR - Guia Completo

## ⚡ Início Rápido (5 minutos)

### 1. Abra o Terminal
```bash
cd /workspaces/financasEDN
```

### 2. Instale as Dependências
```bash
npm install
```

### 3. Configure o Banco de Dados
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Inicie o Servidor
```bash
npm run dev
```

### 5. Acesse a Aplicação
Abra seu navegador em: **http://localhost:3000**

---

## 📝 Primeira Vez? Siga Este Passo a Passo

### Passo 1: Criar Sua Primeira Conta

1. Na página inicial, clique em **"Criar Conta"**
2. Preencha os campos:
   - **Nome:** Seu nome completo
   - **Email:** seu@email.com
   - **Senha:** escolha uma senha
   - **Confirmar Senha:** repita a senha
3. Clique em **"Criar Conta"**
4. Você será automaticamente logado e redirecionado ao **Dashboard**

### Passo 2: Explorar o Dashboard

Na página do Dashboard você verá:
- 💰 **Renda Total** - Total de salários registrados
- 📊 **Despesas** - Total de gastos
- 💵 **Saldo Bancário** - Soma de todas as contas
- 📈 **Investimentos** - Valor total investido

Veja também:
- Cards das suas contas bancárias
- Cards dos seus investimentos

### Passo 3: Criar Sua Primeira Conta Bancária

1. Clique em **"Gerenciar"** na seção de Contas Bancárias
   (ou clique no botão **"Contas"** na parte inferior)
2. Clique em **"+ Nova Conta"**
3. Preencha:
   - **Nome da Conta:** Ex: "Conta Corrente Principal"
   - **Tipo:** Corrente ou Poupança
   - **Saldo Inicial:** Digite um valor (opcional)
4. Clique em **"Criar Conta"**

✨ **Agora você pode editar o nome da conta clicando em "✎ Editar nome"!**

### Passo 4: Registrar Seu Primeiro Salário

1. Clique em **"Transações"** no Dashboard
2. Clique em **"+ Nova Transação"**
3. Preencha:
   - **Tipo:** Selecione "Salário"
   - **Categoria:** Digite "Salário"
   - **Valor:** Digite seu salário (ex: 5000)
   - **Descrição:** "Salário mensal"
4. Clique em **"Adicionar"**

✅ Pronto! Seu salário foi registrado.

### Passo 5: Registrar uma Despesa da Casa

1. Em **"Transações"**, clique em **"+ Nova Transação"**
2. Preencha:
   - **Tipo:** "Despesa Casa"
   - **Categoria:** Ex: "Aluguel"
   - **Valor:** Ex: 1500
   - **Descrição:** "Aluguel do apartamento"
3. Clique em **"Adicionar"**

### Passo 6: Registrar uma Despesa de Cartão de Crédito

1. Em **"Transações"**, clique em **"+ Nova Transação"**
2. Preencha:
   - **Tipo:** "Cartão Crédito"
   - **Categoria:** Ex: "Alimentação"
   - **Valor:** Ex: 300
   - **Descrição:** "Compras no supermercado"
3. Clique em **"Adicionar"**

### Passo 7: Criar seu Primeiro Investimento

1. Clique em **"Gerenciar"** na seção de Investimentos
   (ou clique no botão **"Investimentos"** na parte inferior)
2. Clique em **"+ Novo Investimento"**
3. Preencha:
   - **Nome:** Ex: "Ações XPTO"
   - **Tipo:** Selecione (Ações, Títulos, Criptomoedas, Fundos)
   - **Valor Investido:** Ex: 2000
   - **Valor Atual (opcional):** Ex: 2100
4. Clique em **"Adicionar"**

✨ O ROI será calculado automaticamente!

---

## 🎯 Tutoriais Rápidos

### Como Editar o Nome de uma Conta? ✨

1. Vá para **Contas Bancárias**
2. Encontre a conta que quer editar
3. Clique em **"✎ Editar nome"**
4. Digite o novo nome
5. Clique em **"Salvar"** ou **"Cancelar"**

### Como Atualizar um Investimento?

1. Vá para **Investimentos**
2. Encontre o investimento
3. Clique em **"✎ Atualizar valor"**
4. Digite o novo valor atual
5. Clique em **"Salvar"**

O ROI será recalculado automaticamente!

### Como Sair da Conta?

1. No Dashboard, clique em **"Sair"** (canto superior direito)
2. Você será redirecionado à página inicial
3. Clique em **"Entrar no Sistema"** para fazer login novamente

---

## 👥 Multi-usuário: Usando com 2 Pessoas

### Pessoa 1: João Silva

1. Abra http://localhost:3000
2. Clique em **"Criar Conta"**
3. Email: **joao@example.com**
4. Senha: **senha123**
5. Crie sua conta e explore

### Pessoa 2: Maria Santos

1. No mesmo navegador (ou outro), clique em **"Sair"**
2. Clique em **"Criar Conta"**
3. Email: **maria@example.com**
4. Senha: **senha123**
5. Crie sua conta

Cada pessoa terá seus dados completamente isolados!

---

## 🎨 Explorando o Design Cyberpunk

Observe os detalhes do design:
- ✨ **Cores neon** - Cyan, Magenta, Purple
- 🌟 **Texto brilhante** - Titles com efeito glow
- 💫 **Painéis** - Glassmorphism com bordas neon
- ⚡ **Animações** - Hover effects e transições suaves
- 🔮 **Gradientes** - Fundos com degradê futurístico

Tente passar o mouse sobre os botões para ver as animações!

---

## 🔧 Se Algo der Errado

### Erro: "Cannot find module"
```bash
npm install
npx prisma generate
```

### Erro: "Database locked"
```bash
# Reinicie o servidor
# Ctrl+C para parar
npm run dev
```

### Erro: "Migration failed"
```bash
# Reset do banco (cuidado: apaga dados!)
npx prisma migrate reset
npx prisma migrate dev --name init
```

### Porta 3000 já está em uso?
```bash
npm run dev -- -p 3001
# Acesse: http://localhost:3001
```

---

## 📊 Populating com Dados de Teste (Opcional)

Se quiser começo rápido com dados:

```bash
npx prisma db seed
```

Isso criará:
- 2 usuários de teste
- 2 contas bancárias
- Algumas transações
- Alguns investimentos

**Credenciais:**
- Email: joao@example.com | Senha: senha123
- Email: maria@example.com | Senha: senha123

---

## 💡 Dicas Importantes

1. **Nomes de Contas:** Use nomes descritivos
   - ✅ "Conta Corrente Principal"
   - ✅ "Poupança da Maria"
   - ❌ "Conta 1"

2. **Categorias de Despesas:** Crie categorias consistentes
   - "Aluguel" para aluguel
   - "Alimentação" para comida
   - "Transporte" para mobilidade

3. **Investimentos:** Atualize regularmente
   - Acompanhe o valor de mercado
   - Monitore o ROI

4. **Salário:** Digite com o ponto decimal
   - ✅ 5000.50
   - ✅ 5000 (sem casas decimais)

---

## 🚀 Próximas Etapas

Depois de familiarizar-se, você pode:

1. **Adicionar mais contas** para diferentes propósitos
2. **Diversificar investimentos** (ações, criptos, fundos)
3. **Manter histórico** de todas as transações
4. **Analisar tendências** de gastos
5. **Planejar objetivos** financeiros

---

## 📚 Documentação Disponível

- **README.md** - Documentação completa
- **QUICKSTART.md** - Guia rápido
- **CUSTOMIZATION.md** - Como customizar
- **ARCHITECTURE.md** - Documentação técnica
- **ROADMAP.md** - Planos futuros
- **CHECKLIST.md** - Status das features

---

## ❓ Ainda com Dúvidas?

1. Verifique se o servidor está rodando: `npm run dev`
2. Confirme se acessa: `http://localhost:3000`
3. Abra o console do navegador (F12) para ver erros
4. Verifique os logs do terminal

---

## ✅ Você Está Pronto!

**Congratulações!** 🎉

Você agora tem um sistema completo de gestão de finanças pessoais rodando localmente com:
- ✅ Login seguro
- ✅ Multi-usuário
- ✅ Contas bancárias editáveis
- ✅ Transações de todos os tipos
- ✅ Investimentos com ROI
- ✅ Design cyberpunk futurístico
- ✅ Banco de dados local

**Aproveite!** 💰✨

---

**Criado com ❤️ e muito código futurístico**
