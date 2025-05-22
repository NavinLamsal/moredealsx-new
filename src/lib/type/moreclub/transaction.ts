interface Userdetail {
  username: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  display_picture: string;
}

interface transactionList {
  id: number;
  transaction_id: string;
  currency: string;
  amount: number;
  transaction_type: string;
  is_paid: boolean; 
  is_refund: Boolean
  date: string;
  narration: string; 
  payer_details: Userdetail | null;
  remarks: string;

}

interface Transaction {
  day: string;
  transaction_count: number;
  total_amount: string;
  transactions: transactionList[];
}








