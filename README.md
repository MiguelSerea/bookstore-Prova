README - Estrutura e Implementação do Projeto

1. Organização da estrutura do projeto (0,5)
---------------------------------------------
- As pastas do projeto estão organizadas da seguinte forma:
  - components/: componentes reutilizáveis. Exemplo: BookCounter, Card customizado, etc. 
  - screens/: telas principais do app. Exemplo: AddBookScreen.js, BookListScreen.js.
  - redux/: gerenciamento global de estado. Exemplo: store.js, bookSlice.js.
  - context/: contextos globais. Exemplo: ThemeContext.js para alternância de tema.
  - navigation/: onde ficam as configurações de navegação (stack/bottom tab/etc).

2. Tela de cadastro implementada corretamente (2,0)
---------------------------------------------------
- Local: screens/AddBookScreen.js
- Utiliza:
  - TextInput para campos como título, autor, ano.
  - RadioButton.Group para escolha do gênero do livro.
  - Checkbox para informar disponibilidade.
  - Validação básica: impede cadastro se algum campo obrigatório estiver vazio.
  - Adiciona ou edita livros armazenados em memória via useState e Redux.

3. Uso do Redux para contador total (1,5)
-----------------------------------------
- Local: redux/bookSlice.js e components/BookCounter.js
- Redux Store é centralizada em redux/store.js.
- No slice (redux/bookSlice.js) estão implementados os reducers para adicionar, editar e remover livros.
- O componente BookCounter mostra, em tempo real, o total de livros usando useSelector para acessar o estado global.

4. Alternância de tema com Context API (1,0)
--------------------------------------------
- Local: context/ThemeContext.js
- ThemeContext criado para alternância de tema claro/escuro.
- useContext utilizado nas telas e no App.js para aplicar o tema dinamicamente no layout.
- Botão de troca de tema altera aparência global instantaneamente.

5. Tela de listagem com CRUD funcional (2,0)
-------------------------------------------
- Local: screens/BookListScreen.js
- Utiliza DataTable (ou pode ser FlatList/Card se solicitado) para exibir livros.
- CRUD completo:
  - Editar (ícone de lápis, modal de edição)
  - Excluir (ícone de lixeira, modal de confirmação)
  - Adicionar (via tela de cadastro)
- Filtragem por gênero com Chips interativos.
- Utilização de Checkbox ou cor/ícone (vermelho para indisponível) para indicar status de disponibilidade.
- O programa pode ser iniciado para web com:
    npm start
  ou
    expo start
  E acessar pelo navegador: http://localhost:19006/

Observação:
-----------
- Certifique-se de que as dependências do projeto (React Native Paper, React Navigation, Redux Toolkit, etc) estão instaladas.
- Para rodar no navegador, utilize o comando 'expo start', escolha opção 'w' para web, e acesse a porta indicada no terminal.
