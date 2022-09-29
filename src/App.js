import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; 
import { v5 as uuidv5 } from 'uuid';

const itemsFromBackend = [
  {id: uuidv5(), content: 'First task'},
  { id: uuidv5(), content: 'Second task'}
]

const columnsFromBackend = [
  {
    [uuidv5()]: {
      name: 'Todo',
      items: itemsFromBackend
    }
  }
];

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);

  return (
    <div style={{ display:'flex', justifyContent:'center',height:'100%'}}>
    <DragDropContext onDropEnd={result => console.log(result)}>
      {Object.entries(columns).map(([id, column]) => {
        return (
          <Droppable droppableId={id}>
            {(provided, snapshot) => {
              return(
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                    padding: 4,
                    width: 250,
                    minHeight: 500
                  }}
                >
                  {column.items.map((item, index) => {
                    return(
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect:'none',
                                padding: 16,
                                margin: '0 0 8px 0',
                                minHeight: '50px',
                                backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                color:'white',
                                ...provided.draggableProps.style
                              }}
                            >
                              {item.content}
                            </div>
                          )
                        }}
                      </Draggable>
                    )
                  })}
                </div>
              )
            }}
          </Droppable>
        )
      })}
    </DragDropContext>
      
    </div>
  );
}

export default App;
