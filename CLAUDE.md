# CLAUDE.md — Todo Card App (Symfony + React)

## Visão Geral do Projeto

Aplicação full stack de gerenciamento de tarefas em cards.

- **Backend**: Symfony 7 com arquitetura Hexagonal + Modular
- **Frontend**: React 19 (Vite) com Redux + TanStack Query
- **Comunicação**: REST API JSON
- **Banco**: PostgreSQL

---

## Estrutura de Diretórios

```
project-root/
├── backend/                  # Symfony
│   ├── src/
│   │   └── Modules/
│   │       └── Todo/         # Módulo de exemplo
│   │           ├── Application/
│   │           │   ├── Command/
│   │           │   ├── Query/
│   │           │   └── DTO/
│   │           ├── Domain/
│   │           │   ├── Entity/
│   │           │   ├── Repository/   # Interfaces
│   │           │   ├── ValueObject/
│   │           │   └── Exception/
│   │           └── Infrastructure/
│   │               ├── Persistence/  # Doctrine Repositories
│   │               └── Http/
│   │                   └── Controller/
│   └── ...
└── frontend/                 # React (Vite)
    ├── src/
    │   ├── modules/
    │   │   └── todo/
    │   │       ├── api/
    │   │       ├── components/
    │   │       ├── hooks/
    │   │       └── store/
    │   ├── shared/
    │   │   ├── components/
    │   │   └── hooks/
    │   └── App.tsx
    └── ...
```

---

## Backend — Symfony (Arquitetura Hexagonal + Modular)

### Princípios Fundamentais

1. **Módulos são ilhas**: cada módulo em `src/Modules/NomeModulo/` é autossuficiente. Módulos NÃO importam classes uns dos outros diretamente — comunicação via eventos de domínio ou Application Services.
2. **A Camada de Domínio é pura**: sem Doctrine annotations, sem dependências de framework. Só PHP.
3. **Inversão de dependência sempre**: o Domain define interfaces (Ports), a Infrastructure implementa (Adapters).
4. **Commands e Queries separados (CQRS leve)**: handlers de escrita ficam em `Application/Command/`, de leitura em `Application/Query/`.

### Camadas e Responsabilidades

#### Domain (núcleo — sem dependências externas)

```php
// Domain/Entity/Todo.php
final class Todo
{
    private function __construct(
        private TodoId $id,
        private Title $title,
        private Status $status,
    ) {}

    public static function create(Title $title): self
    {
        return new self(TodoId::generate(), $title, Status::OPEN);
    }

    public function complete(): void
    {
        if ($this->status->isCompleted()) {
            throw new TodoAlreadyCompletedException($this->id);
        }
        $this->status = Status::COMPLETED;
    }
}
```

- Entidades com estado protegido (construtor privado, factory method)
- Value Objects para tudo que tem regra de validação (Title, Status, TodoId)
- Exceções de domínio descritivas em `Domain/Exception/`
- Interfaces de repositório aqui, nunca as implementações

#### Application (orquestração — depende só do Domain)

```php
// Application/Command/CreateTodo/CreateTodoCommand.php
final readonly class CreateTodoCommand
{
    public function __construct(public string $title) {}
}

// Application/Command/CreateTodo/CreateTodoHandler.php
final class CreateTodoHandler
{
    public function __construct(private TodoRepositoryInterface $repository) {}

    public function __invoke(CreateTodoCommand $command): void
    {
        $todo = Todo::create(Title::fromString($command->title));
        $this->repository->save($todo);
    }
}
```

- Um Command/Query por caso de uso
- Handlers como `__invoke` para uso com Symfony Messenger ou direto
- DTOs de saída para Queries (nunca expõe a entidade de domínio diretamente)

#### Infrastructure (detalhes técnicos — depende de tudo)

```php
// Infrastructure/Persistence/DoctrineTodoRepository.php
final class DoctrineTodoRepository implements TodoRepositoryInterface
{
    public function __construct(private EntityManagerInterface $em) {}

    public function save(Todo $todo): void
    {
        $this->em->persist($todo);
        $this->em->flush();
    }
}

// Infrastructure/Http/Controller/CreateTodoController.php
#[Route('/api/todos', methods: ['POST'])]
final class CreateTodoController extends AbstractController
{
    public function __construct(private CreateTodoHandler $handler) {}

    public function __invoke(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        ($this->handler)(new CreateTodoCommand($data['title'] ?? ''));
        return $this->json(null, Response::HTTP_CREATED);
    }
}
```

### Regras de Clean Code no Backend

- **Nada de `array` como retorno de domínio** — use Value Objects ou DTOs tipados
- **Construtores com `readonly`** quando a classe não muda após construção
- **Sem lógica nos controllers** — controllers só fazem: deserializar request → chamar handler → serializar response
- **Exceções de domínio = HTTP status correto** via ExceptionListener ou `#[AsEventListener]`
- **Nomes em inglês** para código; comentários podem ser em português se necessário
- **Sem `public` properties em entidades** — sempre getters explícitos

### Convenções de Nomenclatura

| Conceito           | Exemplo                              |
| ------------------ | ------------------------------------ |
| Command            | `CreateTodoCommand`                  |
| Handler            | `CreateTodoHandler`                  |
| Query              | `FindTodoByIdQuery`                  |
| Query Handler      | `FindTodoByIdHandler`                |
| DTO de saída       | `TodoDetailDTO`                      |
| Repositório (Port) | `TodoRepositoryInterface`            |
| Repositório (Impl) | `DoctrineTodoRepository`             |
| Value Object       | `Title`, `Status`, `TodoId`          |
| Exceção de domínio | `TodoNotFoundException`              |
| Controller         | `CreateTodoController` (um por rota) |

---

## Frontend — React (para quem vem do Vue)

> Claude deve sempre explicar o equivalente Vue ao introduzir conceitos React.

### Mapa Vue → React

| Vue                     | React                               |
| ----------------------- |-------------------------------------|
| `ref()`                 | `useState()`                        |
| `computed()`            | `useMemo()` / derivação direta      |
| `watch()`               | `useEffect()`                       |
| `defineProps()`         | parâmetro `props` do componente     |
| `defineEmits()`         | props de callback (`onClose`, etc.) |
| `provide/inject`        | `createContext` + `useContext`      |
| `Pinia store`           | Redux store                         |
| `<script setup>`        | Functional component (arrow fn)     |
| `v-if` / `v-show`       | renderização condicional com `&&`   |
| `v-for`                 | `.map()` no JSX                     |
| `v-model` em input      | `value` + `onChange`                |
| `onMounted`             | `useEffect(() => {}, [])`           |
| `router.push()`         | `useNavigate()` (React Router)      |
| `useRoute().params`     | `useParams()`                       |
| `@tanstack/vue-query`   | `@tanstack/react-query`             |

### Stack Frontend

```
React 19 + TypeScript
Vite (build tool)
Redux (estado global — equivalente ao Pinia)
TanStack Query (data fetching + cache)
React Router v7
Tailwind CSS v4
DaisyUI v5 (componentes sobre Tailwind)
```

### Padrões de Componente

```tsx
// Componente funcional padrão
// Vue: <script setup> com defineProps
// React: função que recebe props como parâmetro

interface TodoCardProps {
  id: string;
  title: string;
  status: 'open' | 'completed';
  onComplete: (id: string) => void; // equivalente a defineEmits
}

export function TodoCard({ id, title, status, onComplete }: TodoCardProps) {
  // useState = ref()
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="...">
      <h3>{title}</h3>
      {/* v-if = && ou ternário */}
      {status === 'open' && (
        <button onClick={() => onComplete(id)}>Concluir</button>
      )}
    </div>
  );
}
```

### Estado Global com Redux Toolkit (equivalente ao Pinia)

```tsx
// Vue Pinia:
// const store = defineStore('todo', () => { const selectedId = ref(null) })

// React Redux Toolkit — slice (estado + actions de um domínio)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoState {
  selectedId: string | null;
}

const todoSlice = createSlice({
  name: 'todo',
  initialState: { selectedId: null } as TodoState,
  reducers: {
    setSelectedId: (state, action: PayloadAction<string | null>) => {
      state.selectedId = action.payload;
    },
  },
});

export const { setSelectedId } = todoSlice.actions;
export default todoSlice.reducer;

// Uso no componente (com hooks tipados de src/store/hooks.ts):
const selectedId = useAppSelector((state) => state.todo.selectedId);
const dispatch = useAppDispatch();

dispatch(setSelectedId('abc-123'));
```

### Data Fetching com TanStack Query

```tsx
// Buscar lista
export function useTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: () => api.get<Todo[]>('/todos'),
  });
}

// Mutação (criar/editar/deletar)
export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title: string) => api.post('/todos', { title }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });
}

// No componente:
const { data: todos, isLoading } = useTodos();
const createTodo = useCreateTodo();

createTodo.mutate('Nova tarefa');
```

### Custom Hooks (equivalente aos Composables do Vue)

```tsx
// Vue: useXxx() em composables/
// React: exatamente o mesmo padrão, mas com hooks

export function useTodoActions(todoId: string) {
  const completeTodo = useCompleteTodo();

  const handleComplete = useCallback(() => {
    completeTodo.mutate(todoId);
  }, [todoId, completeTodo]);

  return { handleComplete, isLoading: completeTodo.isPending };
}
```

### Tailwind CSS + DaisyUI — Convenções de Uso

#### Hierarquia de estilização

Sempre preferir nesta ordem:

1. **Componente DaisyUI** — se existir um componente pronto, use-o
2. **Utilitários Tailwind** — para ajustes de layout, espaçamento, tamanho
3. **CSS customizado** — apenas em último caso (via `@layer components` no CSS global)

#### Componentes DaisyUI mais usados no projeto

```tsx
// Card
<div className="card bg-base-100 shadow-md">
  <div className="card-body">
    <h2 className="card-title">Título</h2>
    <p>Conteúdo</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Ação</button>
    </div>
  </div>
</div>

// Badge de status
<span className="badge badge-success">Concluído</span>
<span className="badge badge-ghost">Aberto</span>

// Input de formulário
<label className="form-control w-full">
  <div className="label">
    <span className="label-text">Título</span>
  </div>
  <input type="text" className="input input-bordered" />
</label>

// Modal
<dialog className="modal modal-open">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Título</h3>
    <div className="modal-action">
      <button className="btn">Fechar</button>
    </div>
  </div>
</dialog>

// Loading
<span className="loading loading-spinner loading-md" />
```

#### Tema e tokens

- Usar **semantic tokens do DaisyUI** em vez de cores hardcoded do Tailwind:
    - ✅ `bg-base-100`, `bg-base-200`, `text-base-content`
    - ✅ `text-primary`, `bg-error`, `border-warning`
    - ❌ `bg-white`, `text-gray-800` (quebra o tema claro/escuro)
- O tema é definido no `<html data-theme="...">` — não usar `dark:` do Tailwind manualmente

#### Regras de estilo

- **Não misturar** classes de layout Tailwind (`flex`, `grid`, `p-4`) com classes de componente DaisyUI (`btn`, `card`) de forma confusa — o layout fica no wrapper, o componente DaisyUI dentro
- **Variantes de componente** via sufixo: `btn-primary`, `btn-ghost`, `btn-sm`, `input-error`
- **Responsividade** com prefixos Tailwind normalmente: `sm:`, `md:`, `lg:`
- **Nunca usar `style={{}}`** inline para coisas que o Tailwind resolve

#### Exemplo de componente bem estilizado

```tsx
interface TodoCardProps {
  title: string;
  status: 'open' | 'completed';
  onComplete: () => void;
}

export function TodoCard({ title, status, onComplete }: TodoCardProps) {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-shadow">
      <div className="card-body gap-3">
        <div className="flex items-start justify-between gap-2">
          <h2 className="card-title text-base">{title}</h2>
          <span className={`badge ${status === 'completed' ? 'badge-success' : 'badge-ghost'}`}>
            {status === 'completed' ? 'Concluído' : 'Aberto'}
          </span>
        </div>
        {status === 'open' && (
          <div className="card-actions justify-end">
            <button className="btn btn-primary btn-sm" onClick={onComplete}>
              Concluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

### Regras de Clean Code no Frontend

- **Sem lógica nos componentes de UI** — extraia para custom hooks
- **Componentes menores que 100 linhas** como meta
- **Tipos explícitos** — sem `any`
- **`useCallback`** para funções passadas como props (evita re-renders)
- **`useMemo`** só quando realmente necessário (não prematuramente)
- Prefira **composição** sobre componentes gigantes
- Separe `api/` (chamadas HTTP) de `hooks/` (lógica de estado)
- **DaisyUI primeiro** — só use Tailwind puro quando o DaisyUI não tiver o componente
- **Semantic tokens sempre** — nunca cores hardcoded do Tailwind (`gray-*`, `white`, `black`)

---

## API Contract

### Endpoints base

```
GET    /api/todos          → lista todos os cards
POST   /api/todos          → cria card { title }
GET    /api/todos/{id}     → detalhe do card
PATCH  /api/todos/{id}     → atualiza { title?, status? }
DELETE /api/todos/{id}     → remove card
```

### Response padrão

```json
// Lista
{ "data": [ { "id": "uuid", "title": "string", "status": "open|completed", "createdAt": "ISO8601" } ] }

// Erro
{ "error": { "code": "TODO_NOT_FOUND", "message": "Todo not found" } }
```

---

## Instruções de Comportamento para o Claude

1. **Ao criar código Symfony**, sempre respeitar as camadas: Domain → Application → Infrastructure. Nunca colocar lógica de negócio no Controller ou no Repository.

2. **Ao criar código React**, sempre explicar o equivalente Vue antes do código React quando introduzir um conceito novo.

3. **Antes de criar qualquer arquivo**, perguntar em qual módulo/contexto ele se encaixa se não estiver claro.

4. **Ao criar um novo módulo**, criar sempre a estrutura completa das três camadas com arquivos placeholder.

5. **Testes**: handlers de comando/query devem ter testes unitários. Usar PHPUnit + prophecy ou mock nativo.

6. **Um arquivo por responsabilidade** — sem "classes utilitárias genéricas".

7. **Ao sugerir algo fora do padrão arquitetural**, avisar explicitamente e justificar.

8. **Executar uma tarefa por vez** — nunca criar backend + frontend ao mesmo tempo sem confirmação explícita.

O projeto react web está no diretório web 
O projeto symfony api está no diretório api