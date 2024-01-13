import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"

const AllocationForm = (props) => {
    const {dispatch, remaining} = useContext(AppContext);
    const [name, setName] = useState('');
    const [cost, setCost] = useState(0);
    const [action, setAction] = useState('');

    const  submitEvent = ()=>{
        if(cost> remaining){
            alert("The value cannot exceed remaing funds £" + remaining);
            setCost("");
            return;
        }
    
    
    const expense = {
        name: name,
        cost: parseInt(cost)
    };

    if(action ==='Reduce'){
        dispatch({
            type: 'RED_EXPENSE',
            payload: expense

        });
    }else{
        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });
    }

    }

    const handleAllocationUpdate = (event)=>{

        if(event.target.validity.valid){
            if(validateAllocationValue(event.target.value)){
                setCost(normaliseAllocationValue(event.target.value));
            }
        }else if((cost.length === 1 && event.nativeEvent.inputType === "deleteContentBackward")){
            setCost('0');
        }   
    }

    const validateAllocationValue = (value)=>{
        let isValid = true;
        if(value > remaining){
            alert("The value cannot exceed remaing funds £" + remaining);
            isValid = false;
        }
        return isValid;
    }

    const normaliseAllocationValue = (value) => {
        let normalisedValue = value;
        if(value != 0){
            normalisedValue = value.replace(/^0+/, "");
        } else{
            normalisedValue = '0';
        }  
        return normalisedValue
    }

    return (
        <div>
            <div className='row'>
            <div className="input-group mb-3" style={{ marginLeft: '2rem' }}>
                    <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
                  </div>
                  <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}>
                        <option defaultValue>Choose...</option>
                        <option value="Marketing" name="marketing"> Marketing</option>
                <option value="Sales" name="sales">Sales</option>
                <option value="Finance" name="finance">Finance</option>
                <option value="HR" name="hr">HR</option>
                <option value="IT" name="it">IT</option>
                <option value="Admin" name="admin">Admin</option>
                  </select>
                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                <label className="input-group-text" htmlFor="inputGroupSelect02">Allocation</label>
                  </div>
                  <select className="custom-select" id="inputGroupSelect02" onChange={(event) => setAction(event.target.value)}>
                        <option defaultValue value="Add" name="Add">Add</option>
                <option value="Reduce" name="Reduce">Reduce</option>
                  </select>
                    <input
                        required='required'
                        type='number'
                        min='0'
                        id='cost'
                        value={cost}
                        style={{ marginLeft: '2rem' , size: 10}}
                        onChange={handleAllocationUpdate}>
                        </input>
                    <button className="btn btn-primary" onClick={submitEvent} style={{ marginLeft: '2rem' }}>
                        Save
                    </button>
                </div>
                </div>
        </div>
    );
};

export default AllocationForm;

