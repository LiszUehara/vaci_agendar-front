# 🩺 Vaci_Agendar

Bem-vindo ao repositório do **Vaci_Agendar**! Este projeto é um sistema de agendamento de vacinas, projetado para facilitar a marcação e gerenciamento de horários para a vacinação contra COVID-19.

## 🚀 Instalando o Vaci_Agendar

Para instalar o **Vaci_Agendar**, siga estas etapas:

### 1. Baixando o Repositorio [LiszUehara](https://github.com/LiszUehara/vaci_agendar-front.git):
```bash
     git clone
     https://github.com/LiszUehara/vaci_agendar-front.git
```
### 2. Instale as dependências


#### Usando [npm](https://github.com/npm/cli):
```bash
     npm install
```


### 3. Preencher .env de acordo com .env.example

```
   VITE_BACKEND_URL='http://localhost:4462'

```

### 3. Passo as dependências
1. Executando com  [yarn](https://github.com/yarnpkg/yarn)
    
```bash
      yarn dev
```

2. Executando com [npm](https://github.com/npm/cli):
```bash
      npm run dev
```

  
## 🛠️ Funcionalidades

✅ **Alta demanda de vacinação**: Desenvolver soluções para gerenciar o grande número de pacientes que necessitam da vacina contra COVID-19. Porém só são permitidos 20 agendamentos por dia. 

✅ **Controle de Agenda**: Somente são permitidos dois agedamentos por hora 
  
✅ **Portal de Agendamento**:

  - 📅 **Agendamento de Pacientes**: O processo consiste na criação de um portal onde será possível:
    - Agendar pacientes para tomar a vacina.

  - 📅 **Consulta de Agendamentos**: Construir uma página para visualizar os agendamentos feitos por dia e horário.

✅  🚫  **Limitação de Horário Comercial**: Garantir que o sistema respeite as regras de horário dos postos de saúde, limitando os agendamentos a horários de 8:00 as 22:00.

✅  🚫  **Limitação de Dias que já passaram**: 
Para garantir a integridade do sistema o mesmo não permite agendamento em dias que já passaram ou horarios que já passaram.



✅ **Edição de Agendamentos**:
  - ✏️ Permitir a edição de agendamentos já realizados para garantir a veracidade dos dados e possibilitar reagendamentos quando necessário.

✅ **Ordenação e Controle**:
  - 🔍 Implementar a ordenação por ordem de agendamento para melhorar o controle do histórico e dos pacientes que utilizam o serviço.
  - 🔍 **Pesquisa por CPF**: A pesquisa de registros é feita por CPF.

✅ **Segurança no Cadastro**:
  - 🔒 **Cadastro Único por CPF**: Garantir que cada CPF seja registrado apenas uma vez para evitar fraudes.
  - 🔒 **Validação de CPF**: Utilizar a biblioteca [validations-br](https://www.npmjs.com/package/validations-br) para validar CPF e evitar cadastros fraudulentos.
  - 🔒 **Validação de Nomes**: Usar Regex para evitar nomes inválidos ou falsos.

✅ **Controle de Datas e Horários**:
  - 📅 **React Datepicker**: Utilizar `react-datepicker` para fornecer um controle aprimorado de datas, com suporte para horas sem minutos, conforme necessário.
  - 📅 **Desabilitação de Horários Passados**: Garantir que apenas horários futuros estejam disponíveis para agendamento, com atendimento permitido das 8:00 às 22:00.

## 🧪 Testes

Esta seção fornece informações sobre como executar os testes para o projeto **Vaci_Agendar**, além de exemplos e ferramentas utilizadas.

- **[Jest](https://jestjs.io/)**: Um framework de testes em JavaScript para garantir que o código está funcionando conforme o esperado.
- **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro)**: Uma biblioteca para testar componentes React de maneira que simula o comportamento do usuário.

### 🏃 Executando os Testes

Para executar os testes, siga estas etapas:

1. **Instale as dependências** (se ainda não o fez):
    ```bash
    $ npm install
    ```

2. **Execute os testes com Jest**:
    ```bash
    $ npm test
    ```

   Ou, se estiver usando Yarn:
    ```bash
    $ yarn test
    ```


##### obs: Não foi realizado teste no service/api logo a coverage do mesmo será baixa.

---

---
<br>
Desenvolvido com paixão por <strong>Ianca Lisandra Uehara Xavier</strong>.

<br>


---
---


## 💬 Contato

-  📧 **Email**: [ueharalisandra@gmail.com](ueharalisandra@gmail.com)
-  💬 **Slack**: Lisandra Uehara
