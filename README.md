# 📱 HealthTrack

Aplicativo mobile desenvolvido com React Native + Expo para auxiliar usuários no monitoramento de hábitos saudáveis.

---

## 🧠 Descrição
O **HealthTrack** permite que o usuário registre e acompanhe hábitos essenciais para a saúde, como ingestão de água, qualidade do sono e prática de atividades físicas. O app oferece histórico consolidado, feedback visual e persistência dos dados em nuvem.

## 🎯 Público-Alvo
Adultos entre 18 e 45 anos que desejam melhorar sua qualidade de vida por meio do monitoramento dos seus hábitos de saúde.

## ✅ Funcionalidades
- Registro diário de ingestão de água
- Cadastro de atividades físicas com duração e data
- Monitoramento da qualidade do sono (data e horas dormidas)
- Histórico geral consolidado com todos os registros
- Persistência dos dados em nuvem com Firebase Firestore
- Navegação entre telas com parâmetros (ex: detalhes de um registro)
- Listagens com FlatList para exibir históricos
- Feedback visual para ações do usuário (loading, alertas, confirmações)
- Layout responsivo e refinado, com uso de ícones, imagens e tipografia adequada
- Splash screen e ícone customizado

## 🧰 Tecnologias Utilizadas
- React Native
- TypeScript
- JavaScript
- Expo
- Expo Router
- Firebase Firestore
- Styled Components
- React Hooks (useState, useEffect, useNavigation, etc)

## 📂 Estrutura de Telas
- `/` - Página inicial com navegação
- `/agua` - Registro de ingestão de água
- `/atividade` - Cadastro de atividades físicas
- `/sono` - Monitoramento do sono
- `/historico` - Tela com histórico completo (FlatList)
- `/modal` - Modal para feedbacks e confirmações

## 🚀 Como Executar
1. Clone o repositório:
   ```bash
   git clone https://github.com/Sossella05/Healthtrack
   cd Healthtrack
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
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Sossella05/Healthtrack
   cd Healthtrack
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

## 🧪 Testes Manuais Realizados
1. **Cadastro e visualização de ingestão de água:**
   - Cenário: Usuário registra quantidade de água e visualiza no histórico.
   - Resultado esperado: Registro salvo e exibido corretamente.
2. **Cadastro de atividade física:**
   - Cenário: Usuário adiciona uma atividade física e verifica no histórico.
   - Resultado esperado: Atividade aparece na lista e pode ser detalhada.
3. **Monitoramento do sono:**
   - Cenário: Usuário registra horas de sono e recebe feedback visual de sucesso.
   - Resultado esperado: Registro salvo, feedback exibido e histórico atualizado.


## 🎨 Refinamento Visual
- Ícones customizados e splash screen presentes em `src/assets/images/`
- Tipografia personalizada com fonte em `src/assets/fonts/`
- Layout responsivo testado em diferentes tamanhos de tela

## 📝 Observações
- O arquivo de configuração do Firebase (`src/config/firebaseConfig.ts`) já está incluso no repositório.
- O app utiliza navegação com parâmetros para detalhamento de registros.
- Listagens utilizam FlatList para melhor performance.
- Feedbacks visuais implementados para todas as ações principais.

---

👤 Autor: **Bruno Sossella**  
📧 Email: bdcsossella@minha.fag.edu.br  
📆 Atualizado em: 18/06/2025
