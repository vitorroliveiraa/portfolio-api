function TechDescription(tag) {
  const dataTech = tag.attributes['0'].nodeValue;
  let description = "";

  switch (dataTech) {
    case 'nodejs':
      document.getElementById('nodejs').style.visibility = 'initial';

      description = 'O NodeJS é uma tecnologia single-tread.';
      document.getElementById('describeSkill').innerHTML = description;
      break;

    case 'typescript':
      document.getElementById('typescript').style.visibility = 'initial';

      description = 'O Typescript é um superset do javascript.';
      document.getElementById('describeSkill').innerHTML = description;
      break;

    case 'expressjs':
      document.getElementById('expressjs').style.visibility = 'initial';

      description = 'O Express é um framework javascript minimalista e maleável.';
      document.getElementById('describeSkill').innerHTML = description;
      break;

    case 'html':
      document.getElementById('html').style.visibility = 'initial';

      description = 'É uma linguagem de marcação, utilizada para estruturação de páginas web.';
      document.getElementById('describeSkill').innerHTML = description;
      break;

    case 'css':
      document.getElementById('css').style.visibility = 'initial';

      description = 'É uma linguagem de marcação, utilizada para estruturação de páginas web.';
      document.getElementById('describeSkill').innerHTML = description;
      break;

    case 'javascript':
      document.getElementById('javascript').style.visibility = 'initial';

      description = 'É uma linguagem de marcação, utilizada para estruturação de páginas web.';
      document.getElementById('describeSkill').innerHTML = description;
      break;

    case 'nestjs':
      document.getElementById('nestjs').style.visibility = 'initial';

      description = 'É uma linguagem de marcação, utilizada para estruturação de páginas web.';
      document.getElementById('describeSkill').innerHTML = description;
      break;

    case 'graphql':
      document.getElementById('graphql').style.visibility = 'initial';

      description = 'É uma linguagem de marcação, utilizada para estruturação de páginas web.';
      document.getElementById('describeSkill').innerHTML = description;
      break;

    case 'restapi':
      document.getElementById('restapi').style.visibility = 'initial';

      description = 'É uma linguagem de marcação, utilizada para estruturação de páginas web.';
      document.getElementById('describeSkill').innerHTML = description;
      break;

    case 'git':
      document.getElementById('git').style.visibility = 'initial';

      description = 'É uma linguagem de marcação, utilizada para estruturação de páginas web.';
      document.getElementById('describeSkill').innerHTML = description;
      break;

    case 'jest':
      document.getElementById('jest').style.visibility = 'initial';

      description = 'É uma linguagem de marcação, utilizada para estruturação de páginas web.';
      document.getElementById('describeSkill').innerHTML = description;
      break;

    case 'csharp':
      document.getElementById('csharp').style.visibility = 'initial';

      description = 'É uma linguagem de marcação, utilizada para estruturação de páginas web.';
      document.getElementById('describeSkill').innerHTML = description;
      break;

    case 'docker':
      document.getElementById('docker').style.visibility = 'initial';

      description = 'É uma linguagem de marcação, utilizada para estruturação de páginas web.';
      document.getElementById('describeSkill').innerHTML = description;
      break;

    case 'postgresql':
      document.getElementById('postgresql').style.visibility = 'initial';

      description = 'É uma linguagem de marcação, utilizada para estruturação de páginas web.';
      document.getElementById('describeSkill').innerHTML = description;
      break;

    case 'sqlserver':
      document.getElementById('sqlserver').style.visibility = 'initial';

      description = 'É uma linguagem de marcação, utilizada para estruturação de páginas web.';
      document.getElementById('describeSkill').innerHTML = description;
      break;

    case 'typeorm':
      document.getElementById('typeorm').style.visibility = 'initial';

      description = 'É uma linguagem de marcação, utilizada para estruturação de páginas web.';
      document.getElementById('describeSkill').innerHTML = description;
      break;

    case 'prisma':
      document.getElementById('prisma').style.visibility = 'initial';

      description = 'É uma linguagem de marcação, utilizada para estruturação de páginas web.';
      document.getElementById('describeSkill').innerHTML = description;
      break;

    default:
      break;
  }
}

function ClearDescription() {
  const defaultDescription = 'Passe o cursor do mouse para ler.';
  document.getElementById('describeSkill').innerHTML = defaultDescription;

  document.querySelectorAll('label').forEach((tag) => {
    if (tag.attributes['0'].name != 'id') return;

    const elementID = tag.attributes['0'].nodeValue;
    document.getElementById(elementID).style.visibility = 'hidden';
  });
}