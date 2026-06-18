interface Vehicle {
    id: string;
    registration: string
    vin: string
    make: string;
    model: string;
    variant: string
    fuel: string
    transmission: string
    year: string;
    status: 'Pending' | 'Completed';
}