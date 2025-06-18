# 📱 HealthTrack

Aplicativo mobile desenvolvido com React Native + Expo para auxiliar usuários no monitoramento de hábitos saudáveis.

## 🧠 Descrição

O **HealthTrack** permite que o usuário registre dados importantes do seu dia a dia relacionados à saúde, como:

- ingestão de água
- qualidade do sono
- prática de atividades físicas  
  Além disso, é possível acompanhar o histórico completo desses hábitos.

## 🎯 Público-Alvo

Adultos entre 18 e 45 anos que desejam melhorar sua qualidade de vida por meio do monitoramento dos seus hábitos de saúde.

## ✅ Funcionalidades

- Registro diário de ingestão de água
- Cadastro de atividades físicas com duração e data
- Monitoramento da qualidade do sono (data e horas dormidas)
- Histórico geral consolidado com todos os registros
- Persistência dos dados em nuvem com Firebase Firestore

## 🧰 Tecnologias Utilizadas

- React Native
- TypeScript
- Expo
- Expo Router
- Firebase Firestore

## 🚀 Como Executar

1. Clone o repositório:

```bash
git clone https://github.com/Sossella05/Healthtrack
cd healthtrack
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o projeto:

```bash
npx expo start
```

4. Abra com **Expo Go** no celular ou use um emulador/simulador.

## 🖥️ Como Apresentar em Outro Computador

Se você precisar rodar ou apresentar este projeto em outro computador, siga estes passos:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Sossella05/Healthtrack
   cd healthtrack
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Inicie o projeto:**
   - Para rodar no Expo Go (QR Code para celular):
     ```bash
     npx expo start
     ```
   - Para rodar no navegador (Web):
     ```bash
     npx expo start --web
     ```
4. **Abra o app:**
   - No Expo Go: escaneie o QR Code com o app Expo Go no seu celular.
   - No navegador: acesse o endereço exibido no terminal.

**Importante:**
- O arquivo de configuração do Firebase já está incluso no repositório, então não é necessário configurar nada extra para persistência dos dados.
- O app está pronto para uso e apresentação em qualquer máquina com Node.js e npm instalados.

## 🧪 Estrutura de Telas

- `/` - Página inicial com navegação
- `/agua` - Registro de ingestão de água
- `/atividade` - Cadastro de atividades físicas
- `/sono` - Monitoramento do sono
- `/historico` - Tela com histórico completo

---

👤 Autor: **Bruno Sossella**  
📧 Email: bdcsossella@minha.fag.edu.br  
📆 Atualizado em: 21/05/2025

## ⚡ Observação

O arquivo de configuração do Firebase (`src/config/firebaseConfig.ts`) já está incluso no repositório. Não é necessário configurar nada extra para rodar o app em outro computador.
