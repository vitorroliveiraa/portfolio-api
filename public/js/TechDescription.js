function TechDescription(tag) {
  const dataTech = tag.attributes["0"].nodeValue;
  let description = "";

  switch (dataTech) {
    case "nodejs":
      document.getElementById("nodejs").style.visibility = "initial";

      description = `NodeJS é um ambiente de execução javascript server-side,
      que possibilita a criação de aplicações assíncronas orientadas a eventos,
      permitindo grande escalabilidade.`;
      document.getElementById("describeSkill").innerHTML = description;
      break;

    case "typescript":
      document.getElementById("typescript").style.visibility = "initial";

      description = `TypeScript é um superconjunto de JavaScript, tornando-se
      uma ferramenta com formas eficientes de codificar e adicionando recursos
      não presentes nativamente.`;
      document.getElementById("describeSkill").innerHTML = description;
      break;

    case "expressjs":
      document.getElementById("expressjs").style.visibility = "initial";

      description = `Express é um framework rápido e o mais popular para criar e
      estruturar aplicações em Nodejs de forma fácil e limpa.`;
      document.getElementById("describeSkill").innerHTML = description;
      break;

    case "html":
      document.getElementById("html").style.visibility = "initial";

      description = `HTML (HyperText Markup Language) é uma linguagem baseada em
      marcação, onde marcamos elementos para definir suas informações e
      estruturar páginas web.`;
      document.getElementById("describeSkill").innerHTML = description;
      break;

    case "css":
      document.getElementById("css").style.visibility = "initial";

      description = `CSS (Cascading Style Sheets) é uma linguagem de criação de
      estilos, que combinada com HTML, define qual será a aparência de uma
      página web.`;
      document.getElementById("describeSkill").innerHTML = description;
      break;

    case "javascript":
      document.getElementById("javascript").style.visibility = "initial";

      description = `JavaScript é uma linguagem de programação interpretada
      estruturada, de script em alto nível com tipagem dinâmica fraca e multiparadigma.`;
      document.getElementById("describeSkill").innerHTML = description;
      break;

    case "nestjs":
      document.getElementById("nestjs").style.visibility = "initial";

      description = `NestJS é um framework open source destinado ao
      desenvolvimento de aplicações server-side que traz eficiência e
      escalabilidade ao processo.`;
      document.getElementById("describeSkill").innerHTML = description;
      break;

    case "graphql":
      document.getElementById("graphql").style.visibility = "initial";

      description = `<p>GraphQL <i>(Graph Query Language)</i> é uma linguagem de consulta
      utilizada para a manipulação de dados em APIs, que auxilia no retorno de
      informações específicas e nada mais 🎯.</p>`;
      document.getElementById("describeSkill").innerHTML = description;
      break;

    case "api":
      document.getElementById("api").style.visibility = "initial";

      description = `<p>API <i>(Application Programming Interface)</i> é um
      conjunto de normas que possibilitam a comunicação entre plataformas
      através de uma série de padrões e protocolos.</p>`;
      document.getElementById("describeSkill").innerHTML = description;
      break;

    case "git":
      document.getElementById("git").style.visibility = "initial";

      description = `Git é o sistema de controle de versão open source mais
      usado no mundo atualmente, que auxilia no gerenciamento de alterações em
      código fonte.`;
      document.getElementById("describeSkill").innerHTML = description;
      break;

    case "jest":
      document.getElementById("jest").style.visibility = "initial";

      description = `Jest é um framework de testes para JavaScript projetado
      para garantir a correção de qualquer código JavaScript.`;
      document.getElementById("describeSkill").innerHTML = description;
      break;

    case "csharp":
      document.getElementById("csharp").style.visibility = "initial";

      description = `C# é uma linguagem de programação, multiparadigma, de
      tipagem forte, sendo a principal da plataforma .NET.`;
      document.getElementById("describeSkill").innerHTML = description;
      break;

    case "docker":
      document.getElementById("docker").style.visibility = "initial";

      description = `Docker é uma tecnologia de conteinerização open source
      usada para empacotar, entregar e executar aplicações em containers Linux.`;
      document.getElementById("describeSkill").innerHTML = description;
      break;

    case "postgresql":
      document.getElementById("postgresql").style.visibility = "initial";

      description = `PostgreSQL é um banco de dados relacional de software livre
      com suporte de 30 anos de desenvolvimento, sendo um dos bancos de dados
      relacionais mais estabelecidos disponíveis.`;
      document.getElementById("describeSkill").innerHTML = description;
      break;

    case "sqlserver":
      document.getElementById("sqlserver").style.visibility = "initial";

      description = `Microsoft SQL Server é um sistema gerenciador de Banco de
      dados relacional desenvolvido e mantido pela Microsoft.`;
      document.getElementById("describeSkill").innerHTML = description;
      break;

    case "typeorm":
      document.getElementById("typeorm").style.visibility = "initial";

      description = `<p>TypeORM é um ORM <i>(object-relational mapper)</i> que
      facilita a vinculação de seu aplicativo TypeScript a um banco de dados de
      banco de dados relacional ou não relacional.`;
      document.getElementById("describeSkill").innerHTML = description;
      break;

    case "prisma":
      document.getElementById("prisma").style.visibility = "initial";

      description = `<p>Prisma é um ORM <i>(object-relational mapper)</i> com
      uma abordagem diferente de classes e decoradores, focando em um único
      arquvio chamado <b>schema</b>.</p>`;
      document.getElementById("describeSkill").innerHTML = description;
      break;

    default:
      break;
  }
}

function ClearDescription() {
  const defaultDescription = "Passe o cursor do mouse para ler.";
  document.getElementById("describeSkill").innerHTML = defaultDescription;

  document.querySelectorAll("label").forEach((tag) => {
    if (tag.attributes["0"].name != "id") return;

    const elementID = tag.attributes["0"].nodeValue;
    document.getElementById(elementID).style.visibility = "hidden";
  });
}
