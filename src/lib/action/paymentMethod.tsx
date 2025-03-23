import { useQuery } from "@tanstack/react-query";
import MoreClubApiClient from "../axios/moreclub/MoreClubApiClient";


const fetchPaymentMethods = async (countryCode: string) => {
    const response = await MoreClubApiClient.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}payment/gateway/${countryCode}/list/`
    );
    return response.data.data;
};

const usePaymentMethods = (countryCode: string) => {
    return useQuery({
        queryKey: ["paymentMethods", countryCode],
        queryFn: () => fetchPaymentMethods(countryCode),
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        retry: 2, // Retry on failure
    });
};

export default usePaymentMethods;
