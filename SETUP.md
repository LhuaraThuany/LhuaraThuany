# 🚁 JAZZ Aero Intelligence - Guia de Instalação

## 📋 Pré-requisitos

- Node.js 18+ (https://nodejs.org)
- PostgreSQL 15+ (https://www.postgresql.org)
- Git (https://git-scm.com)
- Docker (opcional, para desenvolvimento rápido)

## 🚀 Instalação Rápida (Com Docker)

```bash
# 1. Clone o repositório
git clone <sua-url-repo>
cd jazz-aero-intelligence

# 2. Rode com Docker Compose
docker-compose up

# 3. Acesse
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

## 🔧 Instalação Manual

### Backend

```bash
# 1. Instale dependências do servidor
cd server
npm install

# 2. Configure o banco de dados
# Crie um arquivo .env com as variáveis do .env.example
cp .env.example .env

# 3. Inicie o servidor
npm run dev
# Servidor rodando em http://localhost:5000
```

### Frontend

```bash
# 1. Em outra aba, instale dependências
cd client
npm install

# 2. Inicie o app
npm start
# App rodando em http://localhost:3000
```

## 🔐 Credenciais de Teste

**Email:** admin@jazzaero.com
**Senha:** admin123

## 📊 Estrutura do Projeto

```
jazz-aero-intelligence/
├── server/              # Backend Node.js
│   ├── routes/         # Rotas da API
│   ├── index.js        # Servidor principal
│   └── package.json
├── client/             # Frontend React
│   ├── src/
│   │   ├── pages/      # Páginas principais
│   │   ├── components/ # Componentes reutilizáveis
│   │   └── App.js      # Componente raiz
│   └── package.json
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## 📝 Variáveis de Ambiente

### Backend (.env)
```
DB_USER=jazz_user
DB_PASSWORD=jazz_secure_pass_2024
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jazz_aero_db
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_in_production
```

## 🧪 Testando a API

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@jazzaero.com", "password": "admin123"}'
```

### Listar Clientes
```bash
curl http://localhost:5000/api/clientes
```

### Criar Novo Cliente
```bash
curl -X POST http://localhost:5000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Novo Cliente",
    "tipo": "Oficina",
    "telefone": "11-99999-9999",
    "email": "cliente@email.com",
    "status": "Prospectado",
    "valor_potencial": 50000
  }'
```

## 🌐 Deploy (Produção)

### Heroku
```bash
git push heroku main
```

### AWS
1. Suba imagem Docker para ECR
2. Configure ECS/Fargate
3. Configure RDS para PostgreSQL
4. Configure ALB

### DigitalOcean App Platform
```bash
doctl apps create --spec app.yaml
```

## 📚 Documentação da API

### Endpoints

#### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/verify` - Verificar token

#### Clientes
- `GET /api/clientes` - Listar todos
- `GET /api/clientes/:id` - Obter um
- `POST /api/clientes` - Criar
- `PUT /api/clientes/:id` - Atualizar
- `DELETE /api/clientes/:id` - Deletar

#### Ligações
- `GET /api/ligacoes` - Listar todas
- `GET /api/ligacoes/:id` - Obter uma
- `POST /api/ligacoes` - Registrar
- `PUT /api/ligacoes/:id` - Atualizar
- `DELETE /api/ligacoes/:id` - Deletar

#### Pipeline
- `GET /api/pipeline` - Obter pipeline
- `POST /api/pipeline/mover` - Mover item entre etapas

#### Dashboard
- `GET /api/dashboard` - Métricas
- `GET /api/dashboard/grafico-pipeline` - Dados do pipeline
- `GET /api/dashboard/conversao-mensal` - Conversões mensais

## 🐛 Troubleshooting

### Erro de Conexão ao Banco
```
Check:
1. PostgreSQL está rodando?
2. Credenciais do .env corretas?
3. Banco de dados foi criado?
```

### Porta 3000 ou 5000 em uso
```bash
# Kill processo na porta
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

### Erro CORS
```
Cheque se a URL do backend está correta no arquivo .env do frontend
```

## 📞 Suporte

Para dúvidas ou issues:
1. Verifique os logs: `docker-compose logs`
2. Abra uma issue no GitHub
3. Consulte a documentação em README.md

---

**Desenvolvido com ❤️ para o setor aeronáutico**
