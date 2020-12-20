// importacion de clase
import { Todo } from '../classes'
// referencia a objeto
import { todoList } from '../index'

// Referencias en el Html
const divTodoList        = document.querySelector('.todo-list');
const txtInput           = document.querySelector('.new-todo');
const btnBorrarCompletos = document.querySelector('.clear-completed');
const ulFiltros          = document.querySelector('.filters');
const anchorFiltros      = document.querySelectorAll('.filtro')

// metodos
export const crearTodoHtml = ( todo ) => {
    const htmlTodo = 
                    `<li class="${ ( todo.completado ) ? 'completed' : '' }" data-id="${ todo.id }">
						<div class="view">
							<input class="toggle" type="checkbox" ${ ( todo.completado ) ? 'checked' : '' }>
							<label>${ todo.tarea }</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
                    </li>`;
                    
    const div     = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;

}

// Eventos

txtInput.addEventListener('keyup', ( event ) => {
    if ( event.keyCode === 13 && txtInput.value.length > 0 ) {
        
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );
        
        crearTodoHtml( nuevoTodo ); 
        txtInput.value = '';
        console.log( todoList );
    }
    

})

divTodoList.addEventListener('click', (event) => {
    // estoy creando las referencias
    const nombreElement = event.target.localName;
    const todoElementos = event.target.parentElement.parentElement;
    const todoId        = todoElementos.getAttribute('data-id');
    console.log(nombreElement);
    // 
    if ( nombreElement.includes('input') ) {
        //me esta llamando el meotodo
        todoList.marcarcionDeCompletado( todoId );
        todoElementos.classList.toggle('completed');
        
    } else if ( nombreElement.includes('button') ) {
        todoList.eliminarTodo( todoId );
        //me esta llamando el meotodo
        todoElementos.remove();
        
    }
    
    console.log(todoList);
})

btnBorrarCompletos.addEventListener('click', () => {

    // aqui hago referencia a la variable de sistema
    // aqui podriamos agregar una condicional para 
    // que cuando no hayan completados no realice nada en sistema
    todoList.eliminarCompletados();

    for ( let i = divTodoList.children.length-1; i >= 0; i-- ) {
        const todoElemento = divTodoList.children[i];
        if (todoElemento.classList.contains('completed') ) {
            // aqui hago referencia al dom
            divTodoList.removeChild( todoElemento )
        }  

        

    }

})

ulFiltros.addEventListener('click', (evento) => {
    const eventoTarget = evento.target.text ;
    if( !eventoTarget ) { return };

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    evento.target.classList.add('selected') ;

    for ( const elemento of divTodoList.children ){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        
        switch ( eventoTarget ) {
            case 'Pendientes':
                if ( completado ) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if ( !completado ) {
                    elemento.classList.add('hidden');
                    console.log('caso 2',elemento);
                }
                break;
        }
        // if ( eventoTarget == 'Pendientes' ) {
        //     if ( completado ) {
        //                     elemento.classList.add('hidden');
        //                     console.log('caso 1',elemento);
        //                 }
        // }else if ( eventoTarget == 'Completados' ) {
        //     if ( !completado ) {
        //         elemento.classList.add('hidden');
        //         console.log('caso 1',elemento);
        //     }
        // }else {
        //     elemento.classList.remove('hidden');
        // } 
    }

})