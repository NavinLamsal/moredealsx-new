interface Userdetail {
  username: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  display_picture: string;
}

interface transactionList {
  currency_received_amount:string
  currency_sent_amount:string
  is_completed: Boolean
  is_refund: Boolean
  transaction_id: string;
  id: number;
  user: Userdetail | null;
  amount: number;
  currency_sent_symbol: string; 
  currency_received_symbol: string; 
  transaction_type: string; 
  previous_balance: string; 
  narration: string; 
  timestamp: string; 
  action_user: Userdetail | null; 
  remarks: string; 
}

interface Transaction {
  day: string;
  transaction_count: number;
  total_amount: string;
  transactions: transactionList[];
}








