# LinkedIn — Protocolo de Aplicação via TeamViewer + Computer Use

## Veredito

A aplicação direta via DOM, Playwright ou extensão do Chrome não deve ser usada para editar o perfil do LinkedIn.

O caminho operacional correto é:

```text
Codex Computer Use -> janela local do TeamViewer -> Windows remoto -> LinkedIn autenticado
```

Se o LinkedIn estiver no mesmo Windows do Codex, o TeamViewer é desnecessário: usar Computer Use diretamente no Chrome já autenticado.

## Escopo autorizado

Pode:

- operar visualmente TeamViewer ou Chrome já aberto;
- abrir o perfil público correto;
- ler campos públicos necessários;
- comparar com backup;
- editar somente Headline e Sobre usando `linkedin-apply-approved.txt`;
- salvar cada campo isoladamente;
- verificar persistência;
- atualizar changelog.

Não pode:

- publicar posts;
- enviar mensagens;
- abrir conversas privadas;
- alterar senha, privacidade, e-mail, telefone ou URL pública;
- mexer em conexões;
- alterar experiências, formação, competências ou datas sem aprovação específica;
- instalar extensões;
- usar DevTools;
- executar scripts no LinkedIn;
- usar sequências longas de Backspace;
- salvar texto concatenado.

## Fontes de verdade

- `linkedin-before/profile-before.md` — estado anterior salvo.
- `linkedin-apply-approved.txt` — texto final para cola.
- `linkedin-target-state.md` — estado alvo documentado.
- `linkedin-after/change-log.md` — log de execução.

## Pré-voo obrigatório

Antes de editar:

- TeamViewer ou Chrome está aberto e respondendo.
- LinkedIn está autenticado.
- Perfil correto está aberto: `https://www.linkedin.com/in/samuel-paes-54143a173/`.
- Nenhum modal de edição pendente está aberto.
- O texto visível atual bate com `profile-before.md` ou a divergência está documentada.

## Máquina de estados

### 1. Ler

- Abrir um campo.
- Capturar o valor atual.
- Comparar com backup.
- Parar se houver divergência inesperada.

### 2. Preparar

- Copiar o valor aprovado de `linkedin-apply-approved.txt`.
- Clicar no campo correto.
- Confirmar foco.

### 3. Substituir

- Pressionar `Ctrl+A` uma única vez.
- Confirmar visualmente que apenas o conteúdo do campo foi selecionado.
- Colar o texto aprovado.
- Não usar script, DOM ou sequência longa de Backspace.

### 4. Validar antes de salvar

Confirmar:

- início exato;
- final exato;
- ausência do texto antigo duplicado;
- campo correto;
- nenhum outro campo alterado.

### 5. Salvar

- Clicar em Salvar uma única vez.
- Esperar confirmação ou estabilização visual.
- Não clicar repetidamente.

### 6. Verificar persistência

- Voltar ao perfil público.
- Recarregar.
- Confirmar o valor.
- Reabrir o editor.
- Confirmar novamente.

### 7. Registrar

Somente depois da verificação:

- criar `linkedin-after/profile-after.md`;
- atualizar `linkedin-after/change-log.md`;
- registrar campo, antes, depois, horário e validação.

## Condições de parada

Parar sem salvar quando:

- texto novo for anexado ao antigo;
- `Ctrl+A` selecionar a página inteira;
- foco sair do campo;
- TeamViewer congelar;
- LinkedIn pedir login, verificação ou CAPTCHA;
- a tela mudar inesperadamente;
- houver dúvida sobre o perfil correto;
- qualquer campo fora do escopo for alterado.

## Critério de conclusão

A tarefa só está concluída quando:

- Headline foi salva e verificada no perfil público e no editor.
- Sobre foi salvo e verificado no perfil público e no editor.
- `profile-after.md` foi criado com o estado real observado.
- `change-log.md` foi atualizado.
- Nenhuma área fora do escopo foi acessada.
