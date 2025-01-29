import campaignsSlice from "../slices/campaignsSlice";

export const setCampData = () => (dispatch: any) => {
  dispatch(campaignsSlice.actions.update);
};
