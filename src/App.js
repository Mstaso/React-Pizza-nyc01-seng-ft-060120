import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    pizza: {},
    // topping: ''
  }

  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
    .then(response => response.json())
    .then(pizzas => this.setState({pizzas: pizzas}))
  }

  pizzaEditHandler = (e) => {
    let id = e.target.id
    let foundPizza = this.state.pizzas.find(pizza => pizza.id == id)
    this.setState({pizza: foundPizza})
  }

  pizzaChangeHandler = (e, pizza) => {
    // this.setState({
    //   topping: e.target.value
    // })
    if (e.target.name === "topping"){
      pizza.topping = e.target.value
    } else if (e.target.name === "size"){
      pizza.size = e.target.value
    } else if (e.target.value === "Vegetarian"){
      pizza.vegetarian = true
    } else if (e.target.value === "Not Vegetarian"){
      pizza.vegetarian = false
    }
    this.state.pizza = {
      id: pizza.id,
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian
    }
  }

  pizzaSubmitHandler = (e, id) => {
    let body = {
      id: id,
      topping: this.state.pizza.topping,
      size: this.state.pizza.size,
      vegetarian: this.state.pizza.vegetarian
    }

    fetch(`http://localhost:3000/pizzas/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(response => this.updatePizzas(response))
    
  }


  updatePizzas = (response) => {
    // this.setState({pizzas: this.state.pizzas})
    let thisPizza = this.state.pizzas.find(pizza => pizza.id == response.id)
    let id =thisPizza.id
    this.state.pizzas[id-1] = response
    // thisPizza = response
    // console.log(thisPizza)
    console.log(this.state.pizzas)
    this.setState({pizzas: this.state.pizzas})
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizzaSubmitHandler={this.pizzaSubmitHandler} pizzaChangeHandler={this.pizzaChangeHandler} pizzaToEdit={this.state.pizza}/>
        <PizzaList pizzas={this.state.pizzas} pizzaEditHandler={this.pizzaEditHandler}/>
      </Fragment>
    );
  }
}

export default App;
