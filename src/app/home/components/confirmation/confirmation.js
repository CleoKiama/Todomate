import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "./styles.css";
import Image from "next/image";
const ConfirmDialog = (props) => {
  let [open, setOpen] = React.useState(false);
  function handleClick() {
    setOpen(false);
    props.deleteConfirmed();
  }
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
       {props.trigger} 
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">
            {props.dialogTitle}
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            {props.dialogDescription}
          </Dialog.Description>
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <button onClick={handleClick} className="Button red">
              Delete
            </button>
            <Dialog.Close asChild>
              <button className="Button grey">Cancel</button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Image
                src="/cancel_close_delete_icon.svg"
                width={15}
                height={15}
                alt="cancel button"
              />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ConfirmDialog;
