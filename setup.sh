#!/bin/bash
# Setup script para Finanças EDN

echo "🚀 Iniciando setup do Finanças EDN..."

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Gerar Prisma Client
echo "🔧 Gerando Prisma Client..."
npx prisma generate

# Criar banco de dados
echo "💾 Criando banco de dados..."
npx prisma migrate dev --name init

# Usar seed data (opcional)
if [ -f "prisma/seed.ts" ]; then
  echo "🌱 Populando banco de dados..."
  npx prisma db seed
fi

echo "✅ Setup completo!"
echo ""
echo "🎉 Para iniciar o servidor, execute:"
echo "   npm run dev"
echo ""
echo "📖 Acesse http://localhost:3000"
