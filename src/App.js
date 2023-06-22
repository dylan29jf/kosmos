import React, {  useRef, useState } from "react";
import Component from "./components/Component";
import { randomNumber } from "./utilities/RandomNumber";

const App = () => {
  const [moveableComponents, setMoveableComponents] = useState([]);
  const [selected, setSelected] = useState(null);
  const parentRef = useRef();

  const addMoveable = () => {
    // Create a new moveable component and add it to the array
    const COLORS = ["red", "blue", "yellow", "green", "purple"];

    setMoveableComponents([
      ...moveableComponents,
      {
        id: Math.floor(Math.random() * Date.now()),
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        updateEnd: true,
        numberPhoto: randomNumber(),
      },
    ]);
  };

  const updateMoveable = (id, newComponent, updateEnd = false) => {
    const updatedMoveables = moveableComponents.map((moveable, i) => {
      if (moveable.id === id) {
        return { id, ...newComponent, updateEnd };
      }
      return moveable;
    });
    setMoveableComponents(updatedMoveables);
  };

  const handleDeleteComponent = (id) => {
    // Buscar el índice del objeto
    const copyMoveableComponents = [...moveableComponents];
    const indice = copyMoveableComponents.findIndex(
      (objeto) => objeto.id === id
    );

    // Si se encontró el objeto, eliminarlo
    if (indice !== -1) {
      copyMoveableComponents.splice(indice, 1);
    }

    setMoveableComponents(copyMoveableComponents);
  };

  const handleResizeStart = (index, e) => {
    console.log("e", e.direction);
    // Check if the resize is coming from the left handle
    const [handlePosX, handlePosY] = e.direction;
    // 0 => center
    // -1 => top or left
    // 1 => bottom or right

    // -1, -1
    // -1, 0
    // -1, 1
    if (handlePosX === -1) {
      console.log("width", moveableComponents, e);
      // Save the initial left and width values of the moveable component
      const initialLeft = e.left;
      const initialWidth = e.width;

      // Set up the onResize event handler to update the left value based on the change in width
    }
  };

  return (
    <main>
      <button onClick={addMoveable} className="btn-add">Add Moveable +1</button>
      <div
        id="parent"
        ref={parentRef}
        
      >
        {moveableComponents.map((item, index) => (
          <Component
            {...item}
            idPhoto={item.numberPhoto}
            key={index}
            parentRef={parentRef}
            updateMoveable={updateMoveable}
            handleResizeStart={handleResizeStart}
            setSelected={setSelected}
            isSelected={selected === item.id}
            delComponent={handleDeleteComponent}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
