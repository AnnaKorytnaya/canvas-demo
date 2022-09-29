export const Canvas = () => {
  /** Store */
  const isOpenCtxMenu = useTimeLineContextMenuStore(
    (store) => store.isOpenCtxMenu
  );
  const isDragging = useTimeLineToolsStore((store) => store.isDragging);
  const setStageRef = useTimeLineStore((store) => store.setStageRef);
  const stageRef = useRef<Konva.Stage>(null);

  /** Hooks */
  const {
    handleOnWheelWrapper,
    handleDragStart,
    handleDragEnd,
    handleOnClick,
    handleMouseDown,
    handleOnCtxMenuClick,
    handleMouseUp,
    handleTouchEnd,
    handleTouchStart,
    handleTouchMove,
    handleDragMove,
    handleDragBoundFunc,
    isReadyTimeline,
  } = useTimelineCallbacks();

  useEffect(() => {
    if (!stageRef.current) return;

    setStageRef(stageRef.current);
  }, [setStageRef]);

  return (
    <>
      {!isReadyTimeline && <TimelineSpinner />}
      {isOpenCtxMenu && <ContextMenu />}

      <div id="canvas-container" style={{ overflow: "hidden" }}>
        <Stage
          ref={stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
          draggable={true}
          onWheel={handleOnWheelWrapper}
          onContextMenu={handleOnCtxMenuClick}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onDragMove={handleDragMove}
          dragBoundFunc={handleDragBoundFunc}
          {...(!isMobileDevice && {
            onDragStart: handleDragStart,
            onDragEnd: handleDragEnd,
            onMouseDown: handleMouseDown,
            onMouseUp: handleMouseUp,
            onClick: handleOnClick,
            onContextMenu: handleOnCtxMenuClick,
          })}
        >
          <Layer>
            <ThemeProvider>
               {isReadyTimeline && <DrawTimeline />}
            </ThemeProvider>
          </Layer>
        </Stage>
        {isDragging && <SidewaysCameraMovement />}
      </div>
    </>
  );
};
