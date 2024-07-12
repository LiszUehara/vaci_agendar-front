export interface Schedule {
    id: string;
    dateTime: Date;
    note?: string;
    status?: string;
    patient: {
        id: string;
        name: string;
        cpf: string;
        birthDate: Date;
    }
} 