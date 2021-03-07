export type Dimensions = {
  width: number;
  height: number;
  context: {
    width: number;
    height: number;
  };
  focus: {
    width: number;
    height: number;
  };
};

export type Margin = {
  context: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    offsetX: number;
    offsetY: number;
  };
  focus: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    offsetX: number;
    offsetY: number;
  };
};
