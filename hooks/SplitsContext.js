import React, { useState, useContext } from "react";

export const SplitsContext = React.createContext();

export function useSplitsContext() {
  const splitsState = useContext(SplitsContext);

  if (splitsState === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return splitsState;
}

export function SplitsProvider({children}) {

  const [root, setRoot] = useState([]);
  const [base, setBase] = useState([]);
  const [splits, setSplits] = useState([]);
  const [leaf, setLeaf] = useState([]);
  const [decisions, setDecisions] = useState([]);

  const splitsState = {
    setRoot: setRoot,
    root: root,
    setSplits: setSplits,
    splits: splits,
    setLeaf: setLeaf,
    leaf: leaf,
    setBase: setBase,
    base: base,
    setDecisions: setDecisions,
    decisions: decisions,
  }

  return (
    <SplitsContext.Provider value={splitsState}>
      {children}
    </SplitsContext.Provider>
  )
} 