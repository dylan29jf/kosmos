import { useEffect, useRef, useState } from "react";
import Moveable from "react-moveable";
import { useGetRandomPhoto } from "../hooks/useGetPhoto";
import { randomObject } from "../utilities/RandomStyledObjectFil";
const Component = ({
  updateMoveable,
  top,
  left,
  width,
  height,
  index,
  color,
  id,
  setSelected,
  isSelected = false,
  updateEnd,
  parentRef,
  delComponent,
  idPhoto,
}) => {
  const ref = useRef();
  const [limit, setLimit] = useState({ top: 0, left: 0 });
  const imageRef = useRef()

  const photo= useGetRandomPhoto(idPhoto);

  useEffect(() => {
    const divElement = parentRef.current;
    const image = imageRef.current
    if (divElement) {
      const divWidth = divElement.offsetWidth; // Obtener el ancho del div en píxeles
      const divHeight = divElement.offsetHeight; // Obtener la altura del div en píxeles
      setLimit({ left: divWidth, top: divHeight });
    }

    if(image){
        image.style.objectFit = randomObject();
    }
  }, [parentRef]);

  const [nodoReferencia, setNodoReferencia] = useState({
    top,
    left,
    width,
    height,
    index,
    color,
    id,
  });

  let parent = document.getElementById("parent");
  let parentBounds = parent?.getBoundingClientRect();

  const onResize = async (e) => {
    // ACTUALIZAR ALTO Y ANCHO
    let newWidth = e.width;
    let newHeight = e.height;

    const positionMaxTop = top + newHeight;
    const positionMaxLeft = left + newWidth;

    e.target.style.width = `${e.width}px`;
    e.target.style.height = `${e.height}px`;
    e.target.style.transform = e.drag.transform;

    if (positionMaxTop > parentBounds?.height)
      newHeight = parentBounds?.height - top;
    if (positionMaxLeft > parentBounds?.width)
      newWidth = parentBounds?.width - left;

    updateMoveable(id, {
      top,
      left,
      width: newWidth,
      height: newHeight,
      color,
    });

    // ACTUALIZAR NODO REFERENCIA
    const beforeTranslate = e.drag.beforeTranslate;

    ref.current.style.width = `${e.width}px`;
    ref.current.style.height = `${e.height}px`;

    let translateX = beforeTranslate[0];
    let translateY = beforeTranslate[1];

    ref.current.style.transform = `translate(${translateX}px, ${translateY}px)`;

    setNodoReferencia({
      ...nodoReferencia,
      translateX,
      translateY,
      top: top + translateY < 0 ? 0 : top + translateY,
      left: left + translateX < 0 ? 0 : left + translateX,
    });
  };

  const onResizeEnd = async (e) => {
    let newWidth = e.lastEvent?.width;
    let newHeight = e.lastEvent?.height;

    const positionMaxTop = top + newHeight;
    const positionMaxLeft = left + newWidth;

    if (positionMaxTop > parentBounds?.height)
      newHeight = parentBounds?.height - top;
    if (positionMaxLeft > parentBounds?.width)
      newWidth = parentBounds?.width - left;

    const { lastEvent } = e;
    const { drag } = lastEvent;
    const { beforeTranslate } = drag;

    let absoluteTop = top + beforeTranslate[1];
    let absoluteLeft = left + beforeTranslate[0];

    if (positionMaxLeft > limit.left || positionMaxTop > limit.top) {
      newWidth = 100;
      newHeight = 100;
      absoluteLeft = 0;
      absoluteTop = 0;
    }

    updateMoveable(
      id,
      {
        top: absoluteTop,
        left: absoluteLeft,
        width: newWidth,
        height: newHeight,
        color,
      },
      true
    );
  };

  return (
    <>
      <div
        ref={ref}
        className="draggable"
        id={"component-" + id}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: top,
          left: left,
          width: width,
          height: height,
          background: color,
        }}
        onClick={() => setSelected(id)}
      >
        <div >
          {!isSelected && (
            <button onClick={() => delComponent(id)} className="btn-delete"><i className="fas fa-trash"></i></button>
          )}

          <img src={photo} alt="" width={width} height={height} ref={imageRef}/>
        </div>
      </div>

      <Moveable
        target={isSelected && ref.current}
        resizable
        draggable
        onDrag={(e) => {
          updateMoveable(id, {
            top: validateLimit(e.top, e.height, limit.top),
            left: validateLimit(e.left, e.width, limit.left),
            width,
            height,
            color,
          });
        }}
        bounds={parentRef.current}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
        keepRatio={false}
        throttleResize={1}
        renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
        edge={true}
        zoom={1}
        origin={false}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
      />
    </>
  );
};

function validateLimit(position, size, limit) {
  if (position < 0) {
    return 0;
  } else {
    return position > limit - size ? limit - size : position;
  }
}

export default Component;
