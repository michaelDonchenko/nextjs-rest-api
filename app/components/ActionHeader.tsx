"use client";
import React, {useCallback} from "react";
import Button from "./Button";

interface Props {}

const ActionHeader = (props: Props) => {
  const handleClick = useCallback(() => window.createModal.showModal(), []);
  return (
    <div>
      <Button onClick={handleClick} className="btn btn-primary btn-sm">
        Create new
      </Button>
    </div>
  );
};

export default ActionHeader;
