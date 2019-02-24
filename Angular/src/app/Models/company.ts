import { Address } from './address';

export interface Company {
    id?: number;
    name: string;
    address: Address;
    addressID?: number;
}
