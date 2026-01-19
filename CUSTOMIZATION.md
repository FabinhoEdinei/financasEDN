# 🎨 Customização - Finanças EDN

## Temas de Cores Cyberpunk

O design cyberpunk usa as seguintes cores principais:

```css
Primária: #c800ff (Magenta/Roxo)
Secundária: #00f0ff (Cyan/Azul)
Destaque: #ff00ff (Pink Neon)
Sucesso: #00ff41 (Verde Neon)
Fundo Escuro: #0a0e27 (Preto Profundo)
Fundo Secundário: #1a1f3a (Azul Escuro)
```

### Modificar Cores

Edite `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      'cyber-dark': '#0a0e27',
      'cyber-dark-2': '#1a1f3a',
      'cyber-purple': '#c800ff',    // ← Mude aqui
      'cyber-cyan': '#00f0ff',       // ← Ou aqui
      'cyber-pink': '#ff00ff',
      'cyber-green': '#00ff41',
    },
  },
}
```

## Tipografia

A fonte padrão é **Orbitron** (Google Fonts).

### Mudar Fonte

Em `src/app/layout.tsx`:

```typescript
import { Orbitron, Courier_Prime } from 'next/font/google'

const font = Courier_Prime({ subsets: ['latin'] })
```

## Componentes CSS

### Glassmorphism Panel
```html
<div class="glass-panel">Conteúdo</div>
```

### Botão Cyberpunk
```html
<button class="btn-cyber text-white">Clique aqui</button>
```

### Input Cyberpunk
```html
<input class="input-cyber" placeholder="Digite..." />
```

### Card Cyberpunk
```html
<div class="card-cyber">Conteúdo do card</div>
```

## Animações

### Glow Text
```html
<h1 class="glow-text">Texto que brilha</h1>
```

### Pulse Neon
```html
<div class="pulse-neon">Elemento pulsante</div>
```

### Slide In
```html
<div class="slide-in">Entra com animação</div>
```

### Glitch
```html
<div class="glitch">Efeito glitch</div>
```

## Adicionar Novas Animações

Em `src/app/globals.css`:

```css
@keyframes minha-animacao {
  0% {
    /* estado inicial */
  }
  50% {
    /* meio */
  }
  100% {
    /* final */
  }
}

.minha-classe {
  animation: minha-animacao 2s ease-in-out infinite;
}
```

## Layout Responsivo

O design usa Tailwind breakpoints:
- `sm`: 640px
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px
- `2xl`: 1536px

### Exemplo:
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  <!-- 1 coluna mobile, 2 tablet, 4 desktop -->
</div>
```

## Adicionar Novos Campos

### 1. Atualizar Schema Prisma

Edite `prisma/schema.prisma`:

```prisma
model Transaction {
  // ... campos existentes
  novooCampo    String    // Novo campo
}
```

### 2. Criar Migration

```bash
npx prisma migrate dev --name add_novo_campo
```

### 3. Atualizar API Route

Atualize `/api/transactions/route.ts` para incluir o novo campo.

### 4. Atualizar Componente

Atualize `dashboard/transactions/page.tsx` para exibir o campo.

## Modificar Paleta de Cores Globalmente

Em `tailwind.config.ts`, você pode mudar toda a paleta:

```typescript
colors: {
  'cyber-dark': '#1a1a2e',      // Um azul mais vibrante
  'cyber-dark-2': '#16213e',
  'cyber-purple': '#ff006e',    // Um rosa mais intenso
  'cyber-cyan': '#00f5ff',
  'cyber-pink': '#ff0080',
  'cyber-green': '#39ff14',
}
```

## Adicionar Novo Tipo de Transação

1. **Editar Schema:**
```prisma
// type: "salary" | "house_expense" | "credit_card" | "investment" | "novo_tipo"
```

2. **Atualizar API:** `src/app/api/transactions/route.ts`

3. **Atualizar UI:** `src/app/dashboard/transactions/page.tsx`

## Dark Mode / Light Mode (Futuro)

Para adicionar tema claro:

```typescript
// tailwind.config.ts
darkMode: 'class',

theme: {
  colors: {
    light: {
      bg: '#ffffff',
      text: '#000000',
    },
    dark: {
      bg: '#0a0e27',
      text: '#00f0ff',
    }
  }
}
```

## Performance

### Otimizações Recomendadas

1. **Lazy Load Componentes:**
```typescript
import dynamic from 'next/dynamic'

const Heavy = dynamic(() => import('./Heavy'), {
  loading: () => <p>Carregando...</p>,
})
```

2. **Imagens Otimizadas:**
```typescript
import Image from 'next/image'

<Image src="/img.png" alt="Descrição" width={300} height={300} />
```

3. **Memoização:**
```typescript
const Component = React.memo(({ data }) => {
  return <div>{data}</div>
})
```

## Acessibilidade

### Melhorar Acessibilidade

```html
<!-- Adicionar labels descritivos -->
<label htmlFor="email">Email</label>
<input id="email" type="email" />

<!-- Usar aria-labels para ícones -->
<button aria-label="Abrir menu">☰</button>

<!-- Contraste de cores -->
<p class="text-white bg-cyber-dark">
  ✅ Bom contraste
</p>
```

## Deploy

### Preparar para Produção

1. **Altere JWT_SECRET:**
```bash
# Gere uma chave segura
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

2. **Atualize `.env.local`:**
```
JWT_SECRET="sua_chave_aleatoria_segura_aqui"
DATABASE_URL="file:./prisma/prod.db"
```

3. **Build:**
```bash
npm run build
npm run start
```

## Estrutura de Cores por Elemento

| Elemento | Cor | Código |
|----------|-----|--------|
| Fundo | Gradiente Escuro | `bg-gradient-cyber` |
| Texto Principal | Cyan | `text-cyber-cyan` |
| Destaques | Magenta | `text-cyber-purple` |
| Botões | Gradiente | `from-cyber-purple to-cyber-pink` |
| Sombra | Cyan | `shadow-neon-cyan` |
| Sucesso | Verde Neon | `text-cyber-green` |
| Erro | Pink | `text-cyber-pink` |

## Referências

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Color Tools](https://coolors.co)

---

💡 **Dica:** Teste todas as mudanças em desenvolvimento (`npm run dev`) antes de fazer build!
