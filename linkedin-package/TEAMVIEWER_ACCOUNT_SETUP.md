# TeamViewer — Conta e Launcher Dedicado

## Objetivo

Criar uma superfície estável para aplicação assistida do perfil LinkedIn usando:

```text
Computer Use -> TeamViewer dedicado -> LinkedIn autenticado
```

## Launcher dedicado

Foi criado um atalho local na área de trabalho:

```text
C:\Users\samue\Desktop\TeamViewer - LinkedIn Seguro.lnk
```

Também foi criada uma cópia no Menu Iniciar:

```text
C:\Users\samue\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\TeamViewer - LinkedIn Seguro.lnk
```

Além do launcher simples do TeamViewer, existe um launcher operacional completo:

```text
linkedin-package\tools\Start-LinkedIn-TeamViewer-Flow.ps1
```

Ele abre:

- TeamViewer;
- texto aprovado do LinkedIn;
- protocolo de aplicação;
- perfil público correto no Chrome.

Esse launcher não armazena credenciais, ID, senha, 2FA ou código de sessão.

Atalhos criados:

```text
C:\Users\samue\Desktop\Paes LinkedIn - Abrir Ambiente Seguro.lnk
C:\Users\samue\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Paes LinkedIn - Abrir Ambiente Seguro.lnk
```

Destino:

```text
C:\Program Files\TeamViewer\TeamViewer.exe
```

Uso recomendado:

1. Abrir o launcher dedicado.
2. Entrar na conta TeamViewer manualmente.
3. Conectar ao dispositivo/sessão correta.
4. Deixar o Chrome remoto no perfil LinkedIn correto.
5. Só então acionar Computer Use.

## Conta TeamViewer

A criação ou login da conta deve ser feita manualmente pelo usuário.

O Codex não deve:

- criar senha;
- visualizar senha;
- salvar senha no navegador;
- copiar código 2FA;
- registrar e-mail de autenticação;
- registrar ID, senha ou código de sessão do TeamViewer em arquivos;
- aceitar permissões permanentes sem confirmação específica.

## Configuração segura recomendada

- Usar uma conta TeamViewer própria para este fluxo.
- Ativar autenticação em dois fatores.
- Conectar manualmente antes de entregar ao Codex.
- Não compartilhar ID/senha/código no chat.
- Revogar acesso ou encerrar a sessão após a aplicação.

## Checklist antes de continuar

```text
[ ] Launcher dedicado aberto.
[ ] Conta TeamViewer criada/logada manualmente.
[ ] Sessão remota conectada.
[ ] Mouse e teclado funcionam na sessão.
[ ] LinkedIn está autenticado.
[ ] Perfil correto está aberto:
    https://www.linkedin.com/in/samuel-paes-54143a173/
[ ] Nenhum modal de edição está aberto.
[ ] Nenhum dado sensível está visível.
```

## Próxima etapa

Quando o checklist estiver completo, continuar com:

```text
linkedin-package/TEAMVIEWER_COMPUTER_USE_PROTOCOL.md
```
