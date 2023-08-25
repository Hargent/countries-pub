interface FluidStateItem {
  active: boolean;
  order: number | null;
  payload: {
    [key: string]: any;
  };

}

interface FluidState {
  search: FluidStateItem;
  filter: FluidStateItem;
}

export type { FluidState };
