import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
const limit = 10;
function Todos() {
  const queryClient = useQueryClient()
    const fetchTodoList = (page = 0) => fetch(`https://dummyjson.com/todos?limit=${limit}&skip=${page*limit}`).then((res) => res.json())
    const [page, setPage] = React.useState(0)
    const [todo, setTodo] = React.useState('');
    const {
        isLoading,
        isError,
        error,
        data,
        isFetching,
        isPreviousData,
      } = useQuery(['projects', page], () => fetchTodoList(page), { keepPreviousData : true })
    const todos = data?.todos;
    const hasMore = data?.total > page*limit;



    const {data: saveData, error: saveError, isLoading: isAddLoading, mutate, reset} = useMutation(newTodo => {
      return fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todo: newTodo,
          completed: false,
          userId: 5,
        })
      })
    }, {
      onError: (error, variables, context) => {
        // An error happened!
        setTodo('')
        setTimeout(() => {reset()}, 1)
      },
      onSuccess: (data, variables, context) => {
        // Boom baby!
        setTodo('')
        setTimeout(() => {reset()}, 100);
        refetchData();
      },
    })
    const refetchData = () => {
      // Refetch data using the same query key
      // This will make a new request to the server to get the updated data
      queryClient.invalidateQueries(['projects', page]);
    }; 
    if (isLoading) {
      return <span>Loading...</span>
    }
  
    if (isError) {
      return <span>Error: {error.message}</span>
    }
  
    // We can assume by this point that `isSuccess === true`
    return (
        <>
        <input type='text' value={todo} onChange={e => setTodo(e.target.value)}/>
        <button  onClick={() => {
              mutate(todo)
            }}>{isAddLoading ? 'Wait It is Saving': 'Save'}</button>
            {saveData ? <h1>Data Saved</h1> : <></>}
         <ul>
        {todos?.map(todo => (
          <li key={todo.id}>{todo.todo}</li>
        ))}
      </ul>
       <span>Current Page: {page + 1}</span>
       <button
         onClick={() => setPage(old => Math.max(old - 1, 0))}
         disabled={page === 0}
       >
         Previous Page
       </button>{' '}
       <button
         onClick={() => {
           if (!isPreviousData && hasMore) {
             setPage(old => old + 1)
           }
         }}
         // Disable the Next Page button until we know a next page is available
         disabled={isPreviousData || !hasMore}
       >
         Next Page
       </button>
       {isFetching ? <span> Loading...</span> : null}{' '}
        </>
     
    )
  }

export default Todos