// interfaces/index.ts

// Parent / Guardian info
export type ParentInfo = {
  fatherName?: string;
  fatherPhone?: string;
  fatherOccupation?: string;
  motherName?: string;
  motherPhone?: string;
  motherOccupation?: string;
  guardianName?: string;
  guardianRelation?: string;
  guardianPhone?: string;
  guardianOccupation?: string;
  guardianEmail?: string;
};

// Main Student type
export type Student = {
  id: string;                     // always generated
  admissionNumber?: string;
  classAdmitted?: string;
  firstName?: string;
  lastName?: string;
  otherNames?: string;
  gender?: string;
  dob?: string;
  religion?: string;
  admissionDate?: string;
  photo?: string | null;          // base64 string or URL
  parents?: ParentInfo;           // nested
};

// Partial type used in admission form (step by step)
export type StudentInProgress = Partial<Student>;

// For forms where only parent/guardian details are being filled
export type ParentsFormData = {
  fatherName?: string;
  fatherPhone?: string;
  fatherOccupation?: string;
  motherName?: string;
  motherPhone?: string;
  motherOccupation?: string;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  guardianOccupation?: string;
  guardianEmail?: string;
};
