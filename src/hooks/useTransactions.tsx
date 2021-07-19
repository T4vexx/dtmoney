import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface TransactionProps {
    id: number
    title: string
    amount: number
    type: string
    category: string
    createdAt: string;
}

type TransactionInputProps = Omit<TransactionProps, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
    children: ReactNode
} 

interface TransactionsContextData {
    transactions: TransactionProps[]
    createTransaction: (transaction: TransactionInputProps) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<TransactionProps[]>([]);

   useEffect(() => {
    api.get('/transactions')
        .then(response => setTransactions(response.data.transactions))  
   }, []); 

   async function createTransaction(transactionsInput: TransactionInputProps) {
    const response =  await api.post('/transactions', {
        ...transactionsInput, 
        createdAt: new Date(),
    })
    const { transaction } = response.data;

    setTransactions([
        ...transactions,
        transaction
    ])
   }

   return (
       <TransactionsContext.Provider value={{transactions, createTransaction}}>
           {children}
       </TransactionsContext.Provider>
   )
}

export function useTransactions() {
    const context = useContext(TransactionsContext)

    return context
}