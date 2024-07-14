export type MahasiswaResponse = {
  id: string;
  nim: string;
  nama: string;
  email: string;
  jurusanId: string;
  semesterId: string
  statusId: string;
  statusPembayaranSemester: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Paging = {
  meta: {
    current_page: string;
    last_page: number;
    per_page: string;
    total: number;
  }
}

export type ErrorResponse = {
  code: number;
  status: string;
  errors?: string | object;
}

