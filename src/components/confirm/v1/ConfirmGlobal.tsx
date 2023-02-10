import React, { ComponentProps, FC, useRef, useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog";

type Params = Partial<Omit<ComponentProps<typeof ConfirmDialog>, "open" | "onConfirm" | "onCancel">>;
const confirmAction = {
  current: (params: Params) => Promise.resolve(true)
}


export function confirm(params: Params) {
  return confirmAction.current(params);
}



export const ConfirmGlobal: FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmParams, setConfirmParams] = useState<Params>({});
  const resolveRef = useRef((v: boolean) => {
  });
  confirmAction.current = (params: Params) => {
    return new Promise((resolve) => {
      setConfirmParams(params);
      setOpen(true);
      resolveRef.current = resolve
    });
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

ConfirmGlobal.displayName = "ConfirmGlobal";