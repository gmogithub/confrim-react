import React, {
  ComponentProps,
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useRef,
  useState
} from "react";
import { ConfirmDialog } from "../v1/ConfirmDialog";

type Params = Partial<Omit<ComponentProps<typeof ConfirmDialog>, "open" | "onConfirm" | "onCancel">>;

const defaultFunction = (p: Params) => Promise.resolve(true);

const defaultValue = {
  confirmRef: {
    current: defaultFunction
  }
}

const ConfirmContext = createContext(defaultValue);


export function ConfirmProvider({children}: PropsWithChildren) {
  const confirmRef = useRef(defaultFunction);
  return <ConfirmContext.Provider value={{confirmRef}}>
    <ConfirmDialogContext/>
    {children}
  </ConfirmContext.Provider>
}

ConfirmContext.displayName = "ConfirmContext";

function ConfirmDialogContext() {
  const [open, setOpen] = useState<boolean>(false);
  const [confirmParams, setConfirmParams] = useState<Params>({});
  const resolveRef = useRef((v: boolean) => {
  });
  const {confirmRef} = useContext(ConfirmContext);

  confirmRef.current = (props) => {
    return new Promise((resolve) => {
      setConfirmParams(props);
      setOpen(true);
      resolveRef.current = resolve;
    })
  }


  return <ConfirmDialog
    {...confirmParams}
    onConfirm={() => {
      resolveRef.current(true);
      setOpen(false)
    }}
    onCancel={() => {
      resolveRef.current(false);
      setOpen(false)
    }}
    open={open}/>;
}


export function useConfirm() {
  const {confirmRef} = useContext(ConfirmContext);
  return {
    confirm: useCallback((params: Params) => {
      return confirmRef.current(params);
    }, [confirmRef])
  }
}