# ByteReports

Aplicativo desktop para diagnóstico de hardware Windows — simples, didático e 100% local.

---

> 📢 **Nota de Portfólio Acadêmico**
> Este repositório consiste em um espelhamento individual e independente do projeto **ByteReports**, desenvolvido originalmente em grupo durante o 1º semestre de 2026 para a disciplina de **Projeto Integrador III** do curso de Ciência da Computação do UniCEUB. Este espaço tem como finalidade centralizar os artefatos, históricos de versionamento e evidências técnicas para a **avaliação individual do aluno Áleff**.

---

## 🔗 Módulos e Repositórios Espelhados
Para fins de auditoria e avaliação do código-fonte e documentação histórica, os módulos integrados podem ser acessados individualmente nos links privados abaixo:

*  **[Módulo de Documentação Histórica](https://github.com/Aleff5/ByteReports/tree/main/Documenta%C3%A7%C3%A3o)**
*  **[Interface Gráfica - Frontend React](https://github.com/Aleff5/ByteReports/tree/main/ByteReports-frontend)**
*  **[Motor de Diagnóstico - Backend Python](https://github.com/Aleff5/ByteReports/tree/main/ByteReports-backend)**
*  **[Configurações de Workflow (.github)](https://github.com/Aleff5/github-bkp)**

---

##  Sumário
* [Sobre o Projeto](#sobre-o-projeto)
* [Equipe e Escopo de Atuação](#equipe-e-escopo-de-atuação)
* [Principais Contribuições Individuais - Áleff ](#-principais-contribuições-individuais-áleff-campos)
* [Funcionalidades](#-funcionalidades)
* [Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [Arquitetura do Sistema](#-arquitetura-do-sistema)
* [Estrutura dos Repositórios](#-estrutura-dos-repositórios)
* [Requisitos do Sistema](#-requisitos-do-sistema)

---

##  Sobre o Projeto

O ByteReports é um aplicativo desktop para Windows que realiza varreduras e diagnósticos nos principais componentes de hardware do computador, gerando relatórios claros e acessíveis voltados para usuários com pouco conhecimento técnico.

### O Problema
Com base em pesquisas de mercado, constatou-se que a grande maioria dos softwares de diagnóstico disponíveis são excessivamente técnicos ou ocultam informações atrás de interfaces complexas. O ByteReports preenche essa lacuna traduzindo dados brutos de hardware em linguagem acessível, fornecendo recomendações práticas passo a passo.

---

##  Equipe e Escopo de Atuação

| Integrante | Atuação Principal no Projeto |
| :--- | :--- |
| **Áleff Matheus Pinheiro Campos** | **Planejamento Estratégico, Interface com Stakeholder e Code Review Técnico.** |
| Bruno Monteiro Fonseca | Arquitetura de Software e Desenvolvimento (Backend/Frontend) |
| Guilherme Miranda Cavalcante | Scrum Master e Desenvolvimento (Backend/Frontend) |
| José Waldo Saraiva Câmara Neto | Documentação e Desenvolvimento Backend |
| Luiz Felipe Santos de Abreu | Product Owner e Desenvolvimento (Backend/Frontend) |

* **Orientação Acadêmica:** Professora Kadidja Valéria Reginaldo de Oliveira
* **Stakeholder Institucional:** Cleber Machado Ortiz

---

##  Principais Contribuições Individuais (Áleff Campos)

Neste projeto integrador, minha atuação focou no alinhamento estratégico, viabilidade técnica e garantia de qualidade do software através das seguintes frentes documentadas no histórico:

1. **Engenharia de Requisitos e Interface Presencial:** Responsável pela ponte direta com o *stakeholder* (Cleber Machado Ortiz), realizando o levantamento de requisitos inicial e refinamento do escopo do aplicativo desktop para garantir aderência às necessidades reais.
2. **Garantia de Qualidade e Code Review:** Atuação na revisão de código da camada de persistência e chamadas assíncronas do backend em Python, identificando gargalos na comunicação via API interna (HTTP) antes da consolidação das Sprints.

---

##  Funcionalidades

* **Análise de Hardware Nativa:** Varredura automática de CPU, RAM, armazenamento (HD/SSD/NVMe) e GPU utilizando a infraestrutura nativa do Windows (WMI).
* **Tratamento de Severidade Visual:** Classificação automatizada através de alertas visuais (🟢 Saudável, 🟡 Atenção, 🔴 Crítico).
* **Acessibilidade Integrada:** Tooltips explicativos para siglas técnicas, modo claro/escuro e paleta de cores adaptada para daltonismo.
* **Exportação Local:** Geração de relatórios nos formatos PDF e TXT em versões simplificada (leigo) e detalhada (técnica).

---

##  Tecnologias Utilizadas

* **Backend:** Python 3 + WMI (Windows Management Instrumentation) + API HTTP Local.
* **Frontend:** React (Vite) + JavaScript + CSS3.
* **Gestão e Controle:** GitHub, Figma (Prototipação), Discord (Sprints e Atas).

---

## Arquitetura do Sistema

O sistema opera de forma 100% local, dividindo-se em três camadas principais:

```text
┌─────────────────────────────────────────┐
│         Camada de Apresentação          │
│              (React - Frontend)         │
│  Telas: Início · Varredura · Relatório  │
└─────────────────┬───────────────────────┘
                  │ API local (HTTP)
┌─────────────────▼───────────────────────┐
│        Camada de Lógica de Negócio      │
│             (Python - Backend)          │
│ Diagnóstico · Classificação · Exportação│
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Camada de Coleta de Dados       │
│        (WMI - APIs nativas Windows)     │
│  CPU · RAM · Armazenamento · Bateria    │
└─────────────────────────────────────────┘
```

##  Estrutura dos Repositórios

```text
ByteReports/
├── ByteReports-backend/        # Módulos de telemetria e classificação em Python
├── ByteReports-frontend/       # Interface com o usuário construída em React
└── ByteReports-documentos/     # Relatórios de Sprints, diagramas e atas de reuniões
```

##  Roadmap de Evolução (PI-IV)

Para a continuidade do projeto no próximo semestre, o planejamento estratégico prevê:

- [ ] Implementação do histórico cumulativo de análises locais.
- [ ] Leitura avançada de desgaste de bateria (Cycle Count) para notebooks.
- [ ] Algoritmo preditivo para estimativa de vida útil de HDs/SSDs.

<br>

*Desenvolvido em Brasília — UniCEUB, 2026*
