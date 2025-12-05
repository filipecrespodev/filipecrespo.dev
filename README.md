# 🎮 Filipe Crespo - Retro Blog

Um blog pessoal com visual retro game, desenvolvido com Vue 3 + Vite.

## ✨ Features

- 🕹️ Design inspirado em jogos retro 8-bit
- 💚 Paleta de cores neon vibrante
- 📝 Sistema de posts em formato diário
- 🎨 Animações e efeitos nostálgicos
- 📱 Layout responsivo
- ⚡ Performance otimizada com Vite

## 🚀 Tecnologias

- **Vue 3** - Framework JavaScript progressivo
- **Vite** - Build tool super rápido
- **CSS3** - Estilização com tema retro
- **Press Start 2P** - Fonte pixelada do Google Fonts

## 🎯 Estrutura

```
src/
├── components/
│   ├── Sidebar.vue      # Menu lateral com perfil
│   ├── PostList.vue     # Lista de posts
│   └── Post.vue         # Visualização de post
├── data/
│   └── posts.json       # Dados dos posts
├── assets/
│   └── styles/
│       └── retro.css    # Estilos retro game
├── App.vue              # Componente principal
└── main.js              # Entry point
```

## 🛠️ Como usar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

### Build para produção

```bash
npm run build
```

### Preview da build

```bash
npm run preview
```

## 📝 Adicionando novos posts

Edite o arquivo `src/data/posts.json` e adicione um novo objeto seguindo o formato:

```json
{
  "id": 6,
  "title": "Título do post",
  "date": "2025-12-05",
  "tags": ["tag1", "tag2"],
  "content": [
    "Primeiro parágrafo...",
    "Segundo parágrafo..."
  ]
}
```

## 🎨 Personalização

### Cores

Edite as variáveis CSS em `src/assets/styles/retro.css`:

```css
:root {
  --retro-bg: #0f0f23;
  --retro-primary: #00ff41;
  --retro-secondary: #ff00ff;
  --retro-accent: #00ffff;
  --retro-text: #c0c0c0;
}
```

### Perfil

Edite os dados no componente `src/components/Sidebar.vue`

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

> "Press START to continue" 🎮
