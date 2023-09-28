import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({route, navigation}) {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();

    const expenseCtx = useContext(ExpensesContext)
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId);


    useLayoutEffect(()=>{
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })

    },[navigation,isEditing])

    async function deleteExpenseHandler(){
        try {
            setIsSubmitting(true)
            await deleteExpense(editedExpenseId);
            expenseCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (error) {
            setIsSubmitting(false);
            setError('Could not delete expense - please try again later!')
        }
    }

    function cancelHandler(){
        navigation.goBack();
    }
    
    async function confirmHandler(expenseData){
        setIsSubmitting(true)
        try {
            if(isEditing){
                expenseCtx.updateExpense(editedExpenseId,expenseData);
                await updateExpense(editedExpenseId,expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expenseCtx.addExpense({...expenseData, id:id});
            }
    
            navigation.goBack();
            
        } catch (error) {
            setError('Could not save data- please try again later')
            setIsSubmitting(false)       
        }
    }

    function errorHandler(){
        setError(null)
    }

    if(error && !isSubmitting) return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    if(isSubmitting) return <LoadingOverlay/>
    return (
        <View style={styles.container}>
            <ExpenseForm 
                onSubmit={confirmHandler} 
                onCancel={cancelHandler}
                defaultValues={selectedExpense} 
                submitButtonLabel={isEditing ? 'Update' : 'Add'}/>
            {isEditing && 
                <View style={styles.deleteContainer}>
                    <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>
                </View>}
        </View>
    )
}

export default ManageExpense;

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer:{
        marginTop:16,
        paddingTop:8,
        borderTopWidth:2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center"
    }
})