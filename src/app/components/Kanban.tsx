"use client";

import { useEffect, useState } from "react";
import { ProposalModal } from "./ProposalModal";
import { Proposal } from "../types/proposal";

export const Kanban = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]); 
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null
  );

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch("/api/proposals");
        if (!response.ok) {
          throw new Error("Failed to fetch proposals");
        }
        const data = await response.json();
        setProposals(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchProposals();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }


  // Group proposals by statusId
  const proposalsByStatus: { [key: number]: Proposal[] } = {};
  proposals.forEach((proposal) => {
    if (!proposalsByStatus[proposal.statusId]) {
      proposalsByStatus[proposal.statusId] = [];
    }
    proposalsByStatus[proposal.statusId].push(proposal);
  });

  // Get all unique statusIds for rendering columns
  const uniqueStatusIds = Object.keys(proposalsByStatus).map(Number);

  function openModal(proposal: Proposal) {
    setSelectedProposal(proposal);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedProposal(null);
  }

  return (
    <div
      className="w-full px-10 h-screen overflow-y-hidden mx-auto flex">
      <ProposalModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        proposal={selectedProposal}
      />

      {uniqueStatusIds.map((statusId) => (
        <div
          key={statusId}
          className="flex my-auto flex-col mx-4 h-5/6 border-gray-600 border-2 rounded-lg p-1">
          <div className="flex space-x-4 items-center">
            <h2 className="text-xl font-bold">Status {statusId}</h2>
            <span className="py-1 px-2 bg-gray-900 rounded-lg">
              {proposalsByStatus[statusId].length}
            </span>
          </div>
          <ul className="space-y-2 overflow-y-scroll overflow-x-hidden mt-2 ">
            {proposalsByStatus[statusId].map((proposal) => (
              <li key={proposal.id}>
                <div
                  className="bg-gray-800 p-2 w-80 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                  onClick={() => openModal(proposal)}>
                  <span className="bg-red-500 font-semibold text-sm rounded-xl py-1 px-2">
                    {proposal.number}
                  </span>
                  <h3 className="text-lg font-bold mt-2">{proposal.title}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
