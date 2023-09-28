import axios from 'axios';

const ROOT_URL = 'https://expense-tracker-app-ca95e-default-rtdb.firebaseio.com/';

export async function storeExpense(expenseData){
    const response = await axios.post( ROOT_URL + '/expenses.json',expenseData);
    const id = response.data.name;
    return id;
}

export async function fetchExpenses () {
   const response = await axios.get(ROOT_URL + '/expenses.json')
   const expenses = [];
   for(const key in response.data){
        const expenseObj = {
            id: key,
            ...response.data[key],
            date: new Date(response.data[key].date)
        }
        expenses.push(expenseObj);
   }
   return expenses
}

export function updateExpense(id, expenseData){
    return axios.put(ROOT_URL + `/expenses/${id}.json`, expenseData)
}

export function deleteExpense(id){
    return axios.delete(ROOT_URL + `/expenses/${id}.json`)
}