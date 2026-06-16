import type { InstallmentPayment } from "@/types";

export const installmentPayments: InstallmentPayment[] = [
  { id: "tx-001", customer: "LC Waikiki", dueDate: "2026-06-15", amount: 1_240_000, currency: "TL", installmentNo: 3, totalInstallments: 6, status: "bekliyor" },
  { id: "tx-002", customer: "Boyner", dueDate: "2026-06-05", amount: 680_000, currency: "TL", installmentNo: 2, totalInstallments: 4, status: "gecikti" },
  { id: "tx-003", customer: "Mavi", dueDate: "2026-06-20", amount: 92_000, currency: "USD", installmentNo: 1, totalInstallments: 3, status: "bekliyor" },
  { id: "tx-004", customer: "Koton", dueDate: "2026-05-28", amount: 540_000, currency: "TL", installmentNo: 4, totalInstallments: 6, status: "gecikti" },
  { id: "tx-005", customer: "DeFacto", dueDate: "2026-06-12", amount: 760_000, currency: "TL", installmentNo: 2, totalInstallments: 5, status: "ödendi" },
  { id: "tx-006", customer: "Vakko", dueDate: "2026-06-25", amount: 64_000, currency: "EUR", installmentNo: 1, totalInstallments: 2, status: "bekliyor" },
  { id: "tx-007", customer: "İpekyol", dueDate: "2026-07-01", amount: 420_000, currency: "TL", installmentNo: 3, totalInstallments: 4, status: "bekliyor" },
  { id: "tx-008", customer: "Pierre Cardin", dueDate: "2026-06-08", amount: 118_000, currency: "USD", installmentNo: 2, totalInstallments: 3, status: "ödendi" },
  { id: "tx-009", customer: "Network", dueDate: "2026-07-10", amount: 350_000, currency: "TL", installmentNo: 1, totalInstallments: 3, status: "bekliyor" },
  { id: "tx-010", customer: "Kiğılı", dueDate: "2026-05-20", amount: 285_000, currency: "TL", installmentNo: 5, totalInstallments: 6, status: "gecikti" },
  { id: "tx-011", customer: "Damat Tween", dueDate: "2026-06-18", amount: 470_000, currency: "TL", installmentNo: 2, totalInstallments: 4, status: "bekliyor" },
  { id: "tx-012", customer: "English Home", dueDate: "2026-06-30", amount: 615_000, currency: "TL", installmentNo: 1, totalInstallments: 2, status: "bekliyor" },
  { id: "tx-013", customer: "Superdry", dueDate: "2026-07-05", amount: 86_000, currency: "EUR", installmentNo: 2, totalInstallments: 4, status: "bekliyor" },
  { id: "tx-014", customer: "LTB", dueDate: "2026-06-02", amount: 74_000, currency: "USD", installmentNo: 3, totalInstallments: 3, status: "ödendi" },
];
