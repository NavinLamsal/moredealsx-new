import axios from "axios";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { MetaData } from "@/lib/type/CommonType";

// Define response structure
interface TransactionResponse {
  data: Transaction[];
  meta: MetaData;
  error?: string; // Add an error field for API failures
}

// Fetch Transactions with Error Handling and Headers
export const fetchTransactions = async (
  pageParam: number = 1,
  startDate?: string,
  endDate?: string,
  searchQuery: string = ""
): Promise<TransactionResponse> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Use Environment Variable
    const endpoint = `${baseUrl}wallets/transaction/list/`;


    const response = await MoreClubApiClient.get(endpoint, {
      params: {
        start_date: startDate || undefined,
        end_date: endDate || undefined,
        search: searchQuery || undefined,
        page: pageParam,
      },
    });



    return {
      data: response.data.data || [], // Ensure valid data
      meta: response.data.meta
    };
  } catch (error: any) {
    console.error("Error fetching transactions:", error);

    // Return an error message along with default empty values
    return {
      data: [],
      meta: {
        links: { next: null, previous: null },
        count: 0,
        page_number: pageParam,
        total_pages: 1,
      },
      error: error.response?.data?.message || "Failed to fetch transactions",
    };
  }
};




// Fetch Exactly 7 Recent Transactions
export const fetchRecentTransactions = async (
  startDate?: string,
  endDate?: string,
  searchQuery: string = ""
): Promise<TransactionResponse> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const endpoint = `${baseUrl}wallets/transaction/list/`;

    let transactions: transactionList[] = [];
    let currentPage = 1;
    let hasMorePages = true;

    while (transactions.length < 4 && hasMorePages) {
      const response = await MoreClubApiClient.get(endpoint, {
        params: {
          start_date: startDate || undefined,
          end_date: endDate || undefined,
          search: searchQuery || undefined,
          page: currentPage, // Fixed incorrect pageParam
        },
      });

      const fetchedData: Transaction[] = response.data.data || [];
      const meta = response.data.meta;

      // Flatten transactions grouped by day
      fetchedData.forEach((dayData) => {
        transactions.push(...dayData.transactions);
      });

      // Stop fetching if we have at least 4 transactions
      if (transactions.length >= 4) {
        transactions = transactions.slice(0, 4); // Ensure only 4 are returned
        break;
      }

      // Move to the next page if available
      currentPage++;
      hasMorePages = meta?.links?.next ? true : false; // Ensure reliable check
    }

    return {
      data: [
        {
          day: "Recent Transactions",
          transaction_count: transactions.length,
          total_amount: transactions.reduce((sum, txn) => sum + txn.amount, 0).toString(),
          transactions,
        },
      ],
      meta: {
        links: { next: hasMorePages ? `${endpoint}?page=${currentPage}` : null, previous: null },
        count: transactions.length,
        page_number: 1,
        total_pages: 1,
      },
    };
  } catch (error: any) {
    console.error("Error fetching recent transactions:", error);

    return {
      data: [],
      meta: {
        links: { next: null, previous: null },
        count: 0,
        page_number: 1,
        total_pages: 1,
      },
      error: error.response?.data?.message || "Failed to fetch transactions",
    };
  }
};



// export const fetchTransactionDetail = async (transactionId: number) => {
//   const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}wallets/transaction/${transactionId}`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
//     },
//   });

//   return response.data;
// };



export const fetchTransactionDetail = async (transactionId: string) => {
  try {
    const response = await MoreClubApiClient.get(`${process.env.NEXT_PUBLIC_BASE_URL}wallets/transaction/${transactionId}/details/`,
    );

    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching transaction details:", error);

    // Return an error object so React Query can handle it
    throw new Error(error.response?.data?.message || "Failed to fetch transaction details");
  }
};
