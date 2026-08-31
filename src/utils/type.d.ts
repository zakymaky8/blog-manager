export type TStatus = "DRAFT" | "PUBLISHED";




export type TOpenRole = {
    role_id: string;
    createdAt: Date;
    updatedAt: Date;
    open_id: string;
    title: string;
    description: string | null;
    notes: string;
    slots: number;
    isActive: boolean;
    role: {
        role_id: string;
        name: $Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    };
}


export type TRequest = {
  request_id: string,
  role_id: string,
  value_proposition: string,
  contact: string,
  status: string,
  role: {
      role_id: string,
      name: string,
      createdAt: Date,
      updatedAt: Date
    },

   user: {
        createdAt: Date;
        updatedAt: Date;
        Role: $Enums.Role;
        users_id: string;
        firstname: string;
        lastname: string;
        email: string;
        username: string;
        password: string;
        role_status: $Enums.Role_Status;
        isWarned: boolean;
        isOwner: boolean;
        profilePic: string | null;
    };
  user_id: string,
  reviewed_at?: Date,
  reviewed_by?: string
  createdAt: Date,
  updatedAt: Date
}