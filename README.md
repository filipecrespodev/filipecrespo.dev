# Filipe Crespo - Blog Pessoal

Um blog pessoal minimalista e moderno, desenvolvido com Vue 3 + Vite.

## ✨ Features

- 🎨 Design minimalista e profissional
- 📝 Sistema de posts com cards interativos
- 🎯 Grid responsivo adaptável
- 💡 Leitura focada com layout limpo
- 📱 Mobile-first e responsivo
- ⚡ Performance otimizada com Vite
- 🎭 Transições suaves entre páginas

## 🚀 Tecnologias

- **Vue 3** - Framework JavaScript progressivo
- **Vite** - Build tool super rápido
- **CSS3** - Estilização moderna e minimalista
- **Inter** - Tipografia profissional do Google Fonts

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
│       └── main.css     # Estilos principais
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

Edite as variáveis CSS em `src/assets/styles/main.css`:

```css
:root {
  --primary-bg: #ffffff;
  --secondary-bg: #f8f8f8;
  --dark-bg: #0a0a0a;
  --accent-color: #FF5734;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --border-color: #e5e5e5;
}
```

### Perfil

Edite os dados no componente `src/components/Sidebar.vue`

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com ❤️ por Filipe Crespo
