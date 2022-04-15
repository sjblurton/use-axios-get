# useAxiosGet

useAxiosGet gets data form a rest API, stores it in the cache, error handles, and passes a status for loading, error, and successful fetching.

### **install**

```bash
npm i @sjblurton/use-axios-get

yarn add @sjblurton/use-axios-get
```

### Import useArray

```bash
import useAxiosGet from "@sjblurton/use-axios-get";
```

### **To call the hook...**

```bash
  const {status, data, error, mutate} = useAxiosGet<Data>(

```

### **Possible Use Sanarios**

```bash
function App() {
  const {status, data: todos, error, mutate} = useAxiosGet<MockData>(
    "https://jsonplaceholder.typicode.com/todos"
  );

  if (status === "idle") return <div>idling...</div>;
  if (status === "pending") return <div>loading...</div>;
  if (status === "error") return <div>{error?.message}</div>;

  return (
    <div className="App">
      {todos?.map((todo) => (
        <h2>{todo.title}</h2>
      ))}
      <button onClick={mutate}>Mutate</button>
    </div>
  );
}
```
