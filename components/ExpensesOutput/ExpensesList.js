import { FlatList} from "react-native";
import ExpenseItem from "./ExpenseItem";


function renderExpenseItem(itemData){
    return (
        <ExpenseItem {...itemData.item}/>
    )
}

function ExprensesList({expenses}) {
    return <FlatList 
        data={expenses} 
        renderItem={renderExpenseItem} 
        keyExtractor={(item)=> item.id}/>
}

export default ExprensesList;