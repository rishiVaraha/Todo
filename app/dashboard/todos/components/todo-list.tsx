// import { createClient } from "@/utils/supabase/server";

// export async function TodoList() {
//   const supabase = createClient();
//   let { data: todos, error } = await supabase.from("todos").select();

//   console.log(todos);
//   return (
//     <div>
//       {todos?.map((todo) => (
//         <div key={todo.id}>
//           <p>{todo.title}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
