"use client";

import { useEffect } from "react";
import Modal from "react-modal";

export function ModalProvider() {
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return null;
}
