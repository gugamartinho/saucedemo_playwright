# 1. Usa a imagem oficial do Playwright com Node + browsers
FROM mcr.microsoft.com/playwright:v1.59.1-jammy

# 2. Define o diretório de trabalho dentro do container
WORKDIR /app

# 3. Copia apenas os ficheiros de dependências primeiro (para cache)
COPY package*.json ./

# 4. Instala dependências do projeto
RUN npm install

# 5. Copia o resto do código
COPY . .

# 6. Comando padrão: correr os testes
CMD ["npx", "playwright", "test", "--reporter=html"]
