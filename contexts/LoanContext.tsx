import { createContext, useContext, useState, ReactNode } from "react";

export type LoanStatus = "eligible" | "underReview" | "activeLoan";

type BoostState = {
  bankConnected: boolean;
  billUploaded: boolean;
};

type LoanContextType = {
  status: LoanStatus;
  setStatus: (status: LoanStatus) => void;
  boost: BoostState;
  connectBank: () => void;
  uploadBill: () => void;
  loanTotal: number;
  outstandingBalance: number;
  repay: (amount: number) => void;
};

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export function LoanProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<LoanStatus>("eligible");
  const [boost, setBoost] = useState<BoostState>({
    bankConnected: false,
    billUploaded: false,
  });
  const [loanTotal] = useState(300000);
  const [outstandingBalance, setOutstandingBalance] = useState(182000);

  const connectBank = () => setBoost((b) => ({ ...b, bankConnected: true }));
  const uploadBill = () => setBoost((b) => ({ ...b, billUploaded: true }));

  const repay = (amount: number) => {
    setOutstandingBalance((prev) => Math.max(prev - amount, 0));
  };

  return (
    <LoanContext.Provider
      value={{
        status,
        setStatus,
        boost,
        connectBank,
        uploadBill,
        loanTotal,
        outstandingBalance,
        repay,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
}

export function useLoan() {
  const ctx = useContext(LoanContext);
  if (!ctx) {
    throw new Error("useLoan must be used within a LoanProvider");
  }
  return ctx;
}