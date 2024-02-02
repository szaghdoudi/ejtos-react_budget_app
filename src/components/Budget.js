import { AppContext } from "../context/AppContext";

const { useContext, useState } = require("react")

const Budget = () => {

    const{budget} = useContext(AppContext);
    const[newBudget, setNewBudget]= useState(budget);
    
    const MAX_BUDGET_THRESHOLD = 20000;
    const handleBudgetChange = (event)=>{
        console.log(event.nativeEvent.data)
        console.log(event.target.value)
        if((newBudget.length === 1 && event.nativeEvent.inputType === "deleteContentBackward")){
            setNewBudget('0');
        } else if(event.nativeEvent.data && isNaN(event.nativeEvent.data) ){
            setNewBudget(newBudget);
        }else {
            setNewBudget(event.target.value)
        }
    }




    return(
        <div className="alert alert-secondary">
            <span>Budget: £ </span>
            <input type="number"  min="0" step="10" value={newBudget} onChange={handleBudgetChange}></input>
        </div>
    );
}
export default Budget;
