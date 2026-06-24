import { CustomerDetail } from "@/components/customers/customerDetail";

export default function Page({ params }: { params: { id: string } }) {
    const customerId = params?.id ?? '1';

    return (
        <>
            <CustomerDetail customerId={customerId} />
        </>
    );
}