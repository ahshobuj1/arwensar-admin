export interface ISupplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: string;
  criticality: string; // enum-style
  contractStartDate: string;
  contractEndDate: string;
  documentUrl: string | null;
  documentType: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  vendorId: string;
  invitationSentAt: string | null;
  invitationToken: string | null;
  userId: string | null;
  isActive: boolean;
  companyLogo: string | null;
}
