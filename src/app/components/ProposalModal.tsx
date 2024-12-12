import Modal from "react-modal";
import { Proposal } from "../types/proposal";

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: Proposal | null;
}

export const ProposalModal = ({
  isOpen,
  onClose,
  proposal,
}: ProposalModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Proposal Details"
      className="bg-gray-800 p-6 rounded-lg w-1/2 mx-auto mt-20 max-h-[80vh] overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50">
      {proposal && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{proposal.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white">
              ✕
            </button>
          </div>
          <div className="space-y-4">
            <p>
              <span className="font-bold">Nr:</span> {proposal.number}
            </p>
            <p>
              <span className="font-bold">Offentlighedskode:</span>{" "}
              {proposal.publicCode || "N/A"}
            </p>
            <p>
              <span className="font-bold">Resume:</span>{" "}
              {proposal.resume || "No resume available"}
            </p>
            <p>
              <span className="font-bold">Sidst opdateret:</span>{" "}
              {new Date(proposal.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
};
