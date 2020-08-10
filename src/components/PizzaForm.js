import React from "react"

class PizzaForm extends React.Component {

  changeHandler = (e) => {
    this.props.pizzaChangeHandler(e, this.props.pizzaToEdit)
  }


  submitHandler = (e) => {
    let id = e.target.id
    this.props.pizzaSubmitHandler(e, id)
  }

  render(){
    return(
        <div className="form-row">
          <div className="col-5">
              <input type="text" name="topping" onChange={this.changeHandler} className="form-control" placeholder="Pizza Topping" 
              value={this.props.pizzaToEdit.topping}/>
          </div>
          <div className="col">
            <select value={this.props.pizzaToEdit.size} name="size"onChange={this.changeHandler} className="form-control">
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="col">
           
            <div className="form-check">
              <input className="form-check-input" type="radio" value="Vegetarian" onChange={this.changeHandler} 
              checked={this.props.pizzaToEdit.vegetarian == true}/>
              <label className="form-check-label">
                Vegetarian
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="Not Vegetarian" onChange={this.changeHandler} checked={this.props.pizzaToEdit.vegetarian == false}/>
              <label className="form-check-label">
                Not Vegetarian
              </label>
            </div>
          </div>
          <div className="col">
            <button id={this.props.pizzaToEdit.id} type="submit" className="btn btn-success" onClick={this.submitHandler}>Submit</button>
          </div>
        </div> 
    )
  }

}


export default PizzaForm
