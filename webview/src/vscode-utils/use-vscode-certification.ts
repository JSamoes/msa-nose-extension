import { useReducer } from "react";

function reducer(state: any | null, { type, payload }: any) {
  switch (type) {
    case "replace":
      return { ...state, ...payload };
    default:
      throw new Error();
  }
}

export default function useVSCodeCertification() {
  return useReducer(reducer, null);
}
