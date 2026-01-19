#!/bin/bash
# 🚀 INICIADOR RÁPIDO - Finanças EDN
# Este script configura e inicia o projeto automaticamente

echo "╔════════════════════════════════════════════════════════╗"
echo "║     🚀 FINANÇAS EDN - CONFIGURAÇÃO AUTOMÁTICA          ║"
echo "║          Sistema de Gestão de Finanças Pessoais       ║"
echo "║              Design Cyberpunk Futurístico             ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para mostrar status
status() {
    echo -e "${GREEN}✓${NC} $1"
}

error() {
    echo -e "${RED}✗${NC} $1"
    exit 1
}

info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Verificar se estamos no diretório certo
if [ ! -f "package.json" ]; then
    error "package.json não encontrado. Execute este script do diretório /workspaces/financasEDN"
fi

status "Diretório correto identificado"
echo ""

# Passo 1: Instalar dependências
echo -e "${BLUE}PASSO 1/4: Instalando dependências...${NC}"
if npm install > /dev/null 2>&1; then
    status "Dependências instaladas com sucesso"
else
    error "Falha ao instalar dependências"
fi
echo ""

# Passo 2: Gerar Prisma Client
echo -e "${BLUE}PASSO 2/4: Gerando Prisma Client...${NC}"
if npx prisma generate > /dev/null 2>&1; then
    status "Prisma Client gerado com sucesso"
else
    error "Falha ao gerar Prisma Client"
fi
echo ""

# Passo 3: Criar/Migrar banco de dados
echo -e "${BLUE}PASSO 3/4: Configurando banco de dados...${NC}"
if npx prisma migrate deploy > /dev/null 2>&1 || npx prisma db push > /dev/null 2>&1; then
    status "Banco de dados configurado com sucesso"
else
    warning "Tentando criar novo banco..."
    if npx prisma migrate dev --name init > /dev/null 2>&1; then
        status "Novo banco criado com sucesso"
    else
        error "Falha ao configurar banco de dados"
    fi
fi
echo ""

# Passo 4: Resumo e instruções finais
echo -e "${BLUE}PASSO 4/4: Finalizando...${NC}"
status "Projeto configurado com sucesso!"
echo ""

echo "╔════════════════════════════════════════════════════════╗"
echo "║                   ✅ PRONTO PARA USAR!                ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

echo -e "${GREEN}PRÓXIMOS PASSOS:${NC}"
echo ""
echo "1️⃣  Inicie o servidor de desenvolvimento:"
echo -e "   ${YELLOW}npm run dev${NC}"
echo ""
echo "2️⃣  Abra seu navegador em:"
echo -e "   ${YELLOW}http://localhost:3000${NC}"
echo ""
echo "3️⃣  Crie sua primeira conta:"
echo "   - Clique em 'Criar Conta'"
echo "   - Preencha nome, email e senha"
echo "   - Comece a usar!"
echo ""

echo -e "${GREEN}DOCUMENTAÇÃO DISPONÍVEL:${NC}"
echo "  📖 README.md - Documentação completa"
echo "  🚀 GETTING_STARTED.md - Guia passo-a-passo"
echo "  ⚡ QUICKSTART.md - Início rápido"
echo "  🏗️  ARCHITECTURE.md - Documentação técnica"
echo "  🎨 CUSTOMIZATION.md - Como customizar"
echo "  📋 ROADMAP.md - Planos futuros"
echo ""

echo -e "${YELLOW}DICAS:${NC}"
echo "  • Tenha certeza de que a porta 3000 está disponível"
echo "  • O banco SQLite será criado em prisma/dev.db"
echo "  • Você pode usar múltiplas contas para testes"
echo ""

echo -e "${BLUE}Quer começar com dados de teste?${NC}"
echo "Execute: npx prisma db seed"
echo ""

echo "╔════════════════════════════════════════════════════════╗"
echo "║  Desenvolvido com ❤️ e muito código futurístico ✨    ║"
echo "║           Versão 1.0 • Janeiro 2024                   ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Oferecer para iniciar o servidor
read -p "Deseja iniciar o servidor agora? (s/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo -e "${GREEN}Iniciando servidor...${NC}"
    echo ""
    npm run dev
else
    echo -e "${YELLOW}OK! Execute 'npm run dev' quando estiver pronto.${NC}"
fi
