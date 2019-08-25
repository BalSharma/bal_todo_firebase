<template>
  <div id="app">
   
    <section class="wrapper">
    <header class="page-header">
      <p>Todo List Tracker:</p>
    </header>
   <form class="new-todo-form">
     <label class="new-todo-label">
       Add New Todo/s in List:
       <div class="one-line">
          <input v-model="newTodo" type="text" class="new-todo-input"/>
          <button type="submit"
            @click.prevent="addTodo()"
          class="new-todo-button">Add</button>
       </div>      
     </label>
   </form>
   <ul class="todo-list">
     <li v-for="todo in todos" :key="todo.id"  class="todo-item">
       <label v-if="currentEdit !== todo.id" class="todo-item-label">
         <input type="checkbox" class="todo-item__checkbox"
         v-model="todo.completed" @change="updateTodo(todo)">
         {{todo.text}}
       </label> 
       <div v-if="currentEdit !== todo.id">
          <button
              @click="editTodo(todo)" 
              class="btn-edit">
              <img src="./assets/ceate-24px.svg" alt="Edit todo">
            </button>
          <button 
            @click="deleteTodo(todo)"
            class="btn-delete">
            <img src="./assets/delete-24px.svg" alt="delete">
        </button>  
       </div>
       <form v-else class="edit-todo-form">
         <label class="edit-todo-lable"> 
           Edit:
           <input type="text" v-model="editText" class="edit-input" />
         </label>
         <button class="btn-edit-submit" type="submit" 
         @click.prevent="updateTodoText()">
          Submit
         </button>
       </form>
     </li>
   </ul>
  </section>
  </div>
</template>

<script>
import {todosCollection} from './firebase';
export default {
  name: 'app',
  data () {
    return {
      newTodo: '',
      todos: [],
      currentEdit: null,
      editText: ''
    }    
  },
  firestore() {
    return {
      todos: todosCollection.orderBy('createdOn', 'desc')
    }
  },
  methods: {
    addTodo () {
      todosCollection.add({
        text: this.newTodo,
        completed: false,
        createdOn: new Date()
      })
      .then((doc) => {
        console.log(`Document added id: ${doc.id})`)
      })
      .catch((err) => {
        console.error(`Error adding document ${err};`)
      });
      this.newTodo = '';
    },
    updateTodo(todo){
      todosCollection.doc(todo.id).update({...todo})
      .then((docRef) => {
        console.log(`Doc updated id: ${docRef.id}`);
      })
      .catch((err) => {
        console.error(err);
      })
    },
    deleteTodo(todo) {
      todosCollection.doc(todo.id).delete();     
    }, 
    editTodo(todo) {
      this.currentEdit = todo.id;
      this.editText = todo.text;
    },
    updateTodoText(){
      todosCollection.doc(this.currentEdit).update({
        text: this.editText
      })
      .then((docRe) => {
        console.log(`Updated text item id: ${docRef.id}`)
      })
      .catch((err) => {
        console.log(`Editing error: ${err}`);
      })
      this.currentEdit = null;
      this.editText = '';
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

h1, h2 {
  font-weight: normal;
}
.page-header {
  padding: 1rem 0;
  margin-top: 1rem;
  width: 100%;
  background: #3F96BF;
  color: white;
  font-size: 1.2rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  // display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.wrapper{
  max-width: 500px;
  margin: 0 auto;
  padding: 0 1rem;
   border-radius: 3px;
  border: 1px solid #fafafa;
  box-shadow: 5px 5px 15px rgba(0,0,0, .15);
}
.new-todo-form{
  display: flex;
  align-items: flex-start;
  justify-content:space-between;
  padding: 1rem;
  border-radius: 3px;
  border: 1px solid #fafafa;
  box-shadow: 5px 5px 15px rgba(0,0,0, .15);
  margin-top: 3px;
  background: white;
}
.new-todo-label {
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: flex-start;
  font-weight: bold;
}
.new-todo-input {
  padding: .5rem;
  border-radius: 3px;
  border: 1ps solid lighgrey;
  font-size: 1rem;
  margin-top: .5rem;
  font-weight:normal;
}
.new-todo-button {
  font-size: 1.2rem;
  padding: .5rem .7rem;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  background: #ff33ae;
  flex: 1;
  margin-left: 1rem;
  border: 1px solid #ff33ae;
}
.todo-list{
  max-width: 100%;
  margin: 2rem auto;
 
  
}
.todo-item {
  display: flex;
  // align-items:center;
   justify-content: space-between;
  border-top: 1px solid lightgrey;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  &:first-of-type {
    border-radius: 3px 3px 0 0 ;
  }
  &:last-of-type {
    border-bottom: 1px solid lightgrey;
    border-radius: 0 0 3px 3px;
  }
}
.todo-item-label {
  cursor: pointer;
  padding: 1rem;
  // flex: 6;
}
.todo-item__checkbox {
    margin-right: 1rem;
  }
.btn-delete, .btn-edit {
  background: transparent;
  border: 0;
  padding: .5rem;
  width: 40px;
  height: 40px;
  border-radius: 3px;
  cursor: pointer;
  // flex:1; 
}
.edit-todo-form{
  width: 100%;
  justify-content: space-between;
  display: flex;
  padding: 1rem;
}

.edit-todo-lable {
  flex: 1;
  text-align: left;
  display: flex;
  // align-items: center;
  justify-content: space-between;
} 
.edit-input {
  flex: 1;
  padding: .5rem;
  border-radius: 3px;
  border: 1px solid lighgrey;
  font-size: 1rem;
  font-weight: normal;
  margin-left: 1 rem;
} 
.btn-edit-submit {
  font-size: 1rem;
  padding: .5rem .7rem;
  border-radius: 3px;
  background-color: #3F96BF;;
  color:white;
  // font-weight: bold;
  margin-left: 1rem;
  border: 1px solid #3F96BF;
}
</style>
